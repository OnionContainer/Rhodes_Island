import GameFieldUI from "../GameFieldUI";
import State from "./State";
import Database from "../../../Toybox/Database";
import People, { Weapon } from "./People";
import EventCentre from "../../../Toybox/EventCentre";

/**
 * 所有表现类的基类
 */
export default abstract class Present{
    protected _relatedPeople:People;
    public _sprite:Laya.Sprite;
    protected _actionBar:Laya.Sprite = new Laya.Sprite();
    protected _atkRangeOn:boolean = false;
    protected _atkRange:Laya.Sprite = new Laya.Sprite();

    private dead:boolean = false;//反正我也不维护这些东西了

    constructor(url:string, fuck:boolean = false){//就是……反正我也不维护这些东西了
        this._sprite = GameFieldUI.i.Centre.CreateSprite(url);

        let fuckLoad1:Function = ()=>{
            this._sprite.loadImage("Basic/兵蚁奔跑1.png");
            if (!this.dead){
                Laya.timer.once(300,this,fuckLoad2);
            }
        }

        let fuckLoad2:Function = ()=>{
            this._sprite.loadImage("Basic/兵蚁奔跑2.png");
            if (!this.dead){
                Laya.timer.once(300,this,fuckLoad1);
            }
        }
        if (fuck) {
            fuckLoad1();
        }
        
        EventCentre.instance.on(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.ENEMY_DEAD, this, (people:People)=>{
            if (people === this._relatedPeople) {
                this.dead = true;
            }
        });
        
        this._sprite.addChild(this._actionBar);
        this._sprite.parent.addChild(this._atkRange);
        this.drawHealthBar(1,1);
        this._sprite.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
        this._sprite.on(Laya.Event.MOUSE_OVER, this, this.onHover);
        this._sprite.on(Laya.Event.MOUSE_OUT, this, this.onMouseLeave);
    }

    private onMouseDown():void{
        console.log(this._relatedPeople);
    }

    public set relatedPeople(people:People){
        this._relatedPeople = people;
    }

    public get sprite():Laya.Sprite{
        return this._sprite;
    }

    public drawActionBar(current:number, atkPoint:number, full:number):void{
        this._actionBar.graphics.clear();
        const percent:number = current/full;
        const fullLength:number = Database.i.UnitSize;
        this._actionBar.graphics.drawRect(-1,-19, fullLength+2, 6,"#444444");//背景条
        this._actionBar.graphics.drawRect(0,-18, fullLength*percent, 4,"ffff00");//后摇条
        this._actionBar.graphics.drawRect(0,-18, fullLength*Math.min(percent, atkPoint/full), 4,"#40ff00");//前摇条

        //画个逐渐缩小的框表示进度
        if (current <= atkPoint && current !== 0) {
            const gap:number = (fullLength*current/atkPoint)/2;
            const leg:number = fullLength - 2*gap;
            const reach:number = fullLength - gap;
            const wid:number = 4;
            const color:string = "#4da6ff";
            this._actionBar.graphics.drawRect(gap,gap,leg,wid,color);
            this._actionBar.graphics.drawRect(reach,gap,wid,leg,color);
            this._actionBar.graphics.drawRect(gap,reach,leg + 4,wid,color);
            this._actionBar.graphics.drawRect(gap,gap,wid,leg,color);
        }
        
    }

    public drawHealthBar(current:number, full:number):void{
        const percent:number = current/full;
        const barLength:number = Database.i.UnitSize * percent;
        this._sprite.graphics.clear();
        this._sprite.graphics.drawRect(-1, -11, Database.i.UnitSize+2, 6, "#444444");//背景条
        this._sprite.graphics.drawRect(0, -10, barLength, 4, "#cc0000");//血条

    }

    public perform(state:State):void{
        this._sprite.pos(state.x,state.y);
    }

    public hide():void{
        this.sprite.parent.removeChild(this._sprite);
    }

    public onHover():void{
        // console.log("hover");
        EventCentre.instance.event(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.SHOW_RANGE, [this]);
    }

    public onMouseLeave():void{
        // console.log("out");
        EventCentre.instance.event(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.HIDE_RANGE, [this]);

    }

    public drawAttackRange(weapon:Weapon):void{
        let location:number[][] = weapon.getIndexLocations();
        const unit:number = Database.i.UnitSize;
        // console.log(location);
        location.forEach(ele=>{
            // console.log(ele);
            let spr:Laya.Sprite = Laya.Sprite.fromImage("./Basic/visa.png");
            // console.log(spr);
            spr.size(unit,unit);
            spr.pos(ele[0]*unit, ele[1]*unit);
            this._atkRange.addChild(spr);
            // this._atkRange.graphics.drawRect(ele[0]*unit, ele[1]*unit, unit,unit,"#0088ff");
        })
        // console.log("drawRange");
    }

    public clearAttackRange():void{
        // console.log("clearRange");
        this._atkRange.parent.removeChild(this._atkRange);
        this._atkRange = new Laya.Sprite();
        this._sprite.parent.addChild(this._atkRange);
    }
}