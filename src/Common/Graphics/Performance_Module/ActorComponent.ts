//author Na2CuC4O8


import CustomizedSprite from "./customizedSpr";
import { Vec2 } from "../../DodMath";
import { EventCentre } from "../../../Event/EventCentre";
import { MySymbol } from "../../../Fix/FixSymbol";

export class Bar{

    private _initPos:Vec2;//起始坐标
    private _initSize:Vec2;//起始大小
    private _pos:Vec2;//缩放后坐标
    private _size:Vec2;//缩放后大小
    private _scale:number = 1;//全局缩放比
    private _symbNum:number;//进度条编号
    private _backSpr:CustomizedSprite;//进度条底层绘图节点
    private _frontSpr:CustomizedSprite;//进度条顶层绘图节点
    private _percentage:number = 1;//进度
    private _height:number;//进度条高度


    /**
     * 进度条构造器
     * @param symbNum 进度条编号
     * @param backGroundColor 背景颜色
     * @param size 大小
     * @param pos 坐标
     * @param scale 全局缩放比
     */
    constructor(symbNum:number, backGroundColor:string,size:Vec2 ,pos:Vec2, scale:number = 1){
        this._symbNum = symbNum;
        this._initSize = size;
        this._scale = scale;
        this._size = new Vec2(this._initSize.x*this._percentage*this._scale,this._initSize.y*this._scale);
        this._initPos = pos;
        this._pos = new Vec2(this._initPos.x*this._scale,this._initPos.y*this._scale);
        this._backSpr = new CustomizedSprite();
        this._backSpr.setParam(this._pos.x,this._pos.y,this._size.x,this._size.y,backGroundColor);
        this._backSpr.changeColor();
        this._frontSpr = new CustomizedSprite();
        this._backSpr.addChild(this._frontSpr);
        this._frontSpr.setParam(0,0,this._size.x,this._size.y,"#8b8b83",new Vec2(this._scale,this._scale));
        this._frontSpr.changeColor();
        this._height = this._initSize.y;
        EventCentre.instance.on(EventCentre.EType.PERFORMANCE_RESCALE(),this,this.reScale);

    }

    /**
     * 修改缩放比
     * @param value 全局缩放比
     */
    private reScale(value:number):void{
        this._scale = value;
        this._pos = new Vec2(this._initPos.x*this._scale, this._initPos.y*this._scale);
        this._size = new Vec2(this._initSize.x*this._scale, this._initSize.y*this._scale);
        this._backSpr.setParam(this._pos.x,this._pos.y,this._size.x,this._size.y);//设置背景绘图节点参数
        this._backSpr.changeColor();
        this._frontSpr.setParam(0,0,this._size.x*this._percentage,this._size.y,"#8b8b83",new Vec2(1*this._scale,1*this._scale));//设置前端绘图节点参数
        this._frontSpr.changeColor();
    }

    /**
     * 设置进度条代号
     * @param symbNum 进度条代号
     */
    public setSymb(symbNum:number):void{
        this._symbNum = symbNum;
        
    }

    /**
     * 修改进度
     * @param percentage 目标进度
     */
    public set percentage(percentage:number){
        if(percentage === 0){
            this._percentage = 0;
            this._frontSpr.graphics.clear();
        }else{
            this._percentage = percentage;
            this._frontSpr.setParam(0,0,this._size.x*this._percentage,this._size.y,"#8b8b83",new Vec2(1*this._scale,1*this._scale));
            this._frontSpr.changeColor();
        }
    }

    /**
     * 返回本进度条背景绘图节点
     */
    public getBackSpr():CustomizedSprite{
        return this._backSpr;
    }

    /**
     * 返回本进度条高度
     */
    public getHeight():number{
        return this._height;
    }



}

export class Button{

    private _initPos:Vec2;//按钮初始坐标
    private _initSize:Vec2;//按钮初始宽高
    private _pos:Vec2;//显示节点坐标
    private _size:Vec2;//显示节点宽高
    private _symbName:number;//按钮编号
    private _color:string;//按钮颜色
    private _height:number;//按钮高度（默认缩放比为1）
    private _spr:CustomizedSprite;//按钮显示节点
    private _scale:number;//全局缩放比
    private _name:string;//按钮名（显示在按钮上）
    private _fun:Function;//按钮所携带的功能函数
    private _ARUsymb:MySymbol;//按钮所在ActorRU

    /**
     * 按钮构造器
     * @param name 按钮名
     * @param symbNum 按钮编号
     * @param pos 起始坐标
     * @param size 起始宽高
     * @param color 按钮颜色
     * @param scale 缩放比
     */
    constructor(ARUsymb:MySymbol, name:string = "default", symbNum:number, pos:Vec2, size:Vec2,  color:string = "#00B2BF", scale:number = 1){
        this._ARUsymb = ARUsymb;
        this._symbName = symbNum;
        this._name = name;
        this._initPos = pos;
        this._initSize = size;
        this._color = color;
        this._scale = scale;
        this._pos = new Vec2(this._initPos.x*this._scale,this._initPos.y*this._scale);
        this._size = new Vec2(this._initSize.x*this._scale,this._initSize.y*this._scale);
        this._height = this._initSize.y;
        this._spr = new CustomizedSprite();
        this._spr.setParam(this._pos.x,this._pos.y,this._size.x,this._size.y,this._color);
        this._spr.changeColor();
        EventCentre.instance.on(EventCentre.EType.PERFORMANCE_RESCALE(),this,this.reScale);
        this.setText();

    }

