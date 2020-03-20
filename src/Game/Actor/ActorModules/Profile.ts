import { Damage, DamageType } from "./Damage";
import Actor from "../Actor";
import { ActorType } from "../../../Common/DodKey";


/**
 * Profile类是储存单位基本数据（如攻击力、防御力等）的类
 * 它还提供一切用于获取Actor信息的接口（如是否能够行动、是否能够阻挡）
 */
export class Profile {
    public name: String = "Chandler Bing";
    public readonly keeper:Actor;

    private _prepTime: number = 100;//前摇时间
    private _afterTime: number = 100;//后摇时间
    private _breakthrough: number = 1;//破除阻挡能力
    public invisible: boolean = false;//是否隐形
    public blocked: boolean = false;//已被阻挡
    public blocker: Actor;//阻挡者

    /**
     * 伤害计算相关的修改和访问接口
     * 作者：葱
     */
    public attackPower: number = 100;//攻击力
    public atkScale:number = 1;//攻击倍率
    public atkBuff:number = 1;//攻击百分比提升
    public armour:number = 50;//物理防御
    public magicArmour:number = 0;//法术抗性
    public dmgType:DamageType = DamageType.PYSICAL;//伤害类型

    public constructor(keeper:Actor, res:any){
        this.keeper = keeper;
        //todo: about res
    }

    /**
     * 传入一个Actor，返回伤害对象
     * @param source 
     */
    public generateDamage(source:Actor):Damage{
        return new Damage(source, this.attackPower*this.atkScale*this.atkBuff, this.dmgType);
    }

    public hitPoint: number = 10;//生命值
    public maxHitPoint: number = 10;//最高生命值

    /**
     * by XWV
     */
    public hateLevel: number = 0;
    public attackRangeRadius: number;


    public get prepTime(): number {
        return this._prepTime;
    }

    public get afterTime(): number {
        return this._afterTime;
    }

    public get breakthrough(): number {
        return this._breakthrough;
    }

   
}

/**
 * 是否需要在profile中将不同的数值分类？
 *
 */