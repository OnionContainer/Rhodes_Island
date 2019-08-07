import {ui} from "../ui/layaMaxUI"

export default class Loading extends ui.LoadingSceneUI{
    constructor(){
        super()
        const gameSet:string = "./Database/GameSet.json",
        enemyDatabase:string = "./Database/EnemyDatabase.json",
        operatorDatabase:string = "./Database/OperatorDatabase.json"
        Laya.loader.load([gameSet,enemyDatabase,operatorDatabase],Laya.Handler.create(this, this.onLoaded),null,Laya.Loader.JSON)
    }

    onLoaded(){
        Laya.Scene.open("GameFieldScene.scene")
        // console.log(Laya.loader)
    }
}