import {Struc} from "./DataStructure"


const gameSet_URL:string = "./Database/GameSet.json",
enemyDatabase_URL:string = "./Database/EnemyDatabase.json",
operatorDatabase_URL:string = "./Database/OperatorDatabase.json"




type EnemyEvent = {
    time:number,
    typeData:any,
    path:number[][]
}

export default class Database{

    //初始化 Start
    public static inst:Database
    //直接public static inst:Database = new Database(),是否可以在类装载时就创建所需的单例?
    public static init(){
        this.inst = new Database()
        this.init = ()=>{}
    }
    private constructor(){
        Laya.loader.load([enemyDatabase_URL,operatorDatabase_URL,gameSet_URL], Laya.Handler.create(this, ()=>{
            this._enemyData = Laya.loader.getRes(enemyDatabase_URL)
            this._operatorData = Laya.loader.getRes(operatorDatabase_URL)
            this._gameSet = Laya.loader.getRes(gameSet_URL)
        }))
        console.log(this);
    }
    //初始化 End

    private _enemyData:JSON;    //敌人数据json文件
    private _operatorData:JSON; //干员数据json文件
    private _gameSet:JSON;      //游戏设定json文件
    

    public getPath(pathName:string):number[][]{
        return this._gameSet["paths"][pathName];
    }

    public getEnemy(enemyName:string):any{
        return this._enemyData[enemyName];
    }

    public getOprt(operatorName:string):any{
        return this._operatorData[operatorName];
    }

    public getGround():any{
        return this._gameSet["ground"];
    }

    public getTimetable():any{
        return this._gameSet["timetable"];
    }

    public get UnitSize():number{
        return this.getGround().size;
    }
}