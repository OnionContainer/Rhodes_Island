import { Vec2 } from "../../DodMath";

//author Na2CuC4O8

export default class CustomizedSprite extends Laya.Sprite{
    private _color:string;//可视节点颜色
    private _graphicShift:Vec2;//重叠绘图偏移量
    private _centralShift;//中心绘图偏移量

    constructor(){
        super();
    }

    public centralShiftColored():void{
        this.graphics.clear();
        this.graphics.drawRect(-this.width/2,-this.height/2,this.width,this.height,this._color);
    }

    /**
     * 
     * @param color 
     */
    public setColor(color:string):void{
        this._color = color;
    }

    /**
     * 修改颜色
     * @param color 目标颜色
     */
    public changeColor():void{
        this.graphics.clear();
        this.graphics.drawRect(this._graphicShift.x,this._graphicShift.y,this.width-2*this._graphicShift.x,this.height-2*this._graphicShift.y,this._color);
    }

    /**
     * 设置相关参数
     * @param posX 起始x
     * @param posY 起始y
     * @param width 宽度
     * @param height 高度
     * @param color 颜色
     * @param graphicShift 棋盘偏移值
     */
    public setParam(posX:number, posY:number, width:number, height:number, color:string = this._color, graphicShift:Vec2 = new Vec2(0,0)):void{
        
        this.x = posX;
        this.y = posY;
        this.width = width;
        this.height = height;
        this.setColor(color);
        this._graphicShift = graphicShift;
    }

    /**
     * 修改坐标和大小
     */
    public locationAndSize():void{
        this.pos(this.x,this.y).size(this.width,this.height);
    }

    /**
     * 重设坐标
     * @param posVec2 目标坐标
     */
    public relocate(posVec2:Vec2):void{
        this.x = posVec2.x;
        this.y = posVec2.y;
        this.locationAndSize();
    }

    /**
     * 重设宽高
     * @param sizeVec2 目标宽高
     */
    public reSize(sizeVec2:Vec2):void{
        this.width = sizeVec2.x;
        this.height = sizeVec2.y;
        this.changeColor();
    }

    /**
     * 返回当前图形起始坐标
     */
    public getPos():Vec2{
        return new Vec2(this.x,this.y);
    }

    /**
     * 返回已绘区域大小
     */
    public getSize():Vec2{
        return new Vec2(this.width,this.height);
    }

    /** 
     * 返回当前已绘区域颜色
     */
    public getColor():string{
        return this._color;
    }
}