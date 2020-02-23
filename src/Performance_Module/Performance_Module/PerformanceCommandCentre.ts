import { CustomizedSprite } from "./PerformanceCentre";
import { KVPair } from "../../OneFileModules/DataStructure";


//储存所有绘图节点对象
export class ObjectBox{
    public static Box:KVPair<CustomizedSprite> = new KVPair();
    public static add(spr:CustomizedSprite):void{
        ObjectBox.Box.edit(spr.getSymbNum() + "",spr);
    }

    public static get(sym:number):CustomizedSprite{
        return ObjectBox.Box.read(sym+"");
    }

    
}