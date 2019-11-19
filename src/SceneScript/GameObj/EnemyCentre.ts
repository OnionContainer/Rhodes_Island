import Enemy from "./People_stuff/Enemy";
import { Struc } from "../../Toybox/DataStructure";
import Database from "../../Toybox/Database";


export default class EnemyCentre{
    public static i:EnemyCentre;
    public static init():void{
        this.i = new EnemyCentre();
        this.init = ()=>{};
    }
    private constructor(){
        this._enemyGroup = [];
        
        //Start
        //初始化时间轴
        let timeData:any = Database.i.getTimetable();
        this._timetable = new Struc.PointerList<any>(timeData);
        //初始化时间轴
        //End
    }

    private _enemyGroup:Enemy[];
    private _timetable:Struc.PointerList<any>;
    

    public frameWork(time:number):void{
        /*
        这个函数是EnemyCentre类每帧所做的事情
        time是此次游戏自游戏开始至这个函数运行之时已经经过的帧数
        在预期中，这个数值会从0开始，每帧+1
        */
        if (!this._timetable.exceeding && time == this._timetable.read()["time"]) {
            //空值检查 && 当前时间与时间表上的时间一致
            let data:any = this._timetable.read();
            this.createEnemy(data["type"], data["path"]);
            this._timetable.step();
        }
        
        
        this._enemyGroup.forEach(enemy=>{//每个Enemy挨个做事
            enemy.frameWork();
        });
    }

    public createEnemy(enemyID:string, pathID:string):void{
        let enemy:Enemy = new Enemy(enemyID, pathID);
        this._enemyGroup.push(enemy);
    }

}