import DodLog from "../Common/DodLog";
import GameStateMgr from "./State/GameStateMgr";
import GameBattle from "./GameBattle";
import GameLobby from "./Lobby/GameLobby";

/**
 * 这是游戏本体
 * 说一些Rhodes_Game文件夹下的注释规则，方便以后ctrl+f
 *
 * 1.//@todo 标注需要完善的部分
 *
 * 2.//@tofix 标注已知有问题的部分
 *
 * 3.//@test 标注仅供测试使用的部分
 *
 * 3.//@redcall 标注调用渲染模块的部分
 *
 */
export default class RhodesGame {
    private static _instance: RhodesGame;
    public static get Instance(): RhodesGame {
        return this._instance || (this._instance = new this());
    }

    public stateMgr: GameStateMgr;
    public battle: GameBattle;
    public lobby: GameLobby;

    public constructor() {
        this.battle = new GameBattle();
        this.stateMgr = new GameStateMgr(this.battle);
        
    }

    public init(): void {
        this.stateMgr.init();
        DodLog.debug(`RhodesGame: initialization complete. `)
    }

    public update(): void {
        this.stateMgr.update();
    }


}