import { ColiReceiver } from "./ColiMessage";
import { KVPair, ArrayAlgo } from "../../../../OneFileModules/DataStructure";
import Oprt from "../Oprt";
import { Enemy } from "../Enemy";
import { Vec2 } from "../../../../OneFileModules/MyMath";
import Actor from "../Actor";

enum StateType{
    WAIT = "WAIT",
    PREPARE = "PREPARE",
    AFTER_ATK = "AFTER_ATK"
}

interface State{
    execute(machine:OprtStateMachine, seeker:EnemySeeker, oprt:Oprt):void
    reset():void
}

class Wait implements State{
    public time:number = 0;

    public reset():void{
        this.time = 0;
    }

    public execute(machine:OprtStateMachine, seeker:EnemySeeker, oprt:Oprt):void{
        
        if (seeker.captureList.length !== 0) {//如果能够找到敌人
            let prepare:Prepare = machine.stateList.read(StateType.PREPARE) as Prepare;
            prepare.reset();
            //这里以后会修改，是根据enemy到终点的距离选择focus
            prepare.focus = seeker.captureList[0];//设定prepare阶段所瞄准的敌人
            seeker.focus = prepare.focus;//设定seeker“额外关注”的敌人
            machine.curState = prepare;//切换状态机的当前状态
            console.log("Found Enemy, Switch to prepare phase @"+ this.time);
        } else {//如果找不到敌人
            this.time += 1;
        }
        //如果seeker中存在敌人，reset Prepare并跳转到Prepare阶段
    }
}

class Prepare implements State{
    public time:number = 0;
    public focus:Enemy;

    public reset():void{
        this.time = 0;
        this.focus = null;
    }

    public execute(machine:OprtStateMachine, seeker:EnemySeeker, oprt:Oprt):void{
        //如果focus一致
            //增添1计数
            //如果计数已满
                //进行攻击并跳转到AfterAtk阶段
        //如果focus不一致
            //如果seeker中仍存在敌人
                //重新回到Prepare阶段
            //如果seeker中没有敌人
                //跳转到Wait阶段
        if (this.focus === seeker.focus) {//focus 一致
            this.time += 1;
            if (this.time >= oprt.profile.PrepTime) {
                console.log("Attack & to After Phase @" + this.time);//进行攻击
                //进入后摇状态
                let after:After_Atk = machine.stateList.read(StateType.AFTER_ATK) as After_Atk;
                after.reset();
                machine.curState = after;
            }
        } else {//focus 不一致
            if (seeker.captureList.length !== 0) {//找到新目标
                console.log("Reset Prepare Phase @" + this.time);
                //重设前摇状态
                this.reset();
                //寻找合适的enemy
                this.focus = seeker.captureList[0];
                seeker.focus = this.focus;
            } else {//未找到目标
                console.log("Target Lost @" + this.time);
                //进入等待状态
                let wait:Wait = machine.stateList.read(StateType.WAIT) as Wait;
                wait.reset();
                machine.curState = wait;
            }
        }
    }
}

class After_Atk implements State{
    public time:number = 0;

    public reset():void{
        this.time = 0;
    }

    public execute(machine:OprtStateMachine, seeker:EnemySeeker, oprt:Oprt):void{
        this.time += 1;//单纯计个数，满了就返回wait状态
        if (this.time >= oprt.profile.AfterTime) {
            console.log("Wait After ATK End, to Wait @"+this.time);
            let wait:Wait = machine.stateList.read(StateType.WAIT) as Wait;
            wait.reset();
            machine.curState = wait;
        }
    }
}

export class OprtStateMachine{
    public curState:State;
    public stateList:KVPair<StateType, State> = new KVPair<StateType, State>();
    public seeker:EnemySeeker;
    constructor(seeker:EnemySeeker){
        this.seeker = seeker;
        this.curState = new Wait();
        this.stateList.edit(StateType.WAIT, this.curState);
        this.stateList.edit(StateType.PREPARE, new Prepare());
        this.stateList.edit(StateType.AFTER_ATK, new After_Atk());
    }

