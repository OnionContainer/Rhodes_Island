import ActorStateBase from "./ActorStateBase";
import FixTime, { DodTimer } from "../../../Fix/FixTime";
import { ActorStateID } from "./ActorStateFsm";
import { ActorType } from "../../../Common/DodKey";

export class ActorStateBorn extends ActorStateBase{

    private _timer:DodTimer;

    public enter():void{
        this._timer = new DodTimer(3);
        this._actor.render.bornAnimation();
        console.log("Enter Born")
        //test
        
    }

    public update():void{
        if (this._timer.ready) {//todo: 这个出生时间应该是一个全场共通的常数
            console.log("Born complete");
            if (this._actor.type == ActorType.Monster) {
                this._actor.state.runState(ActorStateID.Walk);
            } else if (this._actor.type == ActorType.Operator) {
                this._actor.state.runState(ActorStateID.Fight);
            } else {
                throw new DOMException("Unacceptable Actor Type");
            }
        }
    }

    public leave():void{
        console.log("leave born");
        this._actor.render.deploy();
    }
}