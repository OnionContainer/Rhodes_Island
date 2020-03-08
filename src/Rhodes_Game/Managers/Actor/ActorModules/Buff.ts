import { Damage } from "./Damage";

export abstract class Buff{
    /**
     * 处理发出的伤害对象的函数
     * @param damage 
     */
    public launchDamage(damage:Damage):Damage{
        return damage;
    }
    /**
     * 处理接收的伤害对象的函数
     * @param damage 
     */
    public recieveDamage(damage:Damage):Damage{
        return damage;
    }
}