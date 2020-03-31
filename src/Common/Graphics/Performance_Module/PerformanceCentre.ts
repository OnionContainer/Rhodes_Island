//author Na2CuC4O8

import CustomizedSprite from "./customizedSpr";
import { ChessBoard, sideUI } from "./UnsymbolizedRender";
import ActorRU from "./SymbolizedRender";
import { ActorBox } from "./objbox";
import { Vec2 } from "../../DodMath";
import { Symbolized } from "../../../Fix/FixSymbol";
import { EventCentre } from "../../../Event/EventCentre";
import { Renderer } from "../../Renderer";

export default class PerformanceCentre implements Renderer{

    public static instance:PerformanceCentre;//单例（请不要手动新建单例）
    public mainSpr:CustomizedSprite;//默认绘图节点（禁止在该节点上绘图，只能用于添加子节点）
    public chessBoard:ChessBoard;//默认棋盘
    private ui:sideUI;//默认侧边干员UI

    /**
     * 初始化渲染主场景，初始化事件监听类
     * @param scene 游戏主场景
     */
    public static initialize (scene:Laya.Sprite):void{
        PerformanceCentre.instance = new PerformanceCentre();//加载静态类
        PerformanceCentre.instance.mainSpr = new CustomizedSprite();//建立主绘图节点
        //该绘图节点不用于绘制任何图形，仅用于添加子节点
        scene.addChild(PerformanceCentre.instance.mainSpr);//将主绘图节点添加为主场景子节点
        EventCentre.init();//初始化观察者
        PerformanceCentre.initialize = () => {};//清空主场景初始化函数
        // console.log("Main Scene Initialization Complete!!");

    }

    /**
     * 渲染棋盘
     * @param arr 用于生成棋盘的二维数组
     * @param posVec2 棋盘起始坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param unitsize 单位格子宽高（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param backGroundColor 棋盘背景颜色
     * @param frontColor 格子颜色
     * @param father 父绘图节点（默认为全局绘图节点）
     * @param scale 缩放比（默认为1）
     */
    public initBoard(arr: number[][], posVec2: Vec2, unitsize: Vec2, backGroundColor: string, frontColor: string, scale: number = 1): void {
        this.chessBoard = new ChessBoard(arr,posVec2,unitsize,backGroundColor,frontColor,scale);//新建棋盘
        PerformanceCentre.instance.mainSpr.addChild(this.chessBoard);//添加子节点
    }

    /**
     * 调节全局缩放比，只能作用于所有actor渲染完成后、所有特效帧循环执行前，否则有非致命性bug
     * @param value 全局可视节点缩放比
     */
    public rescale(value: number): void {
        EventCentre.instance.event("RESCALE",[value]);//发布调参事件、缩放比参数

    }
    
    /**
     * 渲染actor对象
     * @param bound actor
     * @param pos 坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param siz 宽高（默认10,10）（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param father 父绘图节点（默认为棋盘绘图节点）
     * @param color 颜色（默认为绿）
     */
    public displayActor(bound: Symbolized, pos: Vec2, siz:Vec2 = new Vec2(10,10), color:string = "#00ff00", father:CustomizedSprite = PerformanceCentre.instance.chessBoard): void {
        let tmpActor:ActorRU = new ActorRU(bound.symbol,pos,siz,father,color);//渲染actor
	tmpActor.loadAni("angel_normal","start");
    }
    
    /**
     * 添加/修改进度条
     * 默认进度条长30，宽5（默认进度条宽高无法通过本函数修改，如需修改请前往 .\Rhode Island\src\Rhodes_Game\Performance_Module\SymbolizedRender.ts\ActorRU)
     * 进度颜色为灰，如需修改请前往 .\Rhode Island\src\Rhodes_Game\Performance_Module\ActorComponent.ts\Bar
     * @param bound actor
     * @param bar_symbNum 第几根进度条（始于0） 
     * @param percentage 该进度条进度
     * @param color 该进度条背景颜色
     * @param x 进度条长度（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param y 进度条高度（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     */
    public editBar(bound: Symbolized, bar_symbNum:number = 0, percentage: number = 1, color: string = "#00ff00", x?:number, y?:number): void {
        let tmpActor:ActorRU = ActorBox.get(bound.symbol.data);//获取已渲染的actorRU对象
        if(tmpActor.getBar(bar_symbNum) ===  undefined){//如果对应进度条不存在
            tmpActor.addExtBar(color,bar_symbNum,percentage,x,y);//根据输入参数新建进度条

        }else{//如对应进度条已存在
            tmpActor.editBar(bar_symbNum,percentage);//修改该进度条百分比
        }

    }

