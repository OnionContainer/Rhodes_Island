import EnemyMgr from "./Actor/EnemyMgr";
import GameMap from "./GameLevel";
import OprtMgr from "./Actor/OprtMgr";
import { ActorCollisionProcessor } from "./Collision/ActorCollisionProcessor";
import GameLevel from "./GameLevel";
import DodResourceMgr from "../Resources/DodResourceMgr";

export default class GameBattle {
    public level: GameLevel;
    public map: GameMap;
    public enemyMgr: EnemyMgr;
    public oprtMgr: OprtMgr;

    public collision: ActorCollisionProcessor;

    private _levelPrepared: boolean;

    constructor() {
        this.level = new GameLevel();
        this.map = new GameMap();
        this.enemyMgr = new EnemyMgr();
        this.oprtMgr = new OprtMgr();

        this.collision = new ActorCollisionProcessor();
    }

    public prepareLevel(): void {
        //TODO init level information
        let res = DodResourceMgr.Instance.getCurrentLevelRes();
        this.level.init(res['level']); //just sample
        this.map.init(res['map']);

        //UNITE ENEMYMGR & OPRTMGR AS ACTORMGR LATER. 
        //this.enemyMgr.init();
        //this.oprtMgr.init();

        //AND DONT FORGET RESET LAST BATTLE DATA REMAINS. 
        //this.collision.reset();

        this._levelPrepared = true;
    }

    public isLevelPreprared(): boolean {
        return this._levelPrepared;
    }

    public reset(): void {
        //TODO
        //CLEAR LAST BATTLE RESOURCE
        this._levelPrepared = false;
    }
}