import ActorStateBase from "./ActorStateBase";

/**
 * 敌人的被阻挡状态、干员的一般状态
 */
export class ActorStateFight extends ActorStateBase{

    public update():void{
        //todo: 调用攻击状态机的帧循环
        /*

        */
       this._actor.atk.update();
       this._actor.blocker.update();
    }
}