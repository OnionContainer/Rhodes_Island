import GameField from "../SceneScript/GameField";
import Database from "./Database"



export class Grids{
    private upperPath:GameField
    private father:Laya.Sprite
    private database:Database


    
    private spriteGroup:Laya.Sprite[][] = []
    private rectGroup:Laya.Rectangle[][] = []

    constructor(upperPath:GameField, father:Laya.Sprite, database:Database){
        this.upperPath = upperPath
        this.father = father
        this.database = database

        //创建游戏场地: Start
        
        const ground:any = database.getGround(),
        width:number = ground["width"],
        height:number = ground["height"],
        size:number = ground["size"],
        matrix:number = ground["matrix"]

        for(let x = 0; x < width; x += 1) {
            this.spriteGroup[x] = []
            this.rectGroup[x] = []
            for (let y = 0; y < height; y += 1) {
                //创建sprite: Start
                const sprite:Laya.Sprite = Laya.Sprite.fromImage("Basic/Rec.png")
                sprite.pos(x*size,y*size).size(size,size)
                father.addChild(sprite)
                this.spriteGroup[x][y] = sprite
                //创建Sprite: End

                //创建Rectangle: Start
                const rect:Laya.Rectangle = new Laya.Rectangle(x*size,y*size,size,size)
                this.rectGroup[x][y] = rect
                //创建Rectangle: End
            }
        }
        //创建游戏场地: End
        console.log("Grids对象创建完成")
        console.log(this)
        console.log("Grids对象创建完成")
    }
}

// export class Grids{
//     public Map:Array<Array<Laya.Sprite>> = []
//     public RecMap:Array<Array<Laya.Rectangle>> = []
//     private static size:number = 90
//     private father:Laya.Sprite
//     private upperPath:GameField
//     private data:JSON
//     //old
//     //new
//     private database:Database

//     constructor(father:Laya.Sprite, upperPath:GameField, database:Database){
//         this.database = database
//         // this.father = father
//         // this.upperPath = upperPath
//         // this.data = data
//         // let cols = data["ground"]["width"],
//         // raws = data["ground"]["height"]
        
//         // for (let n = 0; n < raws; n += 1) {
//         //     this.Map[n] = []
//         //     this.RecMap[n] = []
//         //     for (let m = 0; m < cols; m += 1) {
//         //         this.initElement(n,m)
//         //     }
//         // }
//         // console.log(this.RecMap)
//     }


//     initElement(raw:number,count:number){
//         const current:Laya.Sprite = Laya.Sprite.fromImage("Basic/Rec.png");//载入图片
//         current.pos(Grids.size*count, Grids.size*raw)
//             .size(Grids.size,Grids.size)//依据static size属性改变大小、依据编号改变位置
//         current.name = `grid${raw}-${count}`//重命名为 grid行数-列数
        
//         this.Map[raw][count] = current
//         this.RecMap[raw][count] = new Laya.Rectangle(current.x,current.y,Grids.size,Grids.size)
//         // current.on(Laya.Event.CLICK, this.upperPath, this.upperPath.addOperator, [this.getPlace(count,raw)])//设定鼠标点击事件
//         //向GameField中添加Operator实例
//         this.father.addChild(current)
//     }

//     getPlace(count:number,raw:number):number[]{
//         //raw:第几行
//         //count:第几个
//         return [
//             this.RecMap[raw][count].x,
//             this.RecMap[raw][count].y
//         ]
//     }
// }