    /**
     * 设置按钮功能
     * @param fun 按钮功能函数
     */
    public setFunc(fun:Function):void{
        this._fun = fun;
        this._spr.on(Laya.Event.MOUSE_UP,this,this._fun);
        this._spr.on(Laya.Event.MOUSE_OVER,this,(e: Laya.Event)=>{
            e.stopPropagation();
          });
        this._spr.on(Laya.Event.MOUSE_UP,this,(e: Laya.Event)=>{
            e.stopPropagation();
        });
    }

    /**
     * 返回按钮绘图节点
     */
    public getSpr():CustomizedSprite{
        return this._spr;
    }



    /**
     * 缩放按钮
     * @param value 全局缩放比
     */
    public reScale(value:number):void{
        this._scale = value;
        this._pos = new Vec2(this._initPos.x*this._scale,this._initPos.y*this._scale);
        this._size = new Vec2(this._initSize.x*this._scale,this._initSize.y*this._scale);
        this._spr.setParam(this._pos.x,this._pos.y,this._size.x,this._size.y,this._color);
        this._spr.changeColor();
    }

    /**
     * 渲染文本
     */
    public setText():void{
        let tmpTex:Laya.Text = new Laya.Text();
        tmpTex.width = this._size.x;
        tmpTex.height = this._size.y;
        tmpTex.x = 0;
        tmpTex.y = 0;
        tmpTex.fontSize = 9;
        tmpTex.text = this._name;
        tmpTex.align = "center";
        tmpTex.valign = "middle";
        this._spr.addChild(tmpTex);
    }


}


export class Text extends Laya.Text{
    private _switch:boolean = true;//文本显示开关 默认关闭
    private _scale:number;//全局缩放比
    private _size:Vec2;//起始大小
    private _pos:Vec2 = new Vec2(0,0);//起始坐标
    private _myString:string;//文本内容
    private _ARUsymb:MySymbol;//所在可视节点

    /**
     * 文本构造器
     * @param size 起始大小
     * @param scale 缩放比
     * 
     */
    constructor(size:Vec2, scale:number){
        super();
        this._size = size;
        this._scale = scale;
        this.width = this._size.x*this._scale;//计算可视节点宽度
        this.height = this._size.y*this._scale;//计算可视节点高度
        this.fontSize = 10*this._scale;//计算字体大小
        this.align = "center";//默认竖直居中
        this.valign = "middle";//默认水平居中
        this.wordWrap = true;//默认自动换行开启
        this.color = "#000000";//
        EventCentre.instance.on(EventCentre.EType.PERFORMANCE_RESCALE(),this,this.reScale);//监听全局缩放比
        EventCentre.instance.on(EventCentre.EType.PERFORMANCE_TEXT_SWITCH(),this,this.switch);//监听全局文本显示开关

    }

    /**
     * 设置所在显示节点symb
     * @param symb 
     */
    public setSymb(symb:MySymbol):void{
        this._ARUsymb = symb;
    }

    /**
     * 开关文本显示开关
     */
    public switch():void{
        
        if(this._switch === true){
            
            this._switch = false;
            this.changeText("");
            
        }else{
            this._switch = true;
        }
    }

    /**
     * 修改文本显示开关
     */
    public setSwitchOn():void{
        if(this._switch === true){
            this.changeText(this._myString);
            
        }
    }

    /**
     * 关闭文本显示
     */
    public setSwitchOff():void{
        if(this._switch){
            this.changeText(" ");

        }
    }


    /**
     * 根据缩放比修改可视节点大小
     * @param scale 全局缩放比
     */
    private reScale(scale:number):void{
        this._scale = scale;
        this.width = this._size.x*this._scale;
        this.height = this._size.y*this._scale;
        this.x = this._pos.x*this._scale;
        this.y = this._pos.y*this._scale;
        this.fontSize = 10*this._scale;
    }

    /**
     * 设置文本
     * @param text 
     */
    public setText(text:string):void{
        this._myString = text;
    }

    /**
     * 修改文本起始坐标（不受全局缩放比影响）
     * @param pos 起始坐标
     */
    public setPos(pos:Vec2 = new Vec2(0,0)):void{
        this._pos = pos;
        this.x = this._pos.x*this._scale;
        this.y = this._pos.y*this._scale;
    }

    /**
     * 阻止鼠标事件穿透
     */
    public offSwitch():void{
        EventCentre.instance.off(EventCentre.EType.PERFORMANCE_RESCALE(),this,this.reScale);
        EventCentre.instance.off(EventCentre.EType.PERFORMANCE_TEXT_SWITCH(),this,this.switch);
    }

    /**
     * 修改字体大小
     * @param value 输入大小
     */
    public setFontSize(value:number):void{
        this.fontSize = value;
        this.text = this._myString;
    }

}

