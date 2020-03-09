import { Buff } from "./Actor/ActorModules/Buff";
import { EventCentre } from "../Event/EventCentre";
import FixTime from "../Fix/FixTime";
import DodResourceMgr from "../Resources/DodResourceMgr";
import GameBattleConst from "./GameBattleConst";
/**
 * 模块说明: 游戏战斗地图模块  
 * 负责内容: 地图属性设置，全局buff管理  
 * 负责人: 银华  
 * 时间: 2020年3月3日12:45:41  
 */

//KR: 全局由关卡模块管理 @银华
//这里可以包含全局的调整值/生命值/涨费
//全游戏标准值使用常量定义在BattleConst类中 示例可以看下方
//另：私有成员命名请在前面加下划线 声明的成员请在构造函数中全部初始化一个值，防止undefined(野指针)的情况发生

export default class GameLevel{
    private _initialCost:number;
    private _currentCost:number;

    private _lifePoint:number;

    private _timeLine:number;

    private _globalBuffList: Buff[];

    constructor(){
        this._initialCost = 0;
        this._currentCost = 0;
        this._lifePoint = 0;
        this._timeLine = 0;
        this._globalBuffList = [];
    }

    public init(res: any): void {
        //for example
        this.reset();
        this._initialCost = this._currentCost = res['initCost'] || GameBattleConst.initCostNum;
        this._lifePoint = res['life'] || GameBattleConst.lifePoint;
        this._timeLine = 0;
    }

    public update():void{
        this.getGlobalBuffList();
        this._updateTime(); 
        this._updateCost();
    }

    public getGlobalBuffList():Buff[]{
        return this._globalBuffList;
    }

    public changeCost():void{
        //todo....
    }

    private _updateTime(): void {
        this._timeLine += FixTime.deltaTime;
    }

    private _updateCost(): void {

    }

    public reset(): void {
        this._globalBuffList.splice(0, this._globalBuffList.length);
    }
}
