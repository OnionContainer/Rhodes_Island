import GameMap from "./GameLevel";
import { ActorCollisionProcessor } from "./Collision/ActorCollisionProcessor";
import GameLevel from "./GameLevel";
import DodResourceMgr from "../Resources/DodResourceMgr";
import ActorMgr from "./Actor/ActorMgr";

export default class GameBattle {
    public level: GameLevel;
    public map: GameMap;
    public actorMgr: ActorMgr;

    public collision: ActorCollisionProcessor;

    private _levelPrepared: boolean;

    constructor() {
        this.level = new GameLevel();
        this.map = new GameMap();
        this.actorMgr = new ActorMgr();

        this.collision = new ActorCollisionProcessor();
    }

    public prepareLevel(): void {
        //TODO init level information
        let res = DodResourceMgr.Instance.getCurrentLevelRes();
        this.level.init(res['level']); //just sample
        this.map.init(res['map']);
        this.actorMgr.init(res['map']);

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