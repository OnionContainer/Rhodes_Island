import GameStateBase from "./GameStateBase";
import RhodesGame from "../RhodesGame";

export default class GameStateBattle extends GameStateBase{
    constructor(battle) {
        super(battle);
    }

    public enter(): void {
        super.enter();
    }

    public leave(): void {
        super.leave();
    }

    public reset(): void {
        super.reset();
    }

    public update(): void {
        super.update();
        
        this._battle.map.update();
        this._battle.enemyMgr.update();
        this._battle.oprtMgr.update();
    }
}