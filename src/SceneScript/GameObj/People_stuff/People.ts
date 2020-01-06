import { ColiBox } from "../../../Toybox/MassEffect";
import { Matrix } from "../../../Toybox/myMath";
import Enemy from "./Enemy";
import EventCentre from "../../../Toybox/EventCentre";
import GameFieldUI from "../GameFieldUI";
import Database from "../../../Toybox/Database";
import Oprt from "./Oprt";

export default abstract class People{
    public get UnitX():number{//需要在具体实现中重写
        return -1;
    }
    public get UnitY():number{//需要在具体实现中重写（那我为什么不弄个接口呢？
        return -1;
    }
    public get NumX():number{
        return -1;
    }
    public get NumY():number{
        return -1;
    }
    public handleDamage(damage:Damage):void{//需要在具体实现中重写（感觉这玩意好像真是个接口……

    };
    

    constructor() {
        
    }
}


export class Buff{
    private permanent:boolean;
    private countDown:number;
}


export class DamageType{
    public static readonly PHYSICAL:string = "PHYSICAL";
    public static readonly MAGICAL:string = "MAGICAL";
    public static readonly CRITICAL:string = "CRITICAL";
}

/**
 * Damage是一个储存伤害信息的类
 */
export class Damage{
    private _value:number;      //多高的伤害
    public get value():number{
        return this._value;
    }

    private _creator:People;    //谁造成的伤害
    public get creator():People{
        return this._creator;
    }

    private _type:string;       //伤害类型(物伤法伤真伤)
    public get type():string{
        return this._type;
    }

    constructor(value:number, creator:People, type:string){
        this._value = value;
        this._creator = creator;
        this._type = type;
    }
}

/**
 * 由Weapon独有的一个数据类
 * 存储前摇/后摇时间信息
 * 帮助判断何时进行攻击
 * 提供修改这些信息的API
 */
class ATKstage{
    private _beforeATK:number = 10// 前摇时间/帧
    
    private _completeATK:number = 20// 攻击完成周期(前摇与后摇时间之和)/帧
    
    private _hadAttacked:boolean = false//在当前周期中已进行过攻击
    private _stageATK:number = 0// 已经经历的攻击时间

    public get beforeATK():number{
        return this._beforeATK;
    }

    public get completeATK():number{
        return this._completeATK;
    }

    public get stageATK():number{
        return this._stageATK;
    }

    /**
     * 
     * @param before 设定前摇时间
     * @param complete 设定攻击完成周期（前摇与后摇时间之和）
     */
    constructor(before:number, complete:number){
        this._beforeATK = before;
        this._completeATK = complete;
    }

    /**
     * 记录一帧预备攻击状态
     */
    public update():void{
        this._stageATK += 1;
        if (this._stageATK > this._completeATK) {
            this._stageATK = 0;//周期计数归零
            this._hadAttacked = false;//重设攻击记录
        }
    }

    /**
     * 返回“已准备好进行攻击”的真值
     */
    public get atkReady():boolean{
        return (this._stageATK >= this._beforeATK) && (!this._hadAttacked)//前摇阶段已结束，且此次循环中还未攻击过
    }

    /**
     * 进行攻击
     * 将“此次循环中已攻击过”设为真
     * 每次进行攻击时必须调用此函数
     */
    public attackRecord():void{
        this._hadAttacked = true;
    }

    /**
     * 重置攻击状态
     */
    public reset():void{
        this._stageATK = 0;
        this._hadAttacked = false;
    }
}


/**
 * EnemyWeapon是一个储存敌人攻击能力信息的类
 * 这些Weapon类等重构之后都得重写……
 * 
 */
export class EnemyWeapon{
    private _power:number = 3;
    private _target:Oprt;
    public stage:ATKstage = new ATKstage(60,180);
    constructor(){

    }
    
    public count(oprt:Oprt):void{
        if (oprt === this._target) {
            this.stage.update();
            if (this.stage.atkReady) {
                this.stage.attackRecord();
                oprt.handleDamage(new Damage(this._power, null, DamageType.PHYSICAL));
            }
        } else {
            this.stage.reset();
            this._target = oprt;
        }
    }
}

/**
 * Weapon是一个储存干员攻击能力信息的类
 */
export class Weapon{
    private _size:number;           //攻击范围大小
    public _matrix:Matrix;         //攻击范围标识矩阵
    private _originX:number = 0;    //x轴中心点
    private _originY:number = 0;    //y轴中心点
    private _centre:number = 0;   //矩阵中心坐标
    private _shiftX:number = 0;     //x轴坐标系偏移值
    private _shiftY:number = 0;     //y轴坐标系偏移值

    private _blockList:Enemy[] = [];//正在阻挡的敌人
    private _captureList:Enemy[] = [];  //攻击范围中的敌人
    public get captureList():Enemy[]{
        return this._captureList;
    }
    
    public power:number = 22;//攻击力

    public stage:ATKstage;

    

    /**
     * 创建一个weapon
     * 
     * @param originY 单位纵轴坐标（不是精确坐标）
     * @param originX 单位横轴坐标（不是精确坐标）
     * @param size 仅奇数可用
     */
    constructor(originY:number, originX:number, size:number){
        this._matrix = new Matrix(size,size);
        this._originX = originX;
        this._originY = originY;
        this._centre = (size-1)/2;
        this._shiftX = this._originX - this._centre;
        this._shiftY = this._originY - this._centre;
        this._size = size;

        /**
         *      0   1   2   3   4   5
         * 0                        |
         * 1                        |
         * 2        S   1   2   3   4
         * 3        1               |
         * 4        2       C       |
         * 5        3               |
         * 6    -   4   -   -   -   -
         * 
         * 图例：在(4,3)生成一个size为5的weapon，其中心点在绝对坐标系中为C(4,3)
         * 其_centre值为(5-1)/2 = 2, centre值是矩阵中心点C的相对坐标
         * 其_shift值为S(2,1),这是矩阵在绝对坐标系中的位置
         * 
         * 通过把矩阵中的一些0改为1，可以监控绝对坐标系中相应位置的碰撞事件
         * 
         */

        //预设内容
        this._matrix.write(this._centre,this._centre,1);//中心位置设为1
        this._matrix.write(this._centre,this._centre+1,1);
        this._matrix.write(this._centre,this._centre+2,1);
        
        this._resetEvent();

        this.stage = new ATKstage(50,120);
    }

