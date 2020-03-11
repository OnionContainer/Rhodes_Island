import RhodesGame from "./RhodesGame";

export default class GameUIEvent {
    constructor() {
        this._registerEvent();
    }

    private _registerEvent(): void {
        //TODO 
        //@阿葱 在这个类里注册所有战斗模块所需接收的UI事件
        //@example
        //eventcenter.on(eventcenter.gamepause, this, this._onGamePause);
    }

    //@example
    // private _onGamePause(): void {
    //     RhodesGame.Instance.battle.level.pauseGame();
    // }
}