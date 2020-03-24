import ActorStateBase from "./ActorStateBase";
import FixTime from "../../../Fix/FixTime";
import { ActorStateID } from "./ActorStateFsm";
import { ActorType } from "../../../Common/DodKey";

export class ActorStateBorn extends ActorStateBase{

    private _enterTime:number = 0;

    public enter():void{
        this._enterTime = FixTime.elapsedTime;
        this._actor.render.bornAnimation();
        console.log("Enter Born")
        //test
        
    }

    public update():void{
        if (FixTime.elapsedTime - this._enterTime >= 3) {//todo: 这个出生时间应该是一个全场共通的常数
            if (this._actor.type == ActorType.Monster) {
                this._actor.state.runState(ActorStateID.Walk);
            } else if (this._actor.type == ActorType.Operator) {
                this._actor.state.runState(ActorStateID.Fight);
            } else {
                throw new DOMException("Unacceptable Actor Type");
            }
        }
    }
}