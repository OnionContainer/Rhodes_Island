import {basic} from "./People"
import {Grids} from "../SceneScript/Ground"
import GameField from "../SceneScript/MainField"



export default class Enemy extends basic.People{
    constructor(father:Laya.Sprite,upperPath:GameField,data:any,path:number[][]){
        super()
        this.state.init(data,path)
        this.present.init(father, "Basic/There-2.png", 0,0)

        // this.state.speed = 5
        // this.state.setAxisSpeed()
        
        this.update = ()=>{
            // this.state.updatePosition()
            // this.present.setPosition(this.state.position)
            // this.state.isArrived() && this.state.nextAim()
        }
        
        Laya.timer.once(2000,this,console.log,[this])
    }
}





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