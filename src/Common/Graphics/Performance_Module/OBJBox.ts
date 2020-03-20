//author Na2CuC4O8

import ActorRU from "./SymbolizedRender";
import { KVPair } from "../../DodDataStructure";
import { MySymbol } from "../../../Fix/FixSymbol";


//储存所有绘图节点对象
export class ActorBox{
    public static Box:KVPair<ActorRU> = new KVPair();
    public static add(act:ActorRU,symb:MySymbol):void{
        ActorBox.Box.edit(symb.data+"",act);
    }

    public static get(sym:number):ActorRU{
        return ActorBox.Box.read(sym+"");
    }

    
}