import GameStateBase from "./GameStateBase";
import RhodesGame from "../RhodesGame";
import GameBattle from "../GameBattle";

export default class GameStateBattle extends GameStateBase{
    constructor(battle:GameBattle) {
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
    }
}