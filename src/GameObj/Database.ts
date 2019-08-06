import {Struc} from "../DataStructure"


const gameSet_URL:string = "./Database/GameSet.json",
enemyDatabase_URL:string = "./Database/EnemyDatabase.json",
operatorDatabase_URL:string = "./Database/OperatorDatabase.json"


type EnemyData = {
    name:string,
    speed:number
}

type EnemyEvent = {
    time:number,
    type:EnemyData,
    path:number[][]
}

export default class Database{
    private enemyData:JSON
    private operatorData:JSON
    private gameSet:JSON

    private timeTable:Struc.PointerList<EnemyEvent>
    constructor(){
        this.enemyData = Laya.loader.getRes(enemyDatabase_URL)
        this.operatorData = Laya.loader.getRes(operatorDatabase_URL)
        this.gameSet = Laya.loader.getRes(gameSet_URL)
        this.initTimeTable()
        console.log(this)
    }
    private initTimeTable(){
        this.timeTable = new Struc.PointerList<EnemyEvent>()
        this.gameSet["timetableBref"].forEach(element => {
            const time:number = element["time"]
            const type:EnemyData = this.enemyData[element["type"]]
            const path:number[][] = this.gameSet["paths"][element.path]
            this.timeTable.push({time,type,path})
        });
    }
}