import Actor from "../Actor";

export enum DamageType{
    PYSICAL,
    MAGICAL,
    TRUE,
}

export class Damage{
    public source:Actor


    public atk:number = 0;//基础攻击力
    public type:DamageType//伤害类型
    
    public pctResistance:number = 1;//百分比抗性
    public pctIncrement:number = 1;//百分比增长（比如阿的百分比增长buff）
    public numResistance:number = 0;//数值抗性
    public numIncrement:number = 0;//数值增长
    //基数的加减直接体现在atk上
    public primary:boolean = true;//是否为非间接伤害（间接伤害会触发星熊、年的反甲之类的效果）

    constructor(basicATK:number = 0){
        this.atk = basicATK;
    }

    public finalValue():number{
        return this.atk*this.pctIncrement/this.pctResistance+this.numIncrement-this.numResistance;
    }
}