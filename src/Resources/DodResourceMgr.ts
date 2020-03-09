export default class DodResourceMgr {
    private static _instance: DodResourceMgr;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    //TODO @银华
    //load resources here including JSON / TEXTURE / AVATAR / SPINE
    //private _json: DodJsonLoader;
    //private _tex: DodTextureLoader;

    private _levelID: number | null;
    private _inited: boolean;
    private _levelPrepared: boolean;

    constructor() {
        this._levelID = null;
        this._inited = false;
        this._levelPrepared = false;
    }

    public setLevelID(id: number | null): void {
        this._levelID = id;
        this._levelPrepared = false;
    }

    public getLevelID(): number | null {
        return this._levelID;
    }

    public init(): void {
        //TODO LOAD
        //this._json.load();
        //this._tex.load();
        //set inited flag true while initialization complete
    }

    public inited(): boolean {
        return this._inited;
    }

    public update(): void {
        if (null != this.setLevelID && false == this._levelPrepared) {
            //prepare prefab here
            if (1) {    //make sure prefab prepared
                this._levelPrepared = true;
            }
        }
    }

    public isLevelPrepared(): boolean {
        return this._levelPrepared;
    }

    public getCurrentLevelRes(): any {
        //TODO
        return null;
    }

    public getActorResByID(id: number): any {
        //TODO
        return null;
    }
}