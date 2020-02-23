import Actor from "./Actor";
import { PArray } from "../../../OneFileModules/DataStructure";
import { Vec2 } from "../../../OneFileModules/MyMath";
import { Pos } from "./ActorModules/Position";
import Oprt from "./Oprt";

export class Enemy extends Actor{

    public pos:Pos = new Pos();//质点模块
    public correspondedPath:Vec2[];//仅用于存储相关的路径的指针
    public pathSegCount:number;//目前正在朝此路径的哪个点前进
    
    constructor(){
        super();
    }

    public onBlock(oprt:Oprt){//阻挡函数
        this.profile.blocked = true;
        this.profile.blocker = oprt;
    }

    public onRelease(){//解除阻挡函数
        this.profile.blocked = false;
        this.profile.blocker = null;
    }
}



