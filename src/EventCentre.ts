import { Struc } from "./DataStructure";

class Name{
    public get Global():string{
        return "Global"
    }
    public get People():string{
        return "People"
    }
}

export default class EventCentre{
    private static _eventFields:Struc.HashMap<string, Laya.EventDispatcher> = new Struc.HashMap<string, Laya.EventDispatcher>();
    /**
     * 区分不同的事件区域
     * 一个事件区域的事件，不能被另一个事件区域的监听器得知
     */
    private static _instance:EventCentre//自身的实例（目前使用静态方法就没什么用
    public static readonly Name:Name = new Name()
    
    public static on(field:string, type:string, caller:any, method:Function, args?:any[]):void{//就比EventDispatcher.on多个事件区域
        if (!this._eventFields.keyExist(field)) {
            this._eventFields.set(field, new Laya.EventDispatcher())
        }
        this._eventFields.get(field).on(type, caller, method, args)
    }

    public static event(field:string, type:string, args?:any[]):void{//就比EventDispatcher.event多个事件区域
        if (!this._eventFields.keyExist(field)){
            return
        }
        this._eventFields.get(field).event(type, args)
    }

    public static once(field:string, type:string, caller:any, method:Function, args?:any[]):void{//就比EventDispatcher.once多个事件区域
        if (!this._eventFields.keyExist(field)) {
            this._eventFields.set(field, new Laya.EventDispatcher())
        }
        this._eventFields.get(field).once(type, caller, method, args)
    }
}