    public execute(oprt:Oprt):void{
        this.curState.execute(this, this.seeker, oprt);
    }
}

export class EnemySeeker extends ColiReceiver{
    public focus:Enemy;
    /*
    这个focus的逻辑是这样
    它将会由状态机中的状态实例进行设置，在Prepare阶段锁定一个敌人交由EnemySeeker重点监控
    怎么个重点呢就是当这个_focus指向的Enemy完全离开监控范围时，_focus会被设为null
    这样状态机看一眼_focus没了它就知道，目标丢失了。单体攻击的干员看到目标丢失了，就应该重置自己的攻击状态
    这就是白雪a不出来的原理（白雪是只攻击一个人然后带溅射，相对的我这里aoe指的是小火龙狮蝎开大远山送葬者这种
    只要范围里有敌人就一定会A出来的类型，这些人会另外写一个Prepare类来用，把focus的逻辑忽略掉）
    这个类里面只负责删focus不负责设置focus。相关代码在onLeave里
    */

    private _range:Vec2[];//所有受监控的坐标
    private _countList:KVPair<number, number> = new KVPair<number, number>();//记录每一个Enemy的进入次数
    /*
    这个countList的逻辑是这样
    因为我们可能一次性监控好几个格子，一个敌人有可能处于好几个我们监控的格子内
    此时如果看到他发的离开事件就把他放掉，有可能就不对
    他可能还在某个别的我们监控中的格子里
    （可能讲得比较抽象，考虑画画图看看，或者来找我，我是群主）
    所以我们就要记这个enemy在我们监控的地方发布了多少次进入事件，发布了多少次离开事件
    这个表就是记录他进入了多少次，然后每离开一次就-1
    当他发布离开事件且表里记录他只进入过1次的时候，就1-1=0，把它放走
    */
    public captureList:Enemy[] = [];//然后这个就是用来记录监控区域里所有enemy的数组

    //这注释真的大坨

    constructor(width:number = 10, height:number = 10, range:Vec2[] = []){
        super(width,height);
        this._range = range;
        this._range.forEach(ele=>{
            this.setDetection(ele, Actor.Identity.ENEMY);
        });
    }

    protected onEntre(enemy:Enemy, position:Vec2):void{
        const count = this._countList.read(enemy.symbol.data);

        if (count === undefined || count <= 0) {//此敌人未被记录
            this.captureList.push(enemy);
            this._countList.edit(enemy.symbol.data, 1);
        } else {//此敌人已被记录
            this._countList.edit(enemy.symbol.data, count + 1);
        }
    }

    protected onLeave(enemy:Enemy, position:Vec2):void{
        const count = this._countList.read(enemy.symbol.data);
        if (count === undefined) {
            //理论上不会有未捕获的敌人还向这里发布离开事件
            //但是还是加个判空以防万一
            return;
        }
        if (count > 1) {//这个目标离开了一个监控中的区域，但还处于至少一个监控区域中
            this._countList.edit(enemy.symbol.data, count - 1);
        } else {//这个目标离开了所有监控中的区域
            this._countList.edit(enemy.symbol.data, 0);//进入次数设为0
            ArrayAlgo.removeEle(enemy, this.captureList);//从列表里删掉
            if (this.focus === enemy) {//如果这个enemy在被focus就把focus删掉
                this.focus = null;
            }
        }
    }

    /**
     * 
     * @param source 全局Enemy分布
     * @param centre 旋转中心
     * @param rotateTimes 要顺时针旋转多少次
     */
    public rotateClockwise(source:Enemy[][], centre:Vec2[], rotateTimes:number = 1):void{

    }
}




export class TTTT{
    constructor(){
        // let list = new KVPair<Oprt, string>();
        // let k = new Oprt();
        // list.edit(k, "ab");
        // console.log(list);
    }
}