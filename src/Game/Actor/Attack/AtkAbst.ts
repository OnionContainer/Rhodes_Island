import {KVPair} from "../../../Common/DodDataStructure";
import Actor from "../Actor";
import {EventCentre} from "../../../Event/EventCentre";
import { Seeker } from "./ActorSeeker";
import FixTime from "../../../Fix/FixTime";


/**
 * by XWV
 * 
 * 葱 修改于 3/18
 *      将Seeker挪入攻击状态机内，不由Actor持有
 *      不同的攻击范围由Seeker替换来实现
 *      不同的攻击逻辑（范围/单体）由修改profile中的参数实现
 *      AtkStateMachine负责对外提供所有修改/访问接口
 *      仍需对此进行进一步规划（单体/多体/群体攻击逻辑是仅由一个参数实现，还是由多态实现）
 *      //todo:时间累加逻辑改变
 * 
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
    protected time: number = 0;//时间累加逻辑改变

    public reset() {
        this.time = 0;
    }

    abstract execute(machine: AtkStateMachine): void;

}

class Wait extends BaseState {

    public execute(machine: AtkStateMachine): void {
        const focus = machine.seeker.getFocus();
        if (focus !== null) {//如果能够找到敌人
            machine.changeState(StateType.PREPARE);
            console.log("Found Enemy, Switch to prepare phase @" + this.time);
        } else {//如果找不到敌人
            this.time += 1;//todo: 时间累加逻辑改变
        }
        //如果seeker中存在敌人，reset Prepare并跳转到Prepare阶段
    }

}

class Prepare extends BaseState {


    public execute(machine: AtkStateMachine): void {
        /*
        由于攻击状态机的规划进行过一次修改，此处暂时先提供伪代码
        此类目前为单体攻击的逻辑
        */

       const focus = machine.seeker.getFocus();
        if (machine.seeker.focusChanged()) {
            if (focus !== null) {
                //todo: 重新进入前摇阶段
            } else {
                //todo: 进入准备阶段
            }
            return;
        }

        /*
        todo: 前摇时间累加。目前已经经过的前摇时间存储在profile中?
        如果前摇时间已满，则进行攻击且进入后摇状态
        */
        
        

        // //判断是否需要重新选择目标并重置前摇
        // let seeker = machine.keeper.seeker;
        // let actor = machine.keeper;
        // if (machine.keeper.focus && seeker.getCaptureList().indexOf(machine.keeper.focus) < 0) {//当前目标不在攻击范围内
        //     this.reset();
        //     machine.keeper.focus = seeker.getFocus();
        // }

        // //判断当前是否存在目标
        // if (machine.keeper.focus) {
        //     //计数+1
        //     this.time += 1;
        //     if (this.time >= actor.profile.prepTime) {  //前摇结束触发攻击
        //         console.log("Attack & to After Phase @" + this.time);//进行攻击
        //         EventCentre.instance.event(EventCentre.EType.ATTACK, [actor, machine.keeper.focus]);
        //         //进入后摇状态
        //         machine.changeState(StateType.AFTER_ATK);
        //     }
        // } else {
        //     //没有目标，回到待机阶段
        //     machine.changeState(StateType.WAIT);
        // }
    }
}

class AfterAtk extends BaseState {

    public execute(machine: AtkStateMachine): void {
        // let seeker = machine.keeper.seeker;
        // this.time += 1;//单纯计个数，满了就返回wait状态
        // if (this.time >= machine.keeper.profile.afterTime) {
        //     console.log("Wait After ATK End, to Wait @" + this.time);
        //     //重新获取目标，有目标则进行下一次攻击，无目标回到待机阶段
        //     machine.keeper.focus = seeker.getFocus();
        //     machine.changeState(machine.keeper.focus ? StateType.PREPARE : StateType.WAIT);
        // }
    }
}

/**
 * 状态机类
 */
export class AtkStateMachine {
    /*
    * 所属Actor
    * */
    public readonly keeper: Actor;
    /**
     * 当前状态
     */
    private curState: State;
    /**
     * 可使用的状态列表
     */
    private stateList: KVPair<State> = new KVPair<State>();

    public seeker: Seeker;

    private _prepTime:number;//前摇时间/帧
    private _coolTime:number;//后摇时间/帧
    private _curPoint:number = 0;//当前已积蓄的点数
    private _velocity:number = 1;//当前累加速率(点数/帧)

    public get ready():boolean{
        return this._curPoint>=this._prepTime;
    }

    public tic():void{
        this._curPoint += this._velocity;
    }

    public get coolComplete():boolean{
        return this._curPoint < this._prepTime+this._coolTime;
    }

    public refresh():void{
        this._curPoint = 0;
    }

    /**
     * @param keeper 状态机所有者
     */
    constructor(keeper: Actor, res:any) {
        this.keeper = keeper;
        this.curState = new Wait();
        this.stateList.edit(StateType.WAIT, this.curState);
        this.stateList.edit(StateType.PREPARE, new Prepare());
        this.stateList.edit(StateType.AFTER_ATK, new AfterAtk());
        //todo: about res

        this._prepTime = 40;
        this._coolTime = 40;

        this.seeker = null;//初始化Seeker(根据res)
    }

    /**
     * 刷新当前状态，每帧调用
     */
    public update(): void {
        if (this.keeper) {
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





