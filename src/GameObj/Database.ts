import {Struc} from "../DataStructure"


const gameSet_URL:string = "./Database/GameSet.json",
enemyDatabase_URL:string = "./Database/EnemyDatabase.json",
operatorDatabase_URL:string = "./Database/OperatorDatabase.json"




type EnemyEvent = {
    time:number,
    typeData:any,
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
    }


    private initTimeTable(){
        this.timeTable = new Struc.PointerList<EnemyEvent>()
        this.gameSet["timetableBref"].forEach(element => {
            const time:number = element["time"]
            const typeData:any = this.enemyData[element["type"]]
            const path:number[][] = this.gameSet["paths"][element.path]
            this.timeTable.push({time,typeData,path})
        });
    }




    public isHappening(time:number):boolean{
        return this.timeTable.read() && time === this.timeTable.read().time
    }

    public readTimeEvent():EnemyEvent{
        return this.timeTable.read()
    }

    public readTimeEventDone():void{
        this.timeTable.step()
    }

    public getPath(pathName:string):number[][]{
        return this.gameSet["paths"][pathName]
    }

    public getEnemy(enemyName:string):any{
        return this.enemyData[enemyName]
    }

    public getOperator(operatorName:string):any{
        return this.operatorData[operatorName]
    }

    public getGround():any{
        return this.gameSet["ground"]
    }

}