    public rotateClock():Weapon{
        this._clearEvent();
        this._matrix = this._matrix.rotateClock();
        this._resetEvent();
        return this;
    }

    /**
     * [[x,y], [x,y], [x,y]]
     */
    public getIndexLocations():number[][]{
        let result:number[][] = [];
        const xStart = this._shiftX;
        const yStart = this._shiftY;

        for (let row = 0; row < this._size; row += 1) {
            for (let col = 0; col < this._size; col += 1) {
                if (this._matrix.read(row, col) === 1) {
                    result.push([xStart + col, yStart + row]);
                }
            }
        }


        return result;
    }

    /**
     * 开炮！
     * 目前attack会对处于攻击范围内的所有敌人进行攻击
     * 伤害数值就是weapon的power数值
     * 更多选择目标逻辑和伤害类型、buff加成将在后续版本实现
     * 此方法应由一个Oprt实例调用
     */
    public attack():void{

        const blockLength:number = Database.i.UnitSize;
        let twelve:Function = ():number=>{
            return Math.random()*24 - 12;
        };
        this._captureList.forEach((ele)=>{
            
            let damage:Damage = new Damage(this.power, null, DamageType.PHYSICAL);
            ele.handleDamage(damage);
            // GameFieldUI.i.Centre.attackEffect(
            //     (this._originX)*blockLength + blockLength/2 + twelve(),
            //     (this._originY)*blockLength + blockLength/2 + twelve(),
            //     ele.NumX + twelve() + blockLength/2,
            //     ele.NumY + twelve() + blockLength/2
            // )

            EventCentre.instance.event(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.EFFECT,
            [ele.NumX, ele.NumY, `#99ccff`]);
        });
        this.stage.attackRecord();
    
        // const shift:number = (this._size-1)/2;
        
        
    }

    /**
     * 1.解除所有的进入/离开攻击范围事件的监听
     * 2.重新设置进入/离开攻击范围事件监听
     */
    private _resetEvent():void{
        //第一件事先不做，等需要实现了再弄，先重设
        for (let row:number = 0; row < this._matrix.height; row += 1) {
            for (let col:number = 0; col < this._matrix.width; col += 1) {
                if (this._matrix.read(row, col) === 1) {
                    //为矩阵上每一个值为1的点设置监听事件
                    EventCentre.instance.on(EventCentre.FieldName.COLLISION,
                        EventCentre.TypeName.IN(row + this._shiftY, col + this._shiftX),
                        this, this._onEnemyEntre);
                    EventCentre.instance.on(EventCentre.FieldName.COLLISION,
                        EventCentre.TypeName.OUT(row + this._shiftY, col + this._shiftX),
                        this, this._onEnemyLeave);
                }
            }
        }
    }

    private _clearEvent():void{
        for (let row:number = 0; row < this._matrix.height; row += 1) {
            for (let col:number = 0; col < this._matrix.width; col += 1) {
                if (this._matrix.read(row, col) === 1) {
                    //为矩阵上每一个值为1的点设置监听事件
                    EventCentre.instance.off(EventCentre.FieldName.COLLISION,
                        EventCentre.TypeName.IN(row + this._shiftY, col + this._shiftX),
                        this, this._onEnemyEntre);
                    EventCentre.instance.off(EventCentre.FieldName.COLLISION,
                        EventCentre.TypeName.OUT(row + this._shiftY, col + this._shiftX),
                        this, this._onEnemyLeave);
                }
            }
        }
    }

    private _onEnemyEntre(enemy:Enemy):void{
        for (let i = 0; i < this._captureList.length; i += 1) {
            if (this._captureList[i] === enemy) {
                return;//如果已经捕捉此Enemy，则忽略事件
            }
        }
        this._captureList.push(enemy);
        console.log("Enemy captured");
        console.log(this._captureList);
    }

    private _onEnemyLeave(enemy:Enemy):void{
        //查看该敌人是否仍处于攻击范围的其他格子中，如果是，则不删除该敌人
        //该逻辑有待优化
        let found:boolean = false;
        for (let row = 0; row < this._size; row += 1) {
            for (let col = 0; col < this._size; col += 1) {
                console.log
                let positionStatus:number = this._matrix.read(row,col);
                if (positionStatus !== 0) {
                    // console.log((this._shiftY + row)+"|"+ (this._shiftX + col));
                    // console.log(GameFieldUI.i.Centre.searchPoint(this._shiftY + row, this._shiftX + col, enemy));
                    found = GameFieldUI.i.Centre.searchPoint(this._shiftY + row, this._shiftX + col, enemy);
                    if (found) {
                        // console.log("Enemy remove failed")
                        return;
                    }
                }
            }
        }
        //如果未查找到该敌人（函数未return），将此敌人从捕捉列表中移除
        for (let i:number = 0; i < this._captureList.length; i += 1) {
            if (this._captureList[i] === enemy) {
                // console.log("Enemy removed");
                this._captureList.splice(i,1);
            }
        }
        
    }

}

