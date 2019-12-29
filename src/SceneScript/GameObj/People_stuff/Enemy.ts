import People, { Damage, Weapon, EnemyWeapon, DamageType } from "./People";
import Database from "../../../Toybox/Database";
import EventCentre from "../../../Toybox/EventCentre";
import GameFieldUI from "../GameFieldUI";
import { Struc, Box } from "../../../Toybox/DataStructure";
import Present from "./Present";
import State from "./State";
import MyMath from "../../../Toybox/myMath";
import MassEffect, { ColiBox } from "../../../Toybox/MassEffect";
import MyGlobal from "../../../Toybox/Global";
import Oprt from "./Oprt";
import Doctor from "../Doctor";

/**
 * 敌人的表现类
 */
class EnemyPst extends Present{
    constructor(url:string){
        super(url, true);
    }
    
}

/**
 * 敌人的状态类
 */
class EnemyStt extends State{
    private _path:Struc.PointerList<{x:number,y:number}>;   //路径信息 敌人会按顺序直线走过路径标出的每一个点，pointer表示现在走到哪了
    private _xSpeed:number;         //x轴速度
    private _ySpeed:number;         //y轴速度
    private _speed:number;          //总速度    总速度^2 = x轴速度^2 + y轴速度^2
    public isOut:boolean = false;     //这个敌人是否还有下一个路径坐标
    public isStop:boolean = false;     //这个敌人是否在移动

    private _bodyBox:Box;           //这是一个碰撞箱  
    public oldCollision:Box[] = [];      //这是上一次碰到的地图节点

    public weapon:EnemyWeapon = new EnemyWeapon();

    


    constructor(data:any, pathID:string){
        super(data);
        const size:number = Database.i.subUnitSize;

        //初始化路径
        this._path = new Struc.PointerList<{x:number,y:number}>();
        let rawPath:number[][] = Database.i.getPath(pathID);
        rawPath.forEach((ele,index)=>{
            this._path.push({x:ele[0], y:ele[1]});
        });
        //初始化位置
        this._x = this._path.first.x;
        this._y = this._path.first.y;
        //初始化速度
        this._speed = data["speed"];
        //初始化轴速度
        this._resetAxisSpeed();
        //初始化基础属性
        this.health = data['HP']; //血量
        this.fullHealth = this.health;

        //注册碰撞箱
        this._bodyBox = new Box().size(size,size);
        this.resetBodyPosition();
    }

    public resetBodyPosition():void{
        this._bodyBox.x = this._x + 1;//记得修改这个常数
        this._bodyBox.y = this._y + 1;
        // this._bodyBox.pos(this._x, this._y);
    }

    private _resetAxisSpeed():void{
        if (this._path.atEnd) {
            console.log("Can't reset speed");
            return;
        }

        const next:{x:number,y:number} = this._path.next();
        const [x_dis, y_dis] = [next.x - this._x, next.y - this._y];
        const distance = Math.sqrt(Math.pow(x_dis,2) + Math.pow(y_dis,2));
        const time = distance/this._speed;
        this._xSpeed = x_dis/time;
        this._ySpeed = y_dis/time;
    }

    public setPosition(x:number, y:number):void{
        this._x = x;
        this._y = y;
    }

    public nextTarget():void{
        if (this._path.atEnd) {
            return;
        }
        this._path.step();
        this._resetAxisSpeed();
    }

    public get isArrived():boolean{
        return (this._x === this._path.next().x) && (this._y === this._path.next().y);
    }

    public get xSpeed():number{
        return this._xSpeed;
    }
    public get ySpeed():number{
        return this._ySpeed;
    }
    public get target():{x:number, y:number} {
        return this._path.next();
    }
    public get bodyBox():Box{
        return this._bodyBox;
    }
}

/**
 * 敌人的逻辑类
 */
export default class Enemy extends People{
    private _data:any;
    private _path:Struc.PointerList<number[]>;
    private _present:EnemyPst;
    private _state:EnemyStt;

    public tryAttack(oprt:Oprt):void{
        this._state.weapon.count(oprt);
        let stage = this._state.weapon.stage;
        this._present.drawActionBar(stage.stageATK, stage.beforeATK, stage.completeATK);
    }

    /**
     * 
     * @param id 敌人id，用于获取敌人数据
     * @param pathID 路径id，用于获取路径数据
     */
    constructor(id:string, pathID:string){
        super();
        //获取数据和路径
        let data:any = Database.i.getEnemy(id);
        let path:any = Database.i.getPath(pathID);
        this._data = data;
        this._path = new Struc.PointerList<number[]>(path);

        //创建表现类和数据类
        this._present = new EnemyPst(data["img"]);
        this._present.relatedPeople = this;
        this._state = new EnemyStt(data, pathID);

        //初始化动作条
        this._present.drawActionBar(0,1,2);

        console.log(this);
    }

