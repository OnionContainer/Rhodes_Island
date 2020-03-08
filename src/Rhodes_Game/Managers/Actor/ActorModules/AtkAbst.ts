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

interface State<T extends Actor> {
    execute<F extends Actor, S extends Seeker<F>>(machine: AtkStateMachine<T, F, S>): void

    reset(): void
}

abstract class BaseState<T extends Actor> implements State<T> {
    protected time: number = 0;

    public reset() {
        this.time = 0;
    }

    abstract execute<F extends Actor, S extends Seeker<F>>(machine: AtkStateMachine<T, F, S>): void;

}

class Wait<T extends Actor> extends BaseState<T> {

    public execute<F extends Actor, S extends Seeker<F>>(machine: AtkStateMachine<T, F, S>): void {
        machine.focus = machine.seeker.getFocus();
        if (machine.focus) {//如果能够找到敌人
            machine.changeState(StateType.PREPARE);
            console.log("Found Enemy, Switch to prepare phase @" + this.time);
        } else {//如果找不到敌人
            this.time += 1;
        }
        //如果seeker中存在敌人，reset Prepare并跳转到Prepare阶段
    }

}

class Prepare<T extends Actor> extends BaseState<T> {


    public execute<F extends Actor, S extends Seeker<F>>(machine: AtkStateMachine<T, F, S>): void {
        //判断是否需要重新选择目标并重置前摇
        let seeker = machine.seeker;
        let actor = machine.actor;
        if (machine.focus && seeker.getCaptureList().indexOf(machine.focus) < 0) {//当前目标不在攻击范围内
            this.reset();
            machine.focus = seeker.getFocus();
        }

        //判断当前是否存在目标
        if (machine.focus) {
            //计数+1
            this.time += 1;
            if (this.time >= actor.profile.prepTime) {  //前摇结束触发攻击
                console.log("Attack & to After Phase @" + this.time);//进行攻击
                EventCentre.instance.event(EventCentre.EType.ATTACK, [actor, machine.focus]);
                //进入后摇状态
                machine.changeState(StateType.AFTER_ATK);
            }
        } else {
            //没有目标，回到待机阶段
            machine.changeState(StateType.WAIT);
        }


    }
}

class AfterAtk<T extends Actor> extends BaseState<T> {

    public execute<F extends Actor, S extends Seeker<F>>(machine: AtkStateMachine<T, F, S>): void {
        let seeker = machine.seeker;
        this.time += 1;//单纯计个数，满了就返回wait状态
        if (this.time >= machine.actor.profile.afterTime) {
            console.log("Wait After ATK End, to Wait @" + this.time);
            //重新获取目标，有目标则进行下一次攻击，无目标回到待机阶段
            machine.focus = seeker.getFocus();
            machine.changeState(machine.focus ? StateType.PREPARE : StateType.WAIT);
        }
    }
}

/**
 * 状态机类
 */
export class AtkStateMachine<T extends Actor, F extends Actor, S extends Seeker<F>> {
    /*
    * 所属Actor
    * */
    public readonly actor: T;
    /**
     * 当前状态
     */
    private curState: State<T>;
    /**
     * 可使用的状态列表
     */
    private stateList: KVPair<State<T>> = new KVPair<State<T>>();

    /**
     * 目标选择器
     */
    public seeker: S;

    /*
    * 当前锁定目标
    * */
    public focus: F;

    /**
     * @param actor 状态机所有者
     */
    constructor(actor: T) {
        this.actor = actor;
        this.curState = new Wait();
        this.stateList.edit(StateType.WAIT, this.curState);
        this.stateList.edit(StateType.PREPARE, new Prepare<T>());
        this.stateList.edit(StateType.AFTER_ATK, new AfterAtk());

    }

    /**
     * 刷新当前状态，每帧调用
     */
    public refresh(): void {
        if (this.actor && this.seeker) {
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


export interface Seeker<F extends Actor> {
    /**
     * @return 返回监控区域内攻击优先级最高的对象，区域内无可用对象时返回null
     */
    getFocus(): F

    /**
     * @param count 最多返回的数量
     * @return 尽可能返回不多于count个的优先级最高的对象，无可用对象时返回空列表
     */
    getFocusList(count: number): F[]

    /**
     * 返回监控区域内所有对象
     */
    getCaptureList(): F[]
}


