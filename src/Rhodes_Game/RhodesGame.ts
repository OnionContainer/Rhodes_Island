import OprtMgr from "./Managers/OprtMgr";
import EnemyMgr from "./Managers/EnemyMgr";
import { Vec2, MyMath } from "../OneFileModules/MyMath";
import Actor from "./Managers/Actor/Actor";
import { EventCentre } from "../OneFileModules/EventCentre";
import { ColiEmit, ColiReceiver } from "./Managers/Actor/ActorModules/ColiMessage";
import { Enemy } from "./Managers/Actor/Enemy";
import { ArrayAlgo } from "../OneFileModules/DataStructure";






/**
 * 这是游戏本体
 * 包含：
 * 敌人对象管理中心
 * 干员对象管理中心
 */
export default class RhodesGame{

    private oprtMgr:OprtMgr;
    private enemyMgr:EnemyMgr;

    constructor(){
        EventCentre.init();


        //init stage
        
        this.oprtMgr = new OprtMgr();
        this.enemyMgr = new EnemyMgr();

        // Laya.timer.loop(20, this, this.update);

        //test 
    }

    public update():void{
        this.enemyMgr.update();
    }
}