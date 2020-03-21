import {KVPair} from "../../../Common/DodDataStructure";
import Actor from "../Actor";
import {EventCentre} from "../../../Event/EventCentre";
import { Seeker } from "./ActorSeeker";
import FixTime from "../../../Fix/FixTime";
import { MapNodeSeeker } from "./MapNodeSeeker";
import { Vec2 } from "../../../Common/DodMath";


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
    name():string

    execute(machine: AtkStateMachine): void

    reset(): void
}

abstract class BaseState implements State {
    public name():string{return "BaseState";}

    protected time: number = 0;//时间累加逻辑改变

    public reset() {
        this.time = 0;
    }

    abstract execute(machine: AtkStateMachine): void;

}

class Wait extends BaseState {
    public name():string{return "WaitState";}

    public execute(machine: AtkStateMachine): void {
        const focus = machine.seeker.getFocus();
        if (focus != null && focus != undefined) {//如果能够找到敌人
            machine.changeState(StateType.PREPARE);
            console.log("Found Enemy");
        } else {//如果找不到敌人
            //todo: none
        }
        //如果seeker中存在敌人，reset Prepare并跳转到Prepare阶段
    }

}

class Prepare extends BaseState {
    public name():string{return "PrepareState";}

    public execute(machine: AtkStateMachine): void {
    
        

        //判断是否需要重新选择目标并重置前摇
        let seeker = machine.seeker;
        let actor = machine.keeper;
        // console.log(seeker.focusChanged);
        if (seeker.focusChanged()) {//当前目标已修改
            // console.log("prepare:Focuschanged");
            machine.refresh();
            if (seeker.getFocus() != null) {
                machine.refresh();
            } else {
                machine.changeState(StateType.WAIT);
            }

            return;

        }

        //当前目标未修改
        machine.tic();
        if (machine.ready) {
            //todo: 进行攻击(进行profile参数判断)
            machine.keeper.attack(seeker.getFocus());
            machine.changeState(StateType.AFTER_ATK);//转换到后摇
            console.log("Attack Happened");
        }

    }
}

class AfterAtk extends BaseState {
    public name():string{return "AfterState";}
    public execute(machine: AtkStateMachine): void {
        machine.tic();
        if (machine.coolComplete) {
            machine.refresh();
            if (machine.seeker.getFocus() != null) {
                machine.changeState(StateType.PREPARE);
            } else {
                machine.changeState(StateType.WAIT);
            }
            console.log("Attack recover");
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
        return this._curPoint >= this._prepTime;
    }

    public tic():void{
        this._curPoint += this._velocity;
    }

    public get coolComplete():boolean{
        return this._curPoint >= this._prepTime+this._coolTime;
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

        this._prepTime = 300;
        this._coolTime = 300;

        this.seeker = new MapNodeSeeker(this.keeper.profile.getNodePos().plus(new Vec2(3,3)), res['xxx'], 0);
    }

    /**
     * 刷新当前状态，每帧调用
     */
    public update(): void {
        // console.log(this.curState.name());
        // console.log("pt:" + this._curPoint);
        this.seeker.update();
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





