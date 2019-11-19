import People from "./People";
import Database from "../../../Toybox/Database";
import EventCentre from "../../../Toybox/EventCentre";
import GameFieldUI from "../GameFieldUI";
import { Struc } from "../../../Toybox/DataStructure";
import Present from "./Present";
import State from "./State";
import MyMath from "../../../Toybox/myMath";
import MassEffect, { ColiBox } from "../../../Toybox/MassEffect";

/**
 * 敌人的表现类
 */
class EnemyPst extends Present{
    constructor(url:string){
        super(url);
    }
    public perform(state:EnemyStt):void{
        this._sprite.pos(state.x,state.y);
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
    public out:boolean = false;     //这个敌人是否还有下一个路径坐标
    private _bodyBox:ColiBox;       //这是一个碰撞箱，代表敌人的身体                        


    constructor(data:any, pathID:string){
        super(data);
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

        //注册碰撞箱
        this._bodyBox = MassEffect.i.signBox(this, "ENEMY_BODY");
        let size = Database.i.subUnitSize;
        this._bodyBox.pos(this._x, this._y).size(size, size);
    }

    public resetBodyPosition():void{
        this._bodyBox.pos(this._x, this._y);
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

    public get x():number{
        return this._x;
    }
    public get y():number{
        return this._y;
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

    public get bodyBox():ColiBox{
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
        this._state = new EnemyStt(data, pathID);

        //设置监听事件
        EventCentre.i.on(EventCentre.FieldName.Collision, "ENEMY_BODYA_ENEMY_BODYB_IN", this, (ele:[ColiBox, ColiBox])=>{
            console.log("Enemy Found");
        });
        console.log(this);
    }


    public frameWork():void{
        if (this._state.out) {
            return;
        }
        //进行移动
        if (this._state.isArrived) {
            this._state.nextTarget();
        }
        let {x,y,xSpeed,ySpeed,target} = this._state;
        
        if (target === undefined){
            this._state.out = true;
            return;
        }


        let newx:number = MyMath.moveTo(x,xSpeed,target.x);
        let newy:number = MyMath.moveTo(y,ySpeed,target.y);
        this._state.setPosition(newx,newy);
        this._state.resetBodyPosition();
        //刷新位置
        this._present.perform(this._state);
    }
}