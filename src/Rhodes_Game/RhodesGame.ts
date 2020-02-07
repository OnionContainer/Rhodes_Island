import OprtMgr from "./Managers/OprtMgr";
import EnemyMgr from "./Managers/EnemyMgr";
import { Vec2, MyMath } from "../OneFileModules/MyMath";
import Actor from "./Managers/Actor/Actor";
import { EventCentre } from "../OneFileModules/EventCentre";
import { ColiEmit, ColiReceiver } from "./Managers/Actor/ActorModules/ColiMessage";
import { Enemy } from "./Managers/Actor/Enemy";
import { ArrayAlgo } from "../OneFileModules/DataStructure";


class ColiReporter extends ColiReceiver{
    public inList:Vec2[] = [];
    public layer:Laya.Sprite = new Laya.Sprite();
    constructor(){
        super(10,10);
        for (let w = 0; w < 10; w += 1) {
            for (let h = 0; h < 10; h += 1) {
                this.setDetection(new Vec2(w,h), Actor.Identity.ENEMY);
            }
        }

        Laya.stage.addChild(this.layer);
        this.layer.zOrder = -10;
    }

    protected onEntre(actor:Actor, pos:Vec2):void{
        // console.log("Enter" + pos.x + "|" + pos.y);
        this.inList.push(pos);
        this.render();
    }

    protected onLeave(actor:Actor, pos:Vec2):void{
        const index = ArrayAlgo.findEle(pos, this.inList);
        if (index !== -1) {
            this.inList.splice(index, 1);
        }
        this.render();
        // console.log("Leave" + pos.x + "|" + pos.y);
    }

    public render():void{
        this.layer.graphics.clear();
        this.inList.forEach(ele=>{
            this.layer.graphics.drawRect(ele.x*ColiEmit.GLOBAL_UNIT_WIDTH + 1,
                ele.y*ColiEmit.GLOBAL_UNIT_HEIGHT + 1,
                ColiEmit.GLOBAL_UNIT_WIDTH - 2,
                ColiEmit.GLOBAL_UNIT_HEIGHT - 2,
                "#ff0000"
            );
        });
    }
}



/**
 * 这是游戏本体
 * 包含：
 * 敌人对象管理中心
 * 干员对象管理中心
 */
export default class RhodesGame{

    private oprtMgr:OprtMgr;
    private enemyMgr:EnemyMgr;


    private reporter;

    constructor(){
        EventCentre.init();
        this.reporter = new ColiReporter();
        console.log(this.reporter);
        //init stage
        
        this.oprtMgr = new OprtMgr();
        this.enemyMgr = new EnemyMgr();

        Laya.timer.loop(20, this, this.update);

        //test 
    }

    public update():void{
        this.enemyMgr.update();
        this.oprtMgr.update();
    }
}

