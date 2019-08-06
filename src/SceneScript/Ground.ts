import GameField from "./MainField";

export class Grids{
    public Map:Array<Array<Laya.Sprite>> = []
    public RecMap:Array<Array<Laya.Rectangle>> = []
    private static size:number = 90
    private father:Laya.Sprite
    private upperPath:GameField
    private data:JSON
    constructor(father:Laya.Sprite, upperPath:GameField, data:JSON){
        this.father = father
        this.upperPath = upperPath
        this.data = data
        let cols = data["ground"]["width"],
        raws = data["ground"]["height"]
        
        for (let n = 0; n < raws; n += 1) {
            this.Map[n] = []
            this.RecMap[n] = []
            for (let m = 0; m < cols; m += 1) {
                this.initElement(n,m)
            }
        }
        console.log(this.RecMap)
    }


    initElement(raw:number,count:number){
        const current:Laya.Sprite = Laya.Sprite.fromImage("Basic/Rec.png");//载入图片
        current.pos(Grids.size*count, Grids.size*raw)
            .size(Grids.size,Grids.size)//依据static size属性改变大小、依据编号改变位置
        current.name = `grid${raw}-${count}`//重命名为 grid行数-列数
        
        this.Map[raw][count] = current
        this.RecMap[raw][count] = new Laya.Rectangle(current.x,current.y,Grids.size,Grids.size)
        current.on(Laya.Event.CLICK, this.upperPath, this.upperPath.addOperator, [this.getPlace(count,raw)])//设定鼠标点击事件
        //向GameField中添加Operator实例
        this.father.addChild(current)
    }

    getPlace(count:number,raw:number):number[]{
        //raw:第几行
        //count:第几个
        return [
            this.RecMap[raw][count].x,
            this.RecMap[raw][count].y
        ]
    }
}




