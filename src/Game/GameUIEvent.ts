import RhodesGame from "./RhodesGame";
import PerformanceCentre from "../Common/Graphics/Performance_Module/PerformanceCentre";
import { Vec2 } from "../Common/DodMath";

export default class GameUIEvent {

    private _cancleList:Function[] = [];//todo

    constructor() {
        this._registerEvent();
    }

    private _registerEvent(): void {

        PerformanceCentre.instance.mainSpr.on(Laya.Event.DOUBLE_CLICK, this, ()=>{
            let pos = new Vec2(2,2);//实际上应该从鼠标上获取
            RhodesGame.Instance.battle.actorMgr.deployOprt(1,pos);
        });
        

        //TODO 
        //@阿葱 在这个类里注册所有战斗模块所需接收的UI事件
        //@example
        //eventcenter.on(eventcenter.gamepause, this, this._onGamePause);
    }

    /**
     * UI事件处理类基本完全通过事件与外界进行交互，没有进行帧循环的必要
     * 此处的update函数仅用于开发便利
     */
    public update():void{

    }

    //@example
    // private _onGamePause(): void {
    //     RhodesGame.Instance.battle.level.pauseGame();
    // }
}