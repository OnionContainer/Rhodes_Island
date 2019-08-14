import GameField from "../SceneScript/GameField";
import Database from "./Database";
import EventCentre from "../EventCentre";



class SideOperator{
    private _upperPath:SideField
    private _father:Laya.Sprite     //右侧选单原点
    private _data:any
    private _unit:Laya.Sprite
    private _database:Database
    private _UISet:Laya.Sprite

    constructor(upperPath:SideField, father:Laya.Sprite, data:any, database:Database){
        this._upperPath = upperPath
        this._father = father
        this._data = data
        this._database = database
        this._unit = Laya.Sprite.fromImage(data["img"])
        this._UISet = this._father.parent as Laya.Sprite
        father.addChild(this._unit)
        this.init_Drag()
    }

    private init_Drag():void{
        this._unit.on(Laya.Event.MOUSE_DOWN, this, this.onDrag)
    }

    private onDrag():void{
        ////////////////////////////////////
        let spr:Laya.Sprite = Laya.Sprite.fromImage(this._data["img"]),
        size:number = this._database.getGround()["size"]
        spr.size(size,size)
        

        let draging:Function = () => {
            let x = this._UISet.mouseX - this._UISet.mouseX % size,
            y = this._UISet.mouseY - this._UISet.mouseY % size

            if (x<0||
                y<0||
                x>(this._database.getGround()["width"]-1)*size||
                y>(this._database.getGround()["height"]-1)*size){
                return
            }
            spr.pos(
                x,
                y
            )
        }

        Laya.timer.loop(10, this, draging)
        this._UISet.addChild(spr)

        this._unit.stage.once(Laya.Event.MOUSE_UP, this, ()=>{
            Laya.timer.clear(this, draging)
            EventCentre.event("Global", "Spawn")
            spr.parent.removeChild(spr)
            console.log(this._UISet)
        })
    }

    public size(width:number,height:number):void{
        this._unit.size(width,height)
    }
    
    public pos(x:number,y:number):void{
        this._unit.pos(x,y)
    }


}

export default class SideField{
    /**
     * 右侧干员栏的UI管理类
     */

    
    private _upperPath:GameField
    private _father:Laya.Sprite
    // private _operatorList:string[]
    private _sideOperators:SideOperator[]= []
    private _database:Database
    private _frame:Laya.Sprite

    constructor(upperPath:GameField, father:Laya.Sprite, list:string[], database:Database){
        this._upperPath = upperPath
        this._father = father
        // this._operatorList = list
        this._database = database
        this._frame = Laya.Sprite.fromImage("Basic/Rec.png")
        let ground:any = database.getGround()
        this._frame.size(
            100,
            ground["size"]*ground["height"]
        ).pos(
            ground["size"]*ground["width"],
            0
        )
        this._father.addChild(this._frame)
        this.initSide(list)

        console.log("SideField对象创建完成")
        console.log(this)
        console.log("=== === ===")
    }
    private initSide(list:string[]):void{
        list.forEach((ele,index)=>{
            let data:any = this._database.getOperator(ele)
            let currentSide:SideOperator = new SideOperator(this, this._frame, data, this._database)
            currentSide.pos(0,index*100)
            currentSide.size(100,100)
            this._sideOperators.push(currentSide)

        })
        this.initSide = ()=>{}
    }
    

}