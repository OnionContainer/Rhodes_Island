import { Vec2, MyMath } from "../../../OneFileModules/MyMath";
import { PArray } from "../../../OneFileModules/DataStructure";
import { Pos } from "./ActorModules/Position";
import { ColiEmit } from "./ActorModules/ColiMessage";
import { Profile } from "./ActorModules/Profile";
import { Symbolized, MySymbol } from "../../../OneFileModules/Symbol";
import { Buff } from "./ActorModules/Buff";
import {Seeker} from "./ActorModules/AtkAbst";
import { AtkStateMachine } from "./ActorModules/AtkAbst";
import { Damage } from "./ActorModules/Damage";
import { EventCentre } from "../../../OneFileModules/EventCentre";

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

export default abstract class Actor implements Symbolized{
    public symbol:MySymbol;//全局唯一的标识数字

    public static readonly Identity:ActorIdentity = new ActorIdentity();//Actor身份enum

    private _identity:string = Actor.Identity.ACTOR;//默认身份为Actor
    public get identity():string{return this._identity;}
    

    

    public grid:ColiEmit = new ColiEmit(0,0);//碰撞事件发布模块
    public profile:Profile = new Profile();//基本属性合集

    public buffList:Buff[] = [];

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


