import OprtMgr from "./Managers/OprtMgr";
import EnemyMgr from "./Managers/EnemyMgr";
import { Vec2, MyMath } from "../OneFileModules/MyMath";
import Actor from "./Managers/Actor/Actor";
import { EventCentre } from "../OneFileModules/EventCentre";
import { GridSpace, ColiMatrix } from "./Managers/Actor/ActorModules/ColiMessage";
import { Enemy } from "./Managers/Actor/Enemy";

class Joey extends Actor{

}

export default class RhodesGame{

    private oprtMgr:OprtMgr;
    private enemyMgr:EnemyMgr;

    constructor(){
        EventCentre.init();


        //init stage

        
        this.oprtMgr = new OprtMgr();
        this.enemyMgr = new EnemyMgr();

        Laya.timer.loop(20, this, this.update);

        //test 
        // let a = new GridSpace(10,10);
        // console.log(()=>{
        //     a.pos(400,400);
        //     a.event(new Enemy(), Actor.Identity.ACTOR);
        //     a.pos(10,10);
        //     a.event(new Enemy(), Actor.Identity.ACTOR);
        // });

        // let b = new ColiMatrix(10,10);
        // console.log(b);
        // console.log(Actor.Identity, new Vec2(0,0));
    }

    public update():void{
        this.enemyMgr.update();
    }
}