    /**
     * 发布攻击事件
     * 此方法调用后请勿修改全局缩放比！！
     * @param from 发动攻击节点
     * @param to 遭受打击节点
     */
    public defaultAtkEffect(from: Symbolized, to: Symbolized): void {
        ActorBox.get(from.symbol.data).clearAni();
        ActorBox.get(from.symbol.data).loadAni("angel_normal","attack",true);
        //打击事件、发动攻击节点和遭受攻击节点参数
        ActorBox.get(from.symbol.data).hit(to);
        
    }

    /**
     * 发布受伤事件
     * 此方法调用后请勿修改全局缩放比！！
     * @param bound 受伤节点
     */
    public defaultDmgEffect(bound: Symbolized): void {
        //受伤事件和受伤节点参数
        ActorBox.get(bound.symbol.data).damage();

    }

    /**
     * 销毁对象（默认销毁）
     * @param bound 对象
     */
    public distroyActor(bound: Symbolized): void {
        let tmpActor:ActorRU = ActorBox.get(bound.symbol.data);//获取actorRU对象
        tmpActor.destory();
        //销毁actorRU对象
    }

    /**
     * 在actor身上渲染文本
     * 仅当全局文本显示开关switchHoverText（）开启时才会渲染文本，开关默认关闭
     * @param bound actor
     * @param content 文本
     * @param pos 文本起始坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     */
    public write(bound: Symbolized, content: string, pos?: Vec2): void {
        ActorBox.get(bound.symbol.data).getText().setText(content);//修改ActorRU文本
        ActorBox.get(bound.symbol.data).getText().setPos(pos);//修改该文本位置
    }

    /**
     * 全局文本显示开关（默认关闭）
     */
    public switchHoverText(): void {
        EventCentre.instance.event(EventCentre.EType.PERFORMANCE_TEXT_SWITCH());//发布文本开关事件，按钮文本不受影响
    }

    /**
     * 移动actor对象
     * @param bound actor
     * @param pos 目标坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     */
    public move(bound: Symbolized, pos: Vec2): void {
        ActorBox.get(bound.symbol.data).relocate(pos);//移动ActorRU对象坐标
    }



    /**
     * 在actor身上添加按钮
     * 每个actorRU默认存在2个按钮（点击actorRU节点即可显示），对应撤退和技能。该按钮坐标、宽高、颜色、名字不可修改，功能需从外部添加
     * @param bound actor
     * @param num 按钮编号（0,1为默认按钮，默认按钮不自带任何功能，需手动添加）
     * @param callback 点击按钮后调用的函数
     * @param text 显示在按钮上的文本（默认显示且无法修改）
     * @param pos 按钮起始坐标（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param size 按钮大小（一律按全局缩放比为1计算，渲染器会根据全局缩放比自动完成缩放渲染）
     * @param color 按钮颜色
     */
    public attachButton(bound: Symbolized,num:number, callback: Function, text?: string, pos?: Vec2, size?: Vec2, color?: string): void {
        let tmpAct:ActorRU = ActorBox.get(bound.symbol.data);//获取ActorRU对象
        if(tmpAct.getButton(num) === undefined){//如果对应按钮不存在
            if(pos === undefined){//如果不输入指定坐标
                tmpAct.addExtraButtonsAtDefLocation(text,num,color,callback);//在默认位置新建按钮
            }else{//如果输入指定坐标
                tmpAct.addExtraButtonAtNoDefLocation(text,num,callback,pos,size,color);//在指定位置新建按钮
            }
        }else{//如果对应按钮存在
            tmpAct.getButton(num).setFunc(callback);//输入功能函数
        }
    }

