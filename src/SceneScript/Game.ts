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



export default class Game extends ui.GameSceneUI{
    constructor(){
        super();


        let v:ColoumVector = ColoumVector.fromArray([1,2,3]);
        v.print();
        let A:Matrix = new Matrix(3,3);
        // A.writeColoum(1,ColoumVector.fromArray([3,2,1]));
        for (let i = 0; i < 3; i += 1) {
            let v = [];

            for (let k = 0; k < 3; k += 1) {
                v.push(Math.floor(Math.random()*10));
            }
            
            let realv = ColoumVector.fromArray(v);
            A.writeColoum(i,realv);
        }
        A.print();
        A.transColVector(v).print();
        console.log(A instanceof Matrix);
        // this.stage.on(Laya.Event.KEY_DOWN, this, (e)=>{
        //     let message:string[] = prompt().split(":");
        //     if (message[0] == "+") {

        //     }
        // });
        
        if (Math.random() < 2) {
            return;
        }
        GameFieldUI.init(this.scene);//ui初始化
        EnemyCentre.init();//敌人管理类初始化
        MassEffect.init(this);//物理类初始化
        MassEffect.i.test();//物理类进行测试 可移除
        
        // EventCentre.i.on(EventCentre.FieldName.Collision,"IN",this,(ele:[ColiBox,ColiBox])=>{
        //     console.log("IN detected");
        // })
        // EventCentre.i.on(EventCentre.FieldName.Collision,"OUT",this,(ele:[ColiBox,ColiBox])=>{
        //     console.log("OUT detected");
        // })


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

