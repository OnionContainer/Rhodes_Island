import ActorStateBase from "./ActorStateBase";
import { ActorType } from "../../../Common/DodKey";

export class ActorStateWalk extends ActorStateBase{
    
    public enter():void{
        //不应该在这个状态里，应该在born里进行deploy
        this._actor.render.deploy();
    }
    
    public update():void{
        let actor = this._actor;

        if (this._actor.transform.pos.arrived) {//已到达目的地
            if (actor.route.next()) {//存在下一个目标节点
                actor.transform.pos.setTarget(actor.route.currentTarget());//将目标替换为下一个目标节点
            } else {
                //todo: 敌人已到达终点
            }
        }

        actor.transform.pos.move();//移动
        actor.coliEmit.posByVec(actor.transform.pos.data);//移动碰撞箱
        actor.coliEmit.event(actor, actor.type);//发布碰撞事件
        actor.render.move(actor.transform.pos.data);//移动可视对象
        
    }

}