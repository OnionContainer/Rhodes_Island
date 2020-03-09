import { Vec2 } from "../../../DodMath";
import { MySymbol, Symbolized } from "../../../../Fix/FixSymbol";
import { ObjectBox } from "./PerformanceCommandCentre";
import { EventCentre } from "../../../../Event/EventCentre";

export default class PerformanceCentre{
    public static instance:PerformanceCentre;
    public MainSpr:CustomizedSprite;

    /**
     * 初始化渲染主场景，初始化事件监听类
     * @param scene 游戏主场景
     */
    public static Initialization(scene:Laya.Sprite):void{
        PerformanceCentre.instance = new PerformanceCentre();//加载静态类
        PerformanceCentre.instance.MainSpr = new CustomizedSprite(new MySymbol());//建立主绘图节点
        //该绘图节点不用于绘制任何图形，仅用于添加子节点
        scene.addChild(PerformanceCentre.instance.MainSpr);//将主绘图节点添加为主场景子节点
        EventCentre.init();//初始化事件监听类
        console.log("Main Scene Initialization Complete!!");

    }

    /**
     * NewRect 绘制全新方形（碰撞模型与方形大小一致）
     * @param posVec2 方形相对于父节点坐标
     * @param sizeVec2 方形宽高
     * @param color 方形颜色
     * @param father 父节点
     * @param symb symbolized对象
     */
    public NewRect(posVec2:Vec2,sizeVec2:Vec2,color:string, father:CustomizedSprite,symb:Symbolized) {
        let tmpSpr:CustomizedSprite = new CustomizedSprite(symb.symbol);//新建绘图节点并设置symb
        father.addChild(tmpSpr);//添加为子绘图节点
        tmpSpr.pos(posVec2.x,posVec2.y).size(sizeVec2.x,sizeVec2.y);//设置相对于父节点的坐标及宽高
        tmpSpr.setColor(color);//设置绘图节点颜色
        tmpSpr.ChangeRecColor(color);//绘制方形
    }

    /**
     * NewCirc 绘制全新圆形（碰撞模型大小为0）
     * @param posVec2 圆心相对于父节点坐标
     * @param R 半径R
     * @param color 圆形颜色
     * @param father 父节点
     * @param symb symbolized对象
     */
    public NewCirc(posVec2:Vec2, R:number, color:string, father:CustomizedSprite, symb:Symbolized){
        let tmpSpr:CustomizedSprite = new CustomizedSprite(symb.symbol);//新建绘图节点
        father.addChild(tmpSpr);//添加为子绘图节点
        tmpSpr.pos(posVec2.x,posVec2.y);//设置相对于父节点圆心坐标
        tmpSpr.setColor(color);//设置绘图节点颜色
        tmpSpr.setR(R);//设置绘图节点半径
        tmpSpr.graphics.drawCircle(0,0,R,color);//绘制圆形
    }

    /**
     * GetSpr 根据symb获取具体customizedspr对象
     * @param symb symbolized对象
     */
    private GetSpr(symb:Symbolized):CustomizedSprite{
        return ObjectBox.get(symb.symbol.data);
    }

    /**
     * RepositionSpr 修改图形（绘图节点）坐标
     * @param symb symbolized对象
     * @param vec 目的地坐标
     */
    public RepositionSpr(symb:Symbolized,vec:Vec2):void{
        PerformanceCentre.instance.GetSpr(symb).ChangePosition(vec);
    }

    /**
     * RepaintSpr 修改方形绘图节点颜色
     * @param symb symbolized对象
     * @param color 目标颜色
     */
    public RepaintRecSpr(symb:Symbolized,color:string):void{
        PerformanceCentre.instance.GetSpr(symb).ChangeRecColor(color);
    }

    /**
     * RepaintCircSpr 修改圆形眼色
     * @param symb symbolized对象
     * @param color 目标颜色
     */
    public RepaintCircSpr(symb:Symbolized,color:string):void{
        PerformanceCentre.instance.GetSpr(symb).ChangeCircColor(color);
    }

    /**
     * ResizeSpr 修改方形绘图节点大小
     * @param symb symbolized对象
     * @param vec 目标宽高
     */
    public ResizeSpr(symb:Symbolized, vec:Vec2):void{
        PerformanceCentre.instance.GetSpr(symb).ChangeSize(vec);//修改绘图节点相对于父节点坐标
    }

    public NewChessBoard(posVec:Vec2,unitSizeVec:Vec2,Arr:number[][],backGroundColor:string,unitColor:string,father:CustomizedSprite,symb:Symbolized):void{
        let totalSizeVec2:Vec2 = new Vec2(unitSizeVec.x*Arr[0].length,unitSizeVec.y*Arr.length);
        PerformanceCentre.instance.NewRect(posVec,totalSizeVec2,backGroundColor,father,symb);
        let tmpSpr:CustomizedSprite = PerformanceCentre.instance.GetSpr(symb);
        for(let i = 0; i < Arr.length; i ++){
            for (let j = 0; j < Arr[0].length; j++){
                tmpSpr.graphics.drawRect(1+j*unitSizeVec.x,1+i*unitSizeVec.y,unitSizeVec.x-1,unitSizeVec.y-1,unitColor);
            }
        }
        

    }

}

//自定义绘图节点
export class CustomizedSprite extends Laya.Sprite{
    private _position:Vec2;//相对于父节点坐标
    private _size:Vec2;//方形宽高
    private _color:string;//图形颜色
    private _Symb:MySymbol;//symbol
    private _R:number;//圆形半径


    constructor(symb:MySymbol){
        super();
        this.setSymbNum(symb);
        ObjectBox.add(this);
        this._position = new Vec2(this.x,this.y);
        this._size = new Vec2(this.width,this.height);
    }

    public getSymbNum():number{
        return this._Symb.data;
    }

    private setSymbNum(symb:MySymbol):void{
        this._Symb = symb;
    }

    /**
     * ChangeRecColor 修改方形颜色
     */
    public ChangeRecColor(color:string):void {
        this.graphics.clear();
        this._color = color;
        this.graphics.drawRect(0,0,this.width,this.height,this._color);
    }

    /**
     * changeCircColor 修改圆形颜色
     * @param color 
     */
    public ChangeCircColor(color:string):void {
        this.graphics.clear();
        this._color = color;
        this.graphics.drawCircle(0,0,this._R,this._color);
    }
    /**
     * ChangeSize 修改方形大小
     */
    public ChangeSize(vec:Vec2):void {
        this._size = vec;
        this.width = this._size.x;
        this.height = this._size.y;
        
        this.ChangeRecColor(this._color);
        
    }
    /**
     * ChangeVec
     * @param Vec 新坐标（相对于父节点）
     */
    public ChangePosition(Vec:Vec2):void {
        this._position = Vec;
        this.pos(this._position.x,this._position.y);
    }

    /**
     * 获取坐标
     */
    public getVec():Vec2{
        return this._position;
    }


    
    public setColor(color:string):void{
        this._color = color;
    }

    public setR(R:number):void{
        this._R = R;
    }


}