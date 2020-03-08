import { Damage } from "./Damage";
import Actor from "../Actor";
import Oprt from "../Oprt";

export enum BuffType{
    Default = "Default",
    PowerStrike = "PowerStrike"
}


/**
 * 作者：草生葱
 * 
 */
export abstract class Buff{

    public creator:Actor;
    public keeper:Actor;
    public type:BuffType = BuffType.Default;
    public time:number = 0;


    constructor(creator:Actor=null, keeper:Actor=null, type:BuffType=BuffType.Default){
        this.creator = creator;
        this.keeper = keeper;
        this.type = type;
    }

    /**
     * 每帧更新内容
     */
    public update():void{}

    /**
     * 摧毁此buff时触发的函数
     */
    public onDestroy():void{}
}
