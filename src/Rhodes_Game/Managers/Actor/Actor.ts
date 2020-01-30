import { Vec2, MyMath } from "../../../OneFileModules/MyMath";
import { PArray } from "../../../OneFileModules/DataStructure";
import { Pos } from "./ActorModules/Position";
import { GridSpace } from "./ActorModules/ColiMessage";
// import { GridSpace } from "./ActorModules/GridSpace";

export class ActorIdentity{
    public readonly ACTOR:string = "ACTOR";
    public readonly ENEMY:string = "ENEMY";
    public readonly OPERATOR:string = "OPERATOR";
}

export default abstract class Actor {
    
    public static readonly Identity:ActorIdentity = new ActorIdentity();

    private _identity:string = Actor.Identity.ACTOR;
    public get identity():string{return this._identity;}
    
    public pos:Pos = new Pos();
    
    public grid:GridSpace = new GridSpace(0,0);
    

    constructor() {

    }
}


