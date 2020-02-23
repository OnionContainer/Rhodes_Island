import { Vec2, MyMath } from "../../../OneFileModules/MyMath";
import { PArray } from "../../../OneFileModules/DataStructure";
import { Pos } from "./ActorModules/Position";
import { ColiEmit } from "./ActorModules/ColiMessage";
import { Profile } from "./ActorModules/Profile";
import { Symbolized, MySymbol } from "../../../OneFileModules/Symbol";
import { Buff } from "./ActorModules/Buff";
// import { GridSpace } from "./ActorModules/GridSpace";

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
    
    constructor() {
        this.symbol = new MySymbol();
    }
}


