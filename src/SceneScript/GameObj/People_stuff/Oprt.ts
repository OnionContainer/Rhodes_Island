import People, { Weapon, Damage } from "./People";
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
    public health:number;
    public fullHealth:number;
    
    public stopping:Enemy = null;

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
    
    

    constructor(unitY:number, unitX:number, id:string, rotate:number = 0){
        super();
        //获取数据
        let size:number = Database.i.UnitSize;
        let data:any = Database.i.getOprt(id);

        

        //新建表现类和状态类
        this._state = new OprtStt(data);
        this._present = new OprtPst(data["small"]);
        this._present.relatedPeople = this;

        //确定血量
        this._state.fullHealth = data["HP"];
        this._state.health = this._state.fullHealth;

        this._state.unitX = unitX;
        this._state.unitY = unitY;
        this._state.weapon = new Weapon(this._state.unitY, this._state.unitX, 5);
        for (let i = 0; i < rotate; i += 1) {
            this._state.weapon.rotateClock();
        }
        this._present.perform(this._state);

        // console.log(this._state.weapon.getIndexLocations());//

        //监听事件
        EventCentre.instance.on(EventCentre.FieldName.COLLISION, `IN${unitY+""+unitX}`, this, this.onCaptureEnemy);
        EventCentre.instance.on(EventCentre.FieldName.COLLISION, `OUT${unitY+""+unitX}`, this, this.onReleaseEnemy);
        EventCentre.instance.on(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.SHOW_RANGE, this, this.showRange);
        EventCentre.instance.on(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.HIDE_RANGE, this, this.hideRange);

    }

    public showRange(present:Present):void{
        if (this._present !== present) {
            return;
        }
        this._present.drawAttackRange(this._state.weapon);
    }

    public hideRange(present:Present):void{
        if (this._present !== present) {
            return;
        }
        this._present.clearAttackRange();
    }

    public handleDamage(damage:Damage):void{
        this._state.health -= damage.value;
        this._present.drawHealthBar(this._state.health, this._state.fullHealth);

        if (this._state.health <= 0) {
            this.dead();
        }
    }

    private dead():void{
        this._present.sprite.parent.removeChild(this._present.sprite);
        if (this._state.stopping !== null) {
            this._state.stopping.clearActionBar();
            this.onReleaseEnemy(this._state.stopping);
            
        }
        EventCentre.instance.event(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.OPRT_DEAD, [this]);
        this.update = ()=>{
            console.log("invalid update");
        };
    }

    private onCaptureEnemy(enemy:Enemy):void{
        if (this._state.stopping === null) {
            enemy.stop();
            this._state.stopping = enemy;
        }
    }

    private onReleaseEnemy(enemy:Enemy):void{
        enemy.unstop();
        this._state.stopping = null;
    }

    public update():void{
        /*
         * 按照原作的逻辑，干员在攻击时会锁定一个敌人，开始前摇。
         * 如果此敌人不再是攻击目标，将会重新进行前摇。
         * 但这里的逻辑是“只要范围内有敌人，就进行前摇和攻击”。
         */
        if (this._state.weapon.captureList.length !== 0) {
            this._state.weapon.stage.update();
            // console.log("EnemyFound");
            if (this._state.weapon.stage.atkReady) {
                this._state.weapon.attack();
                // console.log("Attack");
            }
        } else {
            this._state.weapon.stage.reset();
            // console.log("Enemy lost, Attack reset");
        }
        if (this._state.stopping !== null) {
            this._state.stopping.tryAttack(this);
        }
        this._present.drawActionBar(this._state.weapon.stage.stageATK, this._state.weapon.stage.beforeATK, this._state.weapon.stage.completeATK);
    }
}