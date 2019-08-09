import {basic} from "./People"
import {Grids} from "./Grids"
import GameField from "../SceneScript/GameField"
import Database from "./Database";
import People from "./Interface/People";
import State from "./Interface/State";
import Present from "./Interface/Present";
import {Struc} from "../DataStructure"
import MyMath from "../myMath";

/**
 * EnemyPresent
 */

class EnemyPresent extends Present{
    constructor(father:Laya.Sprite, data:any){
        super(father, data)
    }
}

/**
 * EnemeState
 * 
 */

class EnemyState extends State{
    private _path:Struc.PointerList<number[]>
    // private _location:number[]
    private _x:number
    private _y:number
    private _speed:number
    private _xSpeed:number = 0
    private _ySpeed:number = 0

    constructor(data:any, path:number[][]){
        super(data)
        this._path = new Struc.PointerList<number[]>(path)
        // this._location = this._path.read()
        this._x = this._path.read()[0]
        this._y = this._path.read()[1]
        this._speed = data["speed"]
    }

    public get x():number{//获取x轴坐标
        return this._x
    }

    public get y():number{//获取y轴坐标
        return this._y
    }

    public get atLastNode():boolean{//检测是否已到达最后一个节点
        return this._path.pointer === this._path.length - 1 &&
        this._x === this._path.last[0] &&
        this._y === this._path.last[1]
    }

    public get isArrived():boolean{//检测是否已到达当前的目标
        return this._path.read()[0] === this._x && 
        this._path.read()[1] === this._y
    }

    public unitMove():void{//移动一次
        this._x = MyMath.moveTo(this._x,this._xSpeed,this._path.read()[0])  //x轴移动
        this._y = MyMath.moveTo(this._y,this._ySpeed,this._path.read()[1])  //y轴移动
    }

    public setAxisSpeed():void{//设置轴速度
        let x_shift:number = this._path.read()[0] - this._x,                    //求x轴总距离
        y_shift:number = this._path.read()[1] - this._y,                        //求y轴总距离
        hypotenuse:number = Math.sqrt(Math.pow(x_shift,2)+Math.pow(y_shift,2)) //求直线总距离
        this._xSpeed = x_shift*this._speed/hypotenuse   //设置x轴速度
        this._ySpeed = y_shift*this._speed/hypotenuse   //设置y轴速度
    }

    public nextAim():void{//指向下一个目标
        this._path.step()
    }
}

/**
 * People
 * 
 * 
 * 
 * 
 * 
 */


export default class Enemy extends People{

    private _upperPath:GameField
    private _data:any
    private size:number

    private _state:EnemyState
    private _present:EnemyPresent

    constructor(upperPath:GameField, father:Laya.Sprite, enemyData:any, path:number[][], database:Database){
        super()
        this._upperPath = upperPath
        this._data = enemyData

        this._present = new EnemyPresent(father, this._data)
        this._present.setSize(database.getGround()["size"])
        // this._present.setPos(0,0)

        this._state = new EnemyState(this._data, path)

        console.log("已新建敌人")
        console.log(this)
        console.log("已新建敌人")
    }

    public update():void{
        this.move()
    }

    private move():void{
        /**
         * 函数说明
         * https://www.lucidchart.com/documents/view/96582305-ec6e-4c41-b178-aa78f91ce0d2/0
         */
        if (this._state.atLastNode){//如果已到达终点
            this.move = ()=>{}//则清空move函数
            return
        }
        if (this._state.isArrived){//如果已到达下一个节点
            this._state.nextAim()//重设节点
            this._state.setAxisSpeed()//计算速度
        }
        this._state.unitMove()//进行一次移动
        this._present.setPos(this._state.x, this._state.y)//改变元素位置
    }
}


// export default class Enemy extends basic.People{
//     constructor(father:Laya.Sprite,upperPath:GameField,data:any,path:number[][]){
//         super()
//         this.state.init(data,path)
//         this.present.init(father, "Basic/There-2.png", 0,0)

//         // this.state.speed = 5
//         // this.state.setAxisSpeed()
        
//         this.update = ()=>{
//             // this.state.updatePosition()
//             // this.present.setPosition(this.state.position)
//             // this.state.isArrived() && this.state.nextAim()
//         }
        
//         Laya.timer.once(2000,this,console.log,[this])
//     }
// }





/*
export default class Enemy extends basic.People{
    public speed:number = 0.4       //速度
    public CentreShift:number = 35  //与Ground.Grids.size的一半保持一致，稍后改为变量
    private hitDoctor:number = 1    //进门之后打刀客他多少血
    // public path:number[][] = [
    //     [0,0],
    //     [100,100],
    //     [0,0]
    // ]
    
    public path:number[][] = []     //路径对象
    public father:Laya.Sprite       //原点坐标对象
    private place:Grids             //地图方格对象
    private upperPath:GameField     //含有此实例的实例

    constructor(father:Laya.Sprite, place:Grids, upperPath:GameField){
        super()
        // alert(1)
        this.upperPath = upperPath
        this.father = father
        this.place = place
        this.state.ele = Laya.Sprite.fromImage("Basic/There.png")
        // alert(2)

        // const start:number[] = this.path.shift()
        this.state.ele.pos(0,0).size(30,30)
        father.addChild(this.state.ele)

        this.SetPath()
        this.move()
    }

    private SetPath(){
        const points:number[][] = [
            [0,0],
            [0,5],
            [5,5],
            [5,3],
            [3,3],
            [3,0],
            [5,0],
            [5,9]
        ]
        points.forEach((ele)=>{
            // console.log(this.upperPath)
            const rec:Laya.Rectangle = this.upperPath.grids.RecMap[ele[0]][ele[1]]
            const current:number[] = [
                rec.x,
                rec.y
            ]
            this.path.push(current)
        })
    }

    private move(){
        const target:number[] = this.path.shift()
        if (target === undefined){
            this.goal()
            return
        }
        const {x,y} = this.state.ele
        const hypotenuse:number = Math.sqrt(Math.pow(x-target[0],2)+Math.pow(y-target[1],2))
        const time:number = Math.floor(hypotenuse/this.speed)
        const tween:Laya.Tween = Laya.Tween.to(this.state.ele, {x:target[0],y:target[1]}, time, null,
            Laya.Handler.create(this,this.move),100)

    }
    

    private goal(){
        this.upperPath.doctor.damaged(this.hitDoctor)
    }
}
*/