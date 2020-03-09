import { Vec2, DodMath } from "../Common/DodMath";
import { ArrayAlgo } from "../Common/DodDataStructure";

export class FixRect extends Laya.Rectangle{
    constructor(x?:number, y?:number, width?:number, height?:number){
        super(x,y,width,height);
    }
}