    /**
     * 对传入的伤害进行处理
     * @param damage 
     */
    
    public handleDamage(damage:Damage):void{
        this._state.health -= damage.value;
        this._present.drawHealthBar(this._state.health,this._state.fullHealth);
        if (this._state.health <= 0) {
            this._dead();
        }
    }

    /**
     * 这个函数真是乱到一定程度了……
     */
    public clearActionBar():void{
        this._present.drawActionBar(0,1,2);
    }

    /**
     * 死亡函数
     */
    private _dead():void{
        this.update = ()=>{
            console.log("invalid update");
        };
        this._present.hide();
        EventCentre.instance.event(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.ENEMY_DEAD, [this]);
        this._state.oldCollision.forEach((ele)=>{
            EventCentre.instance.event(EventCentre.FieldName.COLLISION, EventCentre.TypeName.OUT(ele.unitY, ele.unitX), [this]);
        });
    }

    /**
     * 对比两次先后碰撞的结果，输出他们的差异
     * @param previous 上一次的碰撞结果
     * @param current 这一次的碰撞结果
     */
    private compareColiResult(previous:Box[], current:Box[]):{in:Box[], out:Box[]}{
        let inList:Box[] = [];
        let outList:Box[] = [];

        previous.forEach((ele)=>{
            let toInsert:boolean = true;
            for(let n = 0; n < current.length; n += 1) {
                if (ele === current[n]) {
                    toInsert = false;
                    break;
                }
            }
            if (toInsert) {
                outList.push(ele);
            }
        });

        current.forEach((ele)=>{
            let toInset:boolean = true;
            for (let n = 0; n < previous.length; n += 1) {
                if (ele === previous[n]) {
                    toInset = false;
                    break;
                }
            }
            if (toInset) {
                inList.push(ele);
            }
        });

        return {in:inList, out:outList};

    }

    public get NumX():number{
        return this._state.x;
    };

    public get NumY():number{
        return this._state.y;
    }

    //供外部调用的方法集
    public stop():void{
        this._state.isStop = true;
    }

    public unstop():void{
        this._state.isStop = false;
    }

    // public get UnitX():number{
    //     return GameFieldUI.i.Centre.
    // }



    public update():void{
        if (this._state.isOut || this._state.isStop) {
            return;
        }
        
        //进行移动
        if (this._state.isArrived) {
            this._state.nextTarget();
        }
        let {x,y,xSpeed,ySpeed,target} = this._state;
        
        if (target === undefined){
            this._state.isOut = true;
            this.handleDamage(new Damage(114514, this, DamageType.PHYSICAL));
            Doctor.instance.damage();
            return;
        }


        let newx:number = MyMath.moveTo(x,xSpeed,target.x);
        let newy:number = MyMath.moveTo(y,ySpeed,target.y);

        this._state.setPosition(newx,newy);
        this._state.resetBodyPosition();
        //刷新位置
        this._present.perform(this._state);
        
        //碰撞检测
        let result:Box[] = GameFieldUI.i.Centre.collision(this._state.bodyBox);    //获取当前与自身有所重叠的所有方块
        let events = this.compareColiResult(this._state.oldCollision, result);  //对比当前与上一帧的重叠方块异同
        this._state.oldCollision = result;  //更新碰撞结果

        //发送事件
        events.in.forEach((ele)=>{//发布离开方格事件
            // const unitX:number = (ele.x-ele.x%Database.i.UnitSize)/Database.i.UnitSize;
            // const unitY:number = (ele.y-ele.y%Database.i.UnitSize)/Database.i.UnitSize;
            // console.log(unitX === ele.unitX && unitY === ele.unitY);
            // EventCentre.i.event(EventCentre.FieldName.COLLISION, `IN${unitY+""+unitX}`, [this]);
            EventCentre.instance.event(EventCentre.FieldName.COLLISION, `IN${ele.unitY+""+ele.unitX}`, [this]);
        });

        events.out.forEach((ele)=>{//发布进入方格事件
            // const unitX:number = (ele.x-ele.x%Database.i.UnitSize)/Database.i.UnitSize;
            // const unitY:number = (ele.y-ele.y%Database.i.UnitSize)/Database.i.UnitSize;
            // EventCentre.i.event(EventCentre.FieldName.COLLISION, `OUT${unitY+""+unitX}`, [this]);
            EventCentre.instance.event(EventCentre.FieldName.COLLISION, `OUT${ele.unitY+""+ele.unitX}`, [this]);
        });
    }
}