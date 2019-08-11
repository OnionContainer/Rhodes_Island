import GameField from "../SceneScript/GameField";
import Database from "./Database";


class SideOperator{
    private _upperPath:SideField
    private _father:Laya.Sprite
    private _data:any
    private _unit:Laya.Sprite

    constructor(upperPath:SideField, father:Laya.Sprite, data:any){
        this._upperPath = upperPath
        this._father = father
        this._data = data
        this._unit = Laya.Sprite.fromImage(data["img"])
        father.addChild(this._unit)
    }

    public size(width:number,height:number):void{
        this._unit.size(width,height)
    }
    
    public pos(x:number,y:number):void{
        this._unit.pos(x,y)
    }

    public get sprite():Laya.Sprite{
        return this._unit
    }

    public get data():any{
        return this._data
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


        console.log(this)
    }
    private initSide(list:string[]):void{
        list.forEach((ele,index)=>{
            let data:any = this._database.getOperator(ele)
            console.log(data)
            let currentSide:SideOperator = new SideOperator(this, this._frame, data)
            currentSide.pos(0,index*100)
            currentSide.size(100,100)
            this._sideOperators.push(currentSide)

        })
        this.initSide = ()=>{}
    }
    
    public get sideSprites():Laya.Sprite[]{
        let result:Laya.Sprite[] = []
        this._sideOperators.forEach(ele=>{
            result.push(ele.sprite)
        })
        return result
    }

    public get sideData():any[]{
        let result:any[] = []
        this._sideOperators.forEach(ele=>{
            result.push(ele.data)
        })
        return result
    }

}