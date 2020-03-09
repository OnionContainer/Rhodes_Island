import GameStateBase from "./GameStateBase";
import GameStateBattle from "./GameStateBattle";
import DodLog from "../../Common/DodLog";
import GameStateLevelLoad from "./GameStateLevelload";
import GameStateGameload from "./GameStateGameload";
import GameStateLobby from "./GameStateLobby";
import RhodesGame from "../RhodesGame";

export enum GameStateID {
    None,
    Gameload,
    Lobby,
    Levelload,
    Battle,
    Count
}

/*
 * 大状态机 管理游戏所处阶段
 * @TODO GAMELOAD LOBBY LEVELLOAD BATTLE
 */
export default class GameStateMgr {
    private _states: GameStateBase[];
    private _currentState: GameStateBase;

    constructor() {
        this._currentState = null;
        let battle = RhodesGame.Instance.battle;
    
        this._states = [];
        this._states.push(null);
        this._states.push(new GameStateGameload(battle));
        this._states.push(new GameStateLobby(battle));
        this._states.push(new GameStateLevelLoad(battle));
        this._states.push(new GameStateBattle(battle));
    }
    
    public init(): void {
        this.runState(GameStateID.Gameload);
    }

    public runState(stateID: GameStateID): void {
        if (GameStateID.Count <= stateID || stateID <= GameStateID.None) {
            DodLog.error(`GameStateMgr.runState: Invalid stateID [${stateID}]. `);
            return;
        }

        if (null != this._currentState) {
            this._currentState.leave();
        }

        this._currentState = this._states[stateID];
        this._currentState.enter();
    }

    public update(): void {
        if (null != this._currentState) {
            this._currentState.update();
        }
    }

    public reset(): void {
        if (null != this._currentState) {
            this._currentState.leave();
            this._currentState = null;
        }

        for (let i = 0; i < this._states.length; i++) {
            let state = this._states[i];
            state.reset();
        }
    }
}