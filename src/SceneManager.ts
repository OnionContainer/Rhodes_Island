import EventCentre from "./Toybox/EventCentre";
import Database from "./Toybox/Database";


export default class SceneManager{
    private loadingScene:string = "LoadingScene.scene";
    private gameScene:string = "GameScene.scene";
    constructor(){
        EventCentre.init();
        Database.init();
        
        Laya.Scene.open(this.loadingScene);

        EventCentre.inst.once("Init", "Regular", this, ()=>{
            Laya.Scene.open(this.gameScene)
        })
    }
}