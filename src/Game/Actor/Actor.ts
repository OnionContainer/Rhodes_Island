import { Vec2, DodMath } from "../../Common/DodMath";
import { PArray } from "../../Common/DodDataStructure";
import { Pos } from "./ActorModules/Position";
import { ColiEmit } from "./ActorModules/ColiMessage";
import { Profile } from "./ActorModules/Profile";
import { Symbolized, MySymbol } from "../../Fix/FixSymbol";
import { Buff } from "./ActorModules/Buff";
import {Seeker} from "./ActorModules/AtkAbst";
import { AtkStateMachine } from "./ActorModules/AtkAbst";
import { Damage } from "./ActorModules/Damage";
import { EventCentre } from "../../Event/EventCentre";

// import { GridSpace } from "./ActorModules/GridSpace";


/**
 * 这个东西不是enum是个历史遗留问题
 * 凑合用吧，Actor.Identity里可以拿到
 */
export class ActorIdentity{
    public readonly ACTOR:string = "ACTOR";
    public readonly ENEMY:string = "ENEMY";
    public readonly OPERATOR:string = "OPERATOR";
}

/**
 * 作者：葱
 * 这里只是记录一下Actor需要有什么接口，然后丢给Actor继承一下防报错
 * 此类本身没有实际意义
 * 请勿使用
 * 
 * 另：这些操作似乎违反了单一职责原则
 * Actor应该只开放“操作接口”
 * 而Actor.profile只开放“数据访问接口”
 * 待讨论
 */
abstract class ActorRequire{

    setAbleToBlock(state:boolean):void{}//设为可以进行阻挡/不可以进行阻挡

    ableToBlock():boolean{return true;}//可以进行阻挡

    setMoveable(state:boolean):void{}//设为可以移动/不可以移动

    moveable():boolean{return true;}//可以进行移动

    setBlocked(state:boolean):void{}//设为已被阻挡/未被阻挡

    isBlocked():boolean{return true;}//已被阻挡

    ableToBeBlocked():boolean{return true;}//可以被阻挡
}

export default abstract class Actor extends ActorRequire implements Symbolized{
    public symbol:MySymbol;//全局唯一的标识数字

    public static readonly Identity:ActorIdentity = new ActorIdentity();//Actor身份enum

    private _identity:string = Actor.Identity.ACTOR;//默认身份为Actor
    public get identity():string{return this._identity;}
    

    

    public grid:ColiEmit = new ColiEmit(0,0);//碰撞事件发布模块
    public profile:Profile = new Profile();//基本属性合集


    /**
     * 目标选择器
     */
    public seeker: Seeker;

    /*
    * 当前锁定目标
    * */
    public focus: Actor;

    public buffList:Buff[] = [];//增益/减益状态列表
    public skill:any = null;//这是技能
    public atkSM:any = {update: function(){}};//攻击状态机

    
    constructor() {
        super();
        this.symbol = new MySymbol();
    }

    /**
     * 攻击一个或多个Actor目标
     * 2020/3/5 攻击逻辑已从事件触发改为直接调用
     * 发起和接收攻击的逻辑均封装在Actor类中
     * @param victim 
     */
    public attack(...victim:Actor[]):void{
        let dmg:Damage = this.profile.generateDamage(this);

        victim.forEach(ele=>{
            this.beAttacked(dmg.copy());
        });
    }
    
    /**
     * 被攻击
     * @param damage 
     */
    public beAttacked(damage:Damage):void{
        //@todo
        //减少生命值
        //发出攻击事件
        //（可能）发出死亡事件
    }
    
    /**
     * 移除buff
     * @param buff 
     */
    public removeBuff(buff:Buff):void{
        let i:number = this.buffList.indexOf(buff);
        if (i == -1) {
            return;
        }
        this.buffList[i].onDestroy();
        this.buffList.splice(i,1);
    }
}


