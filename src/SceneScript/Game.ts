import {ui} from "../ui/layaMaxUI";
import Database from "../Toybox/Database";
import EventCentre from "../Toybox/EventCentre";
import GameFieldSceneUI from "./GameObj/GameFieldUI";
import GameFieldUI from "./GameObj/GameFieldUI";
import EnemyCentre from "./GameObj/EnemyCentre";
import { Struc } from "../Toybox/DataStructure";
import MyMath from "../Toybox/myMath";
import MassEffect, { ColiBox, ColiPareList } from "../Toybox/MassEffect";
import Enemy from "./GameObj/People_stuff/Enemy";



export default class Game extends ui.GameSceneUI{
    constructor(){
        super();
    
        GameFieldUI.init(this.scene);//ui初始化
        EnemyCentre.init();//敌人管理类初始化
        MassEffect.init(this);//物理类初始化
        MassEffect.i.test();//物理类进行测试 可移除
        
        EventCentre.i.on(EventCentre.FieldName.Collision,"IN",this,(ele:[ColiBox,ColiBox])=>{
            console.log("IN detected");
        })
        EventCentre.i.on(EventCentre.FieldName.Collision,"OUT",this,(ele:[ColiBox,ColiBox])=>{
            console.log("OUT detected");
        })


        Laya.timer.loop(17,this,this.frameWork);//开始帧循环
    }

    private _time:number = 0;
    //这个变量代表游戏从开始到现在运行了多少帧

    public frameWork():void{
        
        EnemyCentre.i.frameWork(this._time);
        GameFieldUI.i.frameWork();
        MassEffect.i.frameWork();
        this._time += 1;
    }
    
    
    
}

