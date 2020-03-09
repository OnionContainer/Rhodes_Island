import GameBattle from "../GameBattle";

export default class GameStateBase {
    protected _battle: GameBattle;

    constructor(battle: GameBattle) {
        this._battle = battle;
    }

    public enter(): void {

    }

    public update(): void {

    }

    public leave(): void {

    }

    public reset(): void {

    }
}