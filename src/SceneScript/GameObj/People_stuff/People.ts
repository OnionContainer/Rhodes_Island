import { ColiBox } from "../../../Toybox/MassEffect";

export default abstract class People{
    constructor() {
        
    }
}

export class Buff{
    private permanent:boolean;
    private countDown:number;
}


class DamageType{
    public readonly PHYSICAL:string = "PHYSICAL";
    public readonly MAGICAL:string = "MAGICAL";
    public readonly CRITICAL:string = "CRITICAL";
}

/**
 * Damage是一个储存伤害信息的类
 */
export class Damage{
    private _value:number;      //多高的伤害
    public get value():number{
        return this._value;
    }

    private _creator:People;    //谁造成的伤害
    public get creator():People{
        return this._creator;
    }

    private _type:string;       //伤害类型(物伤法伤真伤)
    public get type():string{
        return this._type;
    }

    constructor(value:number, creator:People, type:string){
        this._value = value;
        this._creator = creator;
        this._type = type;
    }
}

/**
 * Weapon是一个储存攻击能力信息的类
 */
export class Weapon{
    private _boxes:ColiBox[] = [];
    private _originX:number = 0;
    private _originY:number = 0;
}