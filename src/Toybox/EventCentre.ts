import { Struc } from "./DataStructure";

class FieldName{
    public get Global():string{
        return "Global";
    }
    public get People():string{
        return "People";
    }
    public get CreateEnemySprite():string{
        return "CreateEmemySprite";
    }
}

class TypeName{
    public get Any():string{
        return "Any";
    }
}

export default class EventCentre{
    public static inst:EventCentre;//自身的实例
    public static init():void{
        EventCentre.inst = new EventCentre();
        this.init = ()=>{};
    }
    private constructor(){};

    private _eventFields:Struc.Map<string, Laya.EventDispatcher> = new Struc.Map<string, Laya.EventDispatcher>();
    /**
     * 区分不同的事件区域
     * 一个事件区域的事件，不能被另一个事件区域的监听器得知
     */
    public static readonly FieldName:FieldName = new FieldName();
    public static readonly TypeName:TypeName = new TypeName();
    
    public on(field:string, type:string, caller:any, method:Function, args?:any[]):void{//就比EventDispatcher.on多个事件区域
        if (!this._eventFields.keyExist(field)) {
            this._eventFields.set(field, new Laya.EventDispatcher());
        }
        this._eventFields.get(field).on(type, caller, method, args);
    }

    public event(field:string, type:string, args?:any[]):void{//就比EventDispatcher.event多个事件区域
        if (!this._eventFields.keyExist(field)){
            return;
        }
        this._eventFields.get(field).event(type, args);
    }

    public once(field:string, type:string, caller:any, method:Function, args?:any[]):void{//就比EventDispatcher.once多个事件区域
        if (!this._eventFields.keyExist(field)) {
            this._eventFields.set(field, new Laya.EventDispatcher());
        }
        this._eventFields.get(field).once(type, caller, method, args);
    }
}

