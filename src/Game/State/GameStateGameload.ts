import GameStateBase from "./GameStateBase";
import RhodesGame from "../RhodesGame";
import DodResourceMgr from "../../Resources/DodResourceMgr";
import { GameStateID } from "./GameStateMgr";
import DodLog from "../../Common/DodLog";

export default class GameStateGameload extends GameStateBase{
    constructor(battle) {
        super(battle);
    }

    public enter(): void {
        super.enter();
        //TODO SHOW LOADING SCREEN
    }

    public leave(): void {
        super.leave();
    }

    public reset(): void {
        super.reset();
    }

    public update(): void {
        super.update();
        console.log("GameLoad update");
        if (true == DodResourceMgr.Instance.inited()) {
            //WE DO NOT HAVE LOBBY MODULE IN THIS VERSION
            //JUST SET LEVEL ID HERE
            //TO DEL
            DodResourceMgr.Instance.setLevelID(1);
            RhodesGame.Instance.stateMgr.runState(GameStateID.Levelload);
            DodLog.debug(`GameStateGameload.update: Resources init complete, set level into 1. `);
        }
    }
}