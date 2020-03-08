import Actor from "../Actor";

export enum DamageType{
    PYSICAL,
    MAGICAL,
    TRUE,
}

export class Damage{

    public source:Actor = null;//伤害来源
    public value:number = 0;//攻击力
    public type:DamageType//伤害类型
    public primary:boolean = true;//是否为非间接伤害（间接伤害不会触发星熊、年的反甲之类的效果）

    constructor(source:Actor, value:number, type:DamageType){
        this.value = value;
    }

    public copy():Damage{
        let result = new Damage(this.source, this.value, this.type);
        result.type = this.type;
        result.primary = this.primary;
        result.source = this.source;
        return result;
    }
}