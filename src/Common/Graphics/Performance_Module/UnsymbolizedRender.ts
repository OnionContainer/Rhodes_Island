//author Na2CuC4O8
import CustomizedSprite from "./customizedSpr";
import { Vec2 } from "../../DodMath";
import { EventCentre } from "../../../Event/EventCentre";
import { Symbolized } from "../../../Fix/FixSymbol";
import { KVPair } from "../../DodDataStructure";


export class ChessBoard extends CustomizedSprite{
    private _initPos:Vec2;
    private _initSize:Vec2;
    private _numArr:number[][];//2d arr which represents the chess board
    private _posVec2:Vec2;//initial location(x,y)
    private _unitSizeVec2:Vec2;//unit size(width, height)
    private _frontSprArr:CustomizedSprite[][];//front spr
    private _scale:number;//scale for zooming
    private _backGroundColor:string;//background color
    private _frontColor:string;//front color 
    private _initboardsize:Vec2;

    /**
     * 棋盘构造器
     * @param arr 二维数组
     * @param posVec2 起始坐标
     * @param unitsize 单位宽高
     * @param backGroundColor 背景颜色
     * @param frontColor 格子颜色
     * @param father 父绘图节点
     * @param scale 缩放比
     */
    constructor(arr:number[][], posVec2:Vec2, unitsize:Vec2, backGroundColor:string, frontColor:string, scale:number){
        super();
        this._numArr = arr;
        this._initPos = posVec2;
        this._initSize = unitsize;
        this._scale = scale;
        this._posVec2 = new Vec2(this._initPos.x*this._scale, this._initPos.y*this._scale);
        
        this._unitSizeVec2 = new Vec2(this._initSize.x * this._scale,this._initSize.y * this._scale);//recalculate unitSize
        this._backGroundColor = backGroundColor;
        this._frontColor = frontColor;
        this.initBackground();
        this.setColor(this._backGroundColor);
        this.changeColor();
        this.initFrontSprArr();
        this.renderFrontSpr(this._frontColor);
        EventCentre.instance.on(EventCentre.EType.PERFORMANCE_RESCALE(),this,this.reScale);

    }

    /**
     * draw background
     */
    private initBackground():void{
        this.setParam(this._posVec2.x,this._posVec2.y,this._numArr[0].length*this._unitSizeVec2.x,this._numArr.length*this._unitSizeVec2.y,this._backGroundColor);
        this.locationAndSize();
        
    }

    /**
     * draw front
     */
    private initFrontSprArr():void{
        this._frontSprArr = [];//init custSprArr
        for(let i = 0; i < this._numArr.length; i ++){
            let tmpArr:CustomizedSprite[] = [];
            for( let j = 0; j < this._numArr[0].length; j ++){
                let tmpSpr:CustomizedSprite = new CustomizedSprite();
                this.addChild(tmpSpr);
                tmpSpr.setParam(0+j*this._unitSizeVec2.x,0+i*this._unitSizeVec2.y,this._unitSizeVec2.x,this._unitSizeVec2.y,this._frontColor,new Vec2(1,1));
                tmpSpr.locationAndSize();
                tmpSpr.setColor(this._frontColor);
                tmpSpr.changeColor();
                tmpSpr.zOrder = -1;
                tmpArr.push(tmpSpr);
            }
            this._frontSprArr.push(tmpArr);
        }
    }

    /**
     * 
     * @param color 
     */
    private renderFrontSpr(color:string){
        for(let i = 0; i < this._frontSprArr.length; i ++){
            for( let j = 0; j < this._frontSprArr[0].length; j ++){
                this._frontSprArr[i][j].setColor(color);
                this._frontSprArr[i][j].changeColor();
            }
        }
    }

    /**
     * 修改前方格子颜色
     * @param posVec2 待修改格子坐标（x,y）
     * @param color 目标颜色
     */
    public changeFrontColor(posVec2:Vec2,color:string):void{
        this._frontSprArr[posVec2.y][posVec2.x].setColor(color);
        this._frontSprArr[posVec2.y][posVec2.x].changeColor();
    }

    /**
     * 清除所有已绘图形
     */
    private clearAll():void{
        this.graphics.clear();
        for(let i = 0; i < this._frontSprArr.length; i ++){
            for( let j = 0; j < this._frontSprArr[0].length; j ++){
                this._frontSprArr[i][j].graphics.clear();
            }
        }
        
    }

    /**
     * 重设棋盘缩放比
     * @param num 缩放比
     */
    public reScale(num:number):void{
        this._scale = num;
        this._posVec2 = new Vec2(this._initPos.x*this._scale,this._initPos.y*this._scale);
        this._unitSizeVec2 = new Vec2(this._initSize.x * this._scale,this._initSize.y * this._scale);//recalculate unitSize
        this.clearAll();
        this.initBackground();
        this.initFrontSprArr();
        this.setColor(this._backGroundColor);
        this.changeColor();
        this.renderFrontSpr(this._frontColor);
    }
    public returnMouseVec():Vec2{
        return new Vec2(this.mouseX,this.mouseY);
    }

    public getUnitSize():Vec2{
        return this._initSize;
    }

    public getboardsize():Vec2{
        return this._initboardsize;
    }

}

export class sideUI{

    private _pos:Vec2;
    private _unitSize:Vec2;
    private _rescale:number;
    private _currPos:Vec2;
    private _currUnitSize:Vec2;
    private _bound:any[] = [];
    private _spr:CustomizedSprite;
    private _posPair:KVPair<Vec2> = new KVPair<Vec2>();
    

    constructor(pos:Vec2, unitSize:Vec2,rescale:number){
        this._pos = pos;
        this._unitSize = unitSize;
        this._rescale = rescale;
        this._currPos = new Vec2(pos.x*rescale,pos.y*rescale);
        this._currUnitSize = new Vec2(unitSize.x*rescale,unitSize.y*rescale);
        EventCentre.instance.on(EventCentre.EType.PERFORMANCE_RESCALE(),this,(rescale:number)=>{
            this._rescale = rescale;
            this._currPos = new Vec2(this._pos.x*this._rescale,this._pos.y*this._rescale);
            this._currUnitSize = new Vec2(this._unitSize.x*this._rescale,this._unitSize.y*this._rescale);
        });
        this._spr = new CustomizedSprite();
        this._spr.pos(this._currPos.x, this._currPos.y);
        
    }

    public pushActor(bound:Symbolized,name:string):CustomizedSprite{

        let tmpSpr:CustomizedSprite = new CustomizedSprite();
        let info:any[] = [bound.symbol.data];
        this._bound.push(info);
        let initpos:Vec2 = new Vec2(0,this._currUnitSize.y*(this._bound.length-1));
        this._posPair.edit(bound.symbol.data+"",initpos);
        tmpSpr.pos(initpos.x,initpos.y).size(this._currUnitSize.x,this._currUnitSize.y);
        this._spr.addChild(tmpSpr);
        tmpSpr.loadImage(`res/png/${name}.png`);
        this._spr.size(this._currUnitSize.x,this._currUnitSize.y*this._bound.length);
        return tmpSpr;
        
    }


    public getSpr():CustomizedSprite{
        return this._spr;
    }

    public getPos():Vec2{
        return this._pos;
    }

    public getSize():Vec2{
        return this._unitSize;
    }

    public getscale():number{
        return this._rescale;
    }

    public readPairForPos(bound:Symbolized):Vec2{
        return this._posPair.read(bound.symbol.data+"");
    }

}
