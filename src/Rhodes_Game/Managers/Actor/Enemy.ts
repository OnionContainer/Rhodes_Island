import Actor from "./Actor";
import { PArray } from "../../../OneFileModules/DataStructure";
import { Vec2 } from "../../../OneFileModules/MyMath";

export class Enemy extends Actor{
        
    public correspondedPath:Vec2[];//仅用于存储相关的路径的指针
    public pathSegCount:number;//目前正在朝此路径的哪个点前进
    
    constructor(){
        super();
        
        
    }
}