    /**
     * 渲染动画
     * 代号请查询动画对照表.xlsx
     * @param bound 待渲染对象
     * @param name 干员或敌人代号
     * @param ani 动作代号
     * @param loopOrNot 是否开启动作帧循环（默认关闭）
     */
    public displayAni(bound: Symbolized, name: string, ani: string , loopOrNot:boolean = false): void {
        let tmpActor:ActorRU = ActorBox.get(bound.symbol.data);//获取待渲染ARU
        tmpActor.clearAni();//清理动作
        tmpActor.loadAni(name,ani,loopOrNot);//加载动作
    }

/**
     * 初始化侧面UI
     * 侧面UI的父节点为！！！！棋盘！！！！！！
     * @param pos 相对于棋盘坐标
     * @param unitsize 干员立绘大小
     * 
     */
    public loadSideUI(pos:Vec2,unitsize:Vec2):void{
        PerformanceCentre.instance.ui = new sideUI(pos,unitsize,1);//初始化侧面UI
    }

    /**
     * 向侧面UI插入干员立绘并开启鼠标事件监听
     * @param bound actor对象
     * @param name 干员立绘名见xlsx文件
     */
    public pushActIntoSideUI(bound:Symbolized,name:string):void{
        PerformanceCentre.instance.chessBoard.addChild(PerformanceCentre.instance.ui.getSpr());//添加为棋盘子节点
        let tmpspr:CustomizedSprite = PerformanceCentre.instance.ui.pushActor(bound,name);//干员信息写入UI中数组
        
        let fun:Function = () =>{
            //根据鼠标相对于棋盘坐标换算干员所处坐标
            let tmpvec:Vec2 = PerformanceCentre.instance.chessBoard.returnMouseVec();
            tmpspr.pos(tmpvec.x - PerformanceCentre.instance.ui.getPos().x - 0.5*PerformanceCentre.instance.ui.getSize().x,tmpvec.y - PerformanceCentre.instance.ui.getPos().y- 0.5*PerformanceCentre.instance.ui.getSize().y);
        }
        tmpspr.on(Laya.Event.MOUSE_DOWN,this,()=>{
            //监听鼠标按下事件
            Laya.timer.loop(17,this,fun);//开启帧循环

        });

        tmpspr.on(Laya.Event.MOUSE_UP,this,() => {
            //监听鼠标抬起事件
            Laya.timer.clear(this,fun);//终止帧循环
            
            if(PerformanceCentre.instance.chessBoard.getboardsize().x >= PerformanceCentre.instance.chessBoard.returnMouseVec().x && PerformanceCentre.instance.chessBoard.getboardsize().y >= PerformanceCentre.instance.chessBoard.returnMouseVec().y && PerformanceCentre.instance.chessBoard.returnMouseVec().y >= 0 && PerformanceCentre.instance.chessBoard.returnMouseVec().x >= 0){
                //当mouse_up时鼠标在棋盘上
                let tmpvec:Vec2 = new Vec2(Math.floor(PerformanceCentre.instance.chessBoard.returnMouseVec().x/PerformanceCentre.instance.ui.getscale()/PerformanceCentre.instance.chessBoard.getUnitSize().x)*PerformanceCentre.instance.chessBoard.getUnitSize().x,Math.floor(PerformanceCentre.instance.chessBoard.returnMouseVec().y/PerformanceCentre.instance.ui.getscale()/PerformanceCentre.instance.chessBoard.getUnitSize().y)*PerformanceCentre.instance.chessBoard.getUnitSize().y);
                EventCentre.instance.event(EventCentre.EType.PERFORMANCE_ACTOR_ON_BOARD(bound.symbol.data),tmpvec);//发送干员到达棋盘事件并发送棋盘坐标
                tmpspr.destroy();//摧毁立绘对象
            }else{
                //当mouse_up时鼠标不在棋盘上
                tmpspr.pos(PerformanceCentre.instance.ui.readPairForPos(bound).x,PerformanceCentre.instance.ui.readPairForPos(bound).y);
            }
 


        });

    }
}