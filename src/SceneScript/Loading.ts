import {ui} from "../ui/layaMaxUI"
import EventCentre from "../Toybox/EventCentre";

export default class Loading extends ui.LoadingSceneUI{
    constructor(){
        super()
        const gameSet:string = "./Database/GameSet.json",
        enemyDatabase:string = "./Database/EnemyDatabase.json",
        operatorDatabase:string = "./Database/OperatorDatabase.json"
        Laya.loader.load([gameSet,enemyDatabase,operatorDatabase],Laya.Handler.create(this, this.onLoaded),null,Laya.Loader.JSON)
    }

    onLoaded(){
        EventCentre.inst.event("Init", "Regular")
    }
}