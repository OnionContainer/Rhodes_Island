import GameStateBase from "./GameStateBase";
import RhodesGame from "../RhodesGame";
import { GameStateID } from "./GameStateMgr";
import DodResourceMgr from "../../Resources/DodResourceMgr";
import DodLog from "../../Common/DodLog";

export default class GameStateLevelLoad extends GameStateBase{
    constructor(battle) {
        super(battle);
    }

    public enter(): void {
        super.enter();
        this._battle.prepareLevel();
    }

    public leave(): void {
        super.leave();
        DodResourceMgr.Instance.setLevelID(null);
    }

    public reset(): void {
        super.reset();
    }

    public update(): void {
        super.update();
        if (true == this._battle.isLevelPreprared()) {
            RhodesGame.Instance.stateMgr.runState(GameStateID.Battle);
            DodLog.debug(`GameStateLevelload.update: level [${DodResourceMgr.Instance.getLevelID()}] is prepared. `);
        }
    }
}