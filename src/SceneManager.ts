// import EventCentre from "./Toybox/EventCentre";
// import Database from "./Toybox/Database";

export default class SceneManager{
    private static _instance: SceneManager;
    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    private readonly loadingScene:string = "LoadingScene.scene";
    private readonly gameScene:string = "GameScene.scene";

    public awake(): void {
        Laya.Scene.open(this.gameScene);
    }
}


