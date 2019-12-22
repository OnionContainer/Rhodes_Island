import People, { Weapon } from "./People";
import State from "./State";
import Present from "./Present";
import Database from "../../../Toybox/Database";
import Enemy from "./Enemy";
import EventCentre from "../../../Toybox/EventCentre";
import { Matrix } from "../../../Toybox/myMath";


class OprtPst extends Present{
    constructor(url:string){
        super(url);
    }
}

class OprtStt extends State{
    public unitY:number;
    public unitX:number;
    public capture:Enemy[] = [];
    public weapon:Weapon;

    constructor(data:any){
        super(data);
    }

    public get x():number{
        return this.unitX * Database.i.UnitSize;
    }
    
    public get y():number{
        return this.unitY * Database.i.UnitSize;
    }
}

export default class Oprt extends People{
    private _state:OprtStt;
    private _present:OprtPst;
    

    constructor(unitY:number, unitX:number, id:string){
        super();
        //获取数据
        let size:number = Database.i.UnitSize;
        let data:any = Database.i.getOprt(id);

        //新建表现类和状态类
        this._state = new OprtStt(data);
        this._present = new OprtPst(data["img"]);

        this._state.unitX = unitX;
        this._state.unitY = unitY;
        this._state.weapon = new Weapon(this._state.unitY, this._state.unitX, 5);
        this._present.perform(this._state);

        //监听事件
        // EventCentre.i.on(EventCentre.FieldName.COLLISION, `IN${unitY+""+unitX}`, this, this.onCaptureEnemy);
        // EventCentre.i.on(EventCentre.FieldName.COLLISION, `OUT${unitY+""+unitX}`, this, this.onReleaseEnemy);
    }

    private onCaptureEnemy(enemy:Enemy):void{
        enemy.stop();
    }

    private onReleaseEnemy(enemy:Enemy):void{
        enemy.unstop();
    }

    public update():void{

    }
}