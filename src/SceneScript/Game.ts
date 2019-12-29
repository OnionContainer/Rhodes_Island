import {ui} from "../ui/layaMaxUI";
import Database from "../Toybox/Database";
import EventCentre from "../Toybox/EventCentre";
import GameFieldSceneUI from "./GameObj/GameFieldUI";
import GameFieldUI from "./GameObj/GameFieldUI";
import EnemyCentre from "./GameObj/EnemyCentre";
import { Struc } from "../Toybox/DataStructure";
import MyMath, { ColoumVector, Matrix } from "../Toybox/myMath";
import MassEffect, { ColiBox, ColiPareList } from "../Toybox/MassEffect";
import Enemy from "./GameObj/People_stuff/Enemy";
import MyGlobal from "../Toybox/Global";
import OprtCentre from "./GameObj/OprtCentre";
import { Weapon } from "./GameObj/People_stuff/People";
import Doctor from "./GameObj/Doctor";



export default class Game extends ui.GameSceneUI{
    public static UISet:Laya.Sprite;
    public static stage:Laya.Stage;
    private _pause:boolean = false;

    constructor(){
        super();
        
        Doctor.instance.movein(this.UISet);
        // Laya.stage.on(Laya.Event.MOUSE_DOWN, this, ()=>{console.log("hi")});
        // let m:Matrix = new Matrix(5,6);
        // m.write(0,0,1);
        // m.print();
        // m.rotateClock().print();
        // m.rotateClock().rotateClock().print();
        // m.rotateClock().rotateClock().rotateClock().print();
        // if (Math.random() > -1) {
        //     return;
        // }
        
        Game.UISet = this.UISet;
        Game.stage = this.stage;

        let spr:Laya.Sprite = new Laya.Sprite();
        this.UISet.addChild(spr);
        MyGlobal.UISet_sub = spr;

        
        GameFieldUI.init(this.scene);//ui初始化
        OprtCentre.init();//干员管理类初始化
        EnemyCentre.init();//敌人管理类初始化
        // MassEffect.init(this);//物理类初始化
        // MassEffect.i.test();//物理类进行测试 可移除
        
        EventCentre.instance.on(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.PAUSE, this, ()=>{
            if (this._pause) {
                this._pause = false
                Laya.timer.resume();
            } else {
                this._pause = true;
                Laya.timer.pause();
            }
            
        });


        Laya.timer.loop(17,this,this.update);//开始帧循环
    }

    private _time:number = 0;
    //这个变量代表游戏从开始到现在运行了多少帧

    public update():void{
        
        EnemyCentre.i.update(this._time);
        OprtCentre.i.update();
        GameFieldUI.i.update();
        this._time += 1;
    }
    
    
    
}

