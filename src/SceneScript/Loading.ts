import {ui} from "../ui/layaMaxUI"
import EventCentre from "../Toybox/EventCentre";

export default class Loading extends ui.LoadingSceneUI{
    constructor(){
        super()
        const gameSet:string = "./Database/GameSet.json",
        enemyDatabase:string = "./Database/EnemyDatabase.json",
        operatorDatabase:string = "./Database/OperatorDatabase.json";

        //加载游戏设置，敌人数据库，干员数据库
        Laya.loader.load([gameSet,enemyDatabase,operatorDatabase], Laya.Handler.create(this, this.onLoaded),null,Laya.Loader.JSON)
    }

    onLoaded(){
        EventCentre.i.event("Init", "Regular");
    }
}