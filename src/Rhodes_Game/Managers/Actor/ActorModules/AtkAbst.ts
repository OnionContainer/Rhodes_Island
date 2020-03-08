import {KVPair} from "../../../../OneFileModules/DataStructure";
import Actor from "../Actor";
import {EventCentre} from "../../../../OneFileModules/EventCentre";


/**
 * by XWV
 */

enum StateType {
    WAIT = "WAIT",
    PREPARE = "PREPARE",
    AFTER_ATK = "AFTER_ATK"
}

interface State {
    execute(machine: AtkStateMachine): void

    reset(): void
}

abstract class BaseState implements State {
    protected time: number = 0;

    public reset() {
        this.time = 0;
    }

    abstract execute(machine: AtkStateMachine): void;

}

class Wait extends BaseState {

    public execute(machine: AtkStateMachine): void {
        machine.actor.focus = machine.actor.seeker.getFocus();
        if (machine.actor.focus) {//如果能够找到敌人
            machine.changeState(StateType.PREPARE);
            console.log("Found Enemy, Switch to prepare phase @" + this.time);
        } else {//如果找不到敌人
            this.time += 1;
        }
        //如果seeker中存在敌人，reset Prepare并跳转到Prepare阶段
    }

}

class Prepare extends BaseState {


    public execute(machine: AtkStateMachine): void {
        //判断是否需要重新选择目标并重置前摇
        let seeker = machine.actor.seeker;
        let actor = machine.actor;
        if (machine.actor.focus && seeker.getCaptureList().indexOf(machine.actor.focus) < 0) {//当前目标不在攻击范围内
            this.reset();
            machine.actor.focus = seeker.getFocus();
        }

        //判断当前是否存在目标
        if (machine.actor.focus) {
            //计数+1
            this.time += 1;
            if (this.time >= actor.profile.prepTime) {  //前摇结束触发攻击
                console.log("Attack & to After Phase @" + this.time);//进行攻击
                EventCentre.instance.event(EventCentre.EType.ATTACK, [actor, machine.actor.focus]);
                //进入后摇状态
                machine.changeState(StateType.AFTER_ATK);
            }
        } else {
            //没有目标，回到待机阶段
            machine.changeState(StateType.WAIT);
        }


    }
}

class AfterAtk extends BaseState {

    public execute(machine: AtkStateMachine): void {
        let seeker = machine.actor.seeker;
        this.time += 1;//单纯计个数，满了就返回wait状态
        if (this.time >= machine.actor.profile.afterTime) {
            console.log("Wait After ATK End, to Wait @" + this.time);
            //重新获取目标，有目标则进行下一次攻击，无目标回到待机阶段
            machine.actor.focus = seeker.getFocus();
            machine.changeState(machine.actor.focus ? StateType.PREPARE : StateType.WAIT);
        }
    }
}

/**
 * 状态机类
 */
export class AtkStateMachine {
    /*
    * 所属Actor
    * */
    public readonly actor: Actor;
    /**
     * 当前状态
     */
    private curState: State;
    /**
     * 可使用的状态列表
     */
    private stateList: KVPair<State> = new KVPair<State>();


    /**
     * @param actor 状态机所有者
     */
    constructor(actor: Actor) {
        this.actor = actor;
        this.curState = new Wait();
        this.stateList.edit(StateType.WAIT, this.curState);
        this.stateList.edit(StateType.PREPARE, new Prepare());
        this.stateList.edit(StateType.AFTER_ATK, new AfterAtk());

    }

    /**
     * 刷新当前状态，每帧调用
     */
    public update(): void {
        if (this.actor) {
            this.curState.execute(this);
        }
    }

    /**
     * 改变当前状态，新状态会重置为初始态
     * @param stateType 新的状态类型
     */
    public changeState(stateType: StateType) {
        let state = this.stateList.read(stateType);
        state.reset();
        this.curState = state;
    }
}


export interface Seeker {
    /**
     * @return 返回监控区域内攻击优先级最高的对象，区域内无可用对象时返回null
     */
    getFocus(): Actor

    /**
     * @param count 最多返回的数量
     * @return 尽可能返回不多于count个的优先级最高的对象，无可用对象时返回空列表
     */
    getFocusList(count: number): Actor[]

    /**
     * 返回监控区域内所有对象
     */
    getCaptureList(): Actor[]


    followActor()
}


