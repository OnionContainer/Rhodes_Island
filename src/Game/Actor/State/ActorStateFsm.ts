import ActorStateBase from "./ActorStateBase";
import DodLog from "../../../Common/DodLog";
import Actor from "../Actor";
import { ActorStateWalk } from "./ActorStateWalk";
import { ActorStatePrepared } from "./ActorStatePrepared";

export enum ActorStateID {
    None,
    Prepared,     //待机 (未出动/未部署)  
    Born,   //出生动画 不可攻击 不可被攻击
    Walk,   //移动 敌人用
    Stunned,    //晕眩 冰冻 etc
    Fight,  //普攻状态 干员常态 敌人被阻挡后
    Death,  //死亡动画 不可攻击 不可被攻击
    Escape, //敌人逃脱
    Count
}

/*
 * 角色状态机 管理角色所处阶段 根据不同阶段决定不同的组件状态
 */
export default class ActorStateMgr {
    private _states: ActorStateBase[] = [];
    private _currentState: ActorStateBase;

    constructor(actor: Actor) {
        this._currentState = null;
        this._states[ActorStateID.Walk] = new ActorStateWalk(actor);
        this._states[ActorStateID.Prepared] = new ActorStatePrepared(actor);
        //TODO
        //参照游戏大状态机
    }
    
    public init(): void {
        this.runState(ActorStateID.None);
    }

    public runState(stateID: ActorStateID): void {
        if (ActorStateID.Count <= stateID || stateID <= ActorStateID.None) {
            DodLog.error(`GameStateMgr.runState: Invalid stateID [${stateID}]. `);
            return;
        }

        if (null != this._currentState) {
            this._currentState.leave();
        }

        this._currentState = this._states[stateID];
        this._currentState.enter();
    }

    public update(): void {
        if (null != this._currentState) {
            this._currentState.update();
        }
    }

    public reset(): void {
        if (null != this._currentState) {
            this._currentState.leave();
            this._currentState = null;
        }

        for (let i = 0; i < this._states.length; i++) {
            let state = this._states[i];
            state.reset();
        }
    }
}