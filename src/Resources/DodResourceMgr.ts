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

    constructor() {
        this._levelID = null;
        this._inited = false;
    }

    public setLevelID(id: number | null): void {
        this._levelID = id;
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
}