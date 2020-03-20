import Actor from "./Actor";
import { ActorType } from "../../Common/DodKey";
import { ActorStateID } from "./State/ActorStateFsm";

export default class ActorMgr {
    public actors: Array<Actor>;
    constructor() {
        this.actors = new Array<Actor>();

        //test
        this.createActor(ActorType.Monster, {});
        this.actors[0].state.runState(ActorStateID.Walk);
    }

    public init(res: any) {
        this._initEnemy(res);
        this._initOprt();
    }

    public awake(): void {
        for (let i = 0; i < this.actors.length; i++) {
            let actor = this.actors[i];
            actor.awake();
        }
    }

    public update(): void {
        for (let i = 0; i < this.actors.length; i++) {
            let actor = this.actors[i];
            actor.update();
        }
    }

    public reset(): void {
        for (let i = 0; i < this.actors.length; i++) {
            let actor = this.actors[i];
            actor.reset();
        }
    }

    public createActor(type: ActorType, res: any): void {
        let actor = new Actor(type, res);
        this.actors.push(actor);
    }

    public getActorByID(ID: number): Actor | null {
        for (let i = 0; i < this.actors.length; i++) {
            let actor = this.actors[i];
            if (ID == actor.symbol.data) {
                return actor;
            }
        }
        return null;
    }

    private _initEnemy(res: any) {
        //TODO use level res data init enemy actors
        //eg.
        //let enemyRes = res['xxxxx'];
        //actor = this.createActor(ActorType.Enemy ,enemyRes);
    }
    
    private _initOprt() {
        //TODO use pre choose oprt list to init self actors
        //let array = RhodesGames.Instance.gamedata.currentFormation;
        //for (let i = 0; i < array.length; i++) {
        //   let id = array[i];
        //   let res = DodResourceMgr.Instance.getCurrentOperarorDataByID(id);
        //   let actor = this.createActor(ActorType.Operator, res)
        //}
    }
}