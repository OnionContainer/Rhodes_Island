import {ui} from "../ui/layaMaxUI"
import Enemy from "../GameObj/Enemy"
import {Grids} from "../GameObj/Grids"
import Doctor from "../GameObj/Doctor"
import Operator from "../GameObj/Operator"
import {Struc} from "../DataStructure"
import Database from "../GameObj/Database"
const {log} = console;



export default class GameField extends ui.GameFieldSceneUI{
    
    public database:Database
    public grids:Grids
    private enemies:Enemy[]
    private operators:Operator[]
    private doctor:Doctor 

    constructor(){
        super()
        this.database = new Database()
        this.grids = new Grids(this,this.UISet,this.database)
    }






}
// export default class GameField extends ui.GameFieldSceneUI{
//     /**
//      * sb
//      */
//     public grids:Grids
//     public doctor:Doctor
//     public operators:Array<Operator> = []
//     public enemies:Array<Enemy> = []
//     private onKeydown:Function

//     public GameSet:JSON
//     public EnemyDatabase:JSON
//     public TimeTable:Struc.PointerList<timeNode>

//     private time:number



//     // public frameLoop:Laya.timer
//     constructor(){
//         super()
        
//         this
//         Laya.loader.load([gameSet_json, enemyDatabase], Laya.Handler.create(this, this.onLoaded),null,Laya.Loader.JSON)
//         //加载敌人数据库
//         //加载地图  
        
//     }

//     private onLoaded(){//加载完成后执行此函数

//         this.GameSet = Laya.loader.getRes(gameSet_json)//获取已加载的地图
//         this.EnemyDatabase = Laya.loader.getRes(enemyDatabase)//获取已加载的敌人数据
//         this.initTimeTable()//从地图数据中加载时间表
//         this.time = 0//将时间设为0;时间单位为帧
//         this.grids = new Grids(this.UISet,this,this.GameSet)//依据已加载的地图数据，设置地图
//         this.doctor = new Doctor()//初始化刀客他对象
//         this.keyBoardEventSetup()//初始化键盘事件
//         /**测试代码 */
//         // this.enemies.push(new Enemy(this.UISet, this, "bug0", []))
//         /**测试代码End */

//         Laya.timer.loop(20,this,this.frameLoop)//开启游戏帧循环
//     }

//     private initTimeTable(){
//         this.TimeTable = new Struc.PointerList<timeNode>()
//         const rawTable:Array<any> = this.GameSet["timetable"]
//         rawTable.forEach((ele)=>{
//             this.TimeTable.push({
//                 time:ele.time,
//                 type:this.EnemyDatabase[ele.type],
//                 path:this.GameSet["paths"][ele.path]
//             })
//         })
//         log(this.TimeTable)
//     }

//     private keyBoardEventSetup(){
//         this.onKeydown = (e:Laya.Event) => {
//             /**测试代码 */
//             if (e.keyCode === Laya.Keyboard.E) {
//                 console.log(this.enemies)
//             }
//             if (e.keyCode === Laya.Keyboard.F) {
//                 console.log(this.enemies[0])
//             }
//             /**测试代码End */
//         }
//         Laya.stage.on(Laya.Event.KEY_DOWN,this,this.onKeydown)
//     }


//     public frameLoop(){//每帧都会执行的代码块
//         if (this.TimeTable.read() && this.time === this.TimeTable.read().time) {
//             this.enemies.push(new Enemy(this.UISet,this,
//                 this.TimeTable.read().type,
//                 this.TimeTable.read().path))
//             this.TimeTable.step()
//         }


//         this.operators.forEach((ele)=>{//执行所有干员对象的update方法
//             ele.update()
            
//         })
//         this.enemies.forEach((ele)=>{//执行所有敌人对象的update方法
//             ele.update()
//         })
//         this.time ++
//     }



//     addOperator(place:number[]){//在地图上添加干员
//         //此方法被作为回调函数提供给this.grids对象，在点击地图空格时执行

//         this.operators.push(new Operator(this,place))
        
//     }

// }