import Oprt from "../Oprt";

export class Profile {
    public name: String = "Chandler Bing";

    private _prepTime: number = 100;//前摇时间
    private _afterTime: number = 100;//后摇时间
    private _breakthrough: number = 1;//破除阻挡能力
    public invisible: boolean = false;//是否隐形
    public blocked: boolean = false;//已被阻挡
    public blocker: Oprt;//阻挡者

    public attackPower: number = 1;//攻击力
    public hitPoint: number = 10;//生命值
    public maxHitPoint: number = 10;

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

    constructor() {

    }
}

/**
 * 是否需要在profile中将不同的数值分类？
 *
 */