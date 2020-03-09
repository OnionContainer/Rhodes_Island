import EnemyMgr from "./Actor/EnemyMgr";
import GameMap from "./Map/GameMap";
import OprtMgr from "./Actor/OprtMgr";
import { ActorCollisionProcessor } from "./Collision/ActorCollisionProcessor";
import DodResourceMgr from "../Resources/DodResourceMgr";

export default class GameBattle {
    public map: GameMap;
    public enemyMgr: EnemyMgr;
    public oprtMgr: OprtMgr;

    public collision: ActorCollisionProcessor;

    constructor() {
        this.map = new GameMap();
        this.enemyMgr = new EnemyMgr();
        this.oprtMgr = new OprtMgr();

        this.collision = new ActorCollisionProcessor();
    }

    public prepareLevel(): void {
        //TODO init level information
        //this.map.init();

        //UNITE ENEMYMGR & OPRTMGR AS ACTORMGR LATER. 
        //this.enemyMgr.init();
        //this.oprtMgr.init();

        //AND DONT FORGET RESET LAST BATTLE DATA REMAINS. 
        //this.collision.reset();
    }

    public isLevelPreprared(): boolean {
        if (1) {
            //CHECK WHETHER EVERY MODULE PREPARED. 
            return true;
        }
        return false;
    }

    public reset(): void {
        //TODO
        //CLEAR LAST BATTLE RESOURCE
    }
}