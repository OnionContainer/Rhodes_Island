import EventCentre from "./Toybox/EventCentre";
import Database from "./Toybox/Database";

export default class SceneManager{
    private loadingScene:string = "LoadingScene.scene";
    private gameScene:string = "GameScene.scene";
    constructor(){
        EventCentre.init();
        Database.init();
        //初始化事件中心和数据库
        
        Laya.Scene.open(this.loadingScene);//打开加载场景

        EventCentre.instance.once("Init", "Regular", this, ()=>{//监听加载完毕事件
            Laya.Scene.open(this.gameScene);
        });
    }
}


