import Database from "../../Toybox/Database";
import EventCentre from "../../Toybox/EventCentre";
import { Struc, Box } from "../../Toybox/DataStructure";
import MyMath from "../../Toybox/myMath";
import People from "./People_stuff/People";
import Global from "../../Toybox/Global";
import Game from "../Game";
import OprtCentre from "./OprtCentre";


/**
 * 干员栏的一个单元
 */
class OprtProfile{
    public sprite:Laya.Sprite;
    public id:string;
    public img:string;          //图片路径

    constructor(id:string){
        //获取资料
        this.id = id;
        let data:any = Database.i.getOprt(id);
        this.img = data["img"];

        //创建sprite
        this.sprite = Laya.Sprite.fromImage(data["img"]);
        //监听点击事件
        this.sprite.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);

    }

    private onMouseDown():void{
        let spr:Laya.Sprite = Laya.Sprite.fromImage(this.img);//创建并调整拖动图标
        spr.size(Database.i.UnitSize, Database.i.UnitSize);
        GameFieldUI.i.UISet.addChild(spr);
        Laya.timer.loop(20, this, this.onLoop, [spr, GameFieldUI.i.Centre.range]);//拖动图标开始跟随鼠标
        this.sprite.stage.once(Laya.Event.MOUSE_UP, this, this.onMouseUp, [spr, GameFieldUI.i.Centre.range]);//监听鼠标抬起事件
    }

    private onLoop(spr:Laya.Sprite, range:Box):void{
        let x:number = Game.UISet.mouseX;
        let y:number = Game.UISet.mouseY;
        if ((x>0 && x<range.right) && (y>0&&y<range.bottom)) {
            let size:number = Database.i.UnitSize;
            x = x-x%size;
            y = y-y%size;
            spr.pos(x, y);
            return;
        }
        spr.pos(x - spr.width/2, y - spr.height/2);
    }

    private onMouseUp(spr:Laya.Sprite, range:Box):void{
        Laya.timer.clear(this, this.onLoop);//停止跟随循环
        spr.destroy();//消除拖动图标
        let x:number = Game.UISet.mouseX;
        let y:number = Game.UISet.mouseY;
        if ((x>0 && x<range.right) && (y>0&&y<range.bottom)) {//鼠标处于地图范围内
            let size:number = Database.i.UnitSize;
            x = (x-x%size)/size;//计算单位位置
            y = (y-y%size)/size;
            OprtCentre.i.createOprt(y, x, this.id);
        } else {//鼠标处于地图范围外
            //其实没什么要做的
        }
    }



}

/**
 * 侧边栏UI类
 * 也就是干员栏
 */
class SideField{
    private _origin:Laya.Sprite;//此区块的坐标原点
    private _pixWidth:number = 100;     //宽度
    private _pixHeight:number = 500;    //高度
    private _profiles:OprtProfile[] = [];

    constructor(scene:Laya.Scene, rightShift:number){
        //获取原点
        this._origin = scene.getChildByName("SideBar") as Laya.Sprite;
        //移动原点到CentreField的右边30px处
        this._origin.pos(rightShift, this._origin.y);
        //绘制方框
        this._origin.graphics.drawRect(0,0,100,500,"#fa1566");
        //根据可选干员列表生成待选干员栏
        let list:string[] = Global.ListOfOprt;//Global.ListOfOprt仅在开发时采用，后续将会通过制定标准规定干员列表的来源

        list.forEach((ele, index)=>{
            let currentOprt = new OprtProfile(ele);
            currentOprt.sprite.pos(0,80*index).size(80,80);
            this._origin.addChild(currentOprt.sprite);
            this._profiles[index] = currentOprt;
        });

        console.log(this);
    }
}


/**
 * 中央区域UI类
 */
class CentreField{
    private _origin:Laya.Sprite;        //中央区域的原点
    private _blocks:Laya.Sprite[][];    //各个地图节点
     /*
    blocks是游戏界面包含的格子sprite集合
    每个sprite的父级sprite都是scene下的UISet
    在取用block时，第一层数组的index值为横坐标，第二层数组的index值为纵坐标
    */
    private _recs:Box[][];              //各个地图节点对应的方格
    private _scene:Laya.Scene;          //场景
    private _size:number;               //格子大小（像素）               
    private _width:number;              //横向格子数量
    private _height:number;             //纵向格子数量

    public range:Box;

    constructor(scene:Laya.Scene){
        //获取数据
        const data:any = Database.i.getGround();
        const [width, height, size] = [data["width"], data["height"], data["size"]];
        this._size = size;
        this._width = width;
        this._height = height;
        this._scene = scene;
        this._origin = scene.getChildByName("UISet") as Laya.Sprite;

        //创建CentreField区域数据
        this.range = new Box();
        this.range.size(width*size,height*size);

        //Start
        //创建地图方格 和对应的Box

        this._blocks = [];
        this._recs = [];
        for (let y = 0; y < height; y += 1) {
            this._blocks[y] = [];
            this._recs[y] = [];
            for (let x = 0; x < width; x += 1) {
                let block:Laya.Sprite = Laya.Sprite.fromImage("Basic/Rec.png");
                this._origin.addChild(block);
                block.size(size,size).pos(x*size,y*size);
                this._blocks[y][x] = block;
                this._recs[y][x] = new Box();
                this._recs[y][x].pos(x*size,y*size).size(size,size);
                this._recs[y][x].unitX = x;
                this._recs[y][x].unitY = y;
            }
        }
        //创建地图方格
        //End
    }

    public CreateEnemy(imgURL:string,x:number = 0,y:number = 0):Laya.Sprite{
        let sprite:Laya.Sprite = Laya.Sprite.fromImage(imgURL);//创建sprite
        this._scene.getChildByName("UISet").addChild(sprite);//插入中心区域
        sprite.size(Database.i.UnitSize, Database.i.UnitSize);//根据数据库提供的常量设置大小
        sprite.pos(x,y);//确定位置
        return sprite;
    }


    /**
     * 输入一个方格，输出与其交叠的地图方格
     */
    public getRec(from:Box):Box[] {
        
        let origin_x = this.round(from.x,this._size);
        let origin_y = this.round(from.y,this._size);
        let bottom = this.round(from.bottom,this._size);
        let right = this.round(from.right,this._size);
        if (origin_x >= this._width || origin_y >= this._height) {
            return [];
        }


        origin_x = origin_x<0?0:origin_x;//origin_x is at least 0
        origin_y = origin_y<0?0:origin_y;//origin_y is at least 0
        bottom = bottom>=this._height?this._height-1:bottom//bottom is at most this._height
        right = right>=this._width?this._width-1:right//right is at most this._right

        let result:Box[] = [];
        for (let hei = origin_y; hei <= bottom; hei += 1) {
            for (let wid = origin_x; wid <= right; wid += 1) {
                result.push(this._recs[hei][wid]);
            }
        }

        return result;
    }

    /**
     * 求c = a / b
     * 返回c在数轴上向0移动时经过的第一个整数值
     * @param a 
     * @param b 
     */
    public round(a:number, b:number):number{
        return (a-a%b)/b;
    }

    /**
     * 位置判定策略
     * 1.在每一个帧循环中，每一个移动了的People通过CentreField.i.getRec获得自身所处的区域方块
     * 2.上述People对比自身当前所处的区域方块和上一帧所处的区域方块，找出自身退出的和进入的方块
     * 3.上述People发布进入/离开方块事件
     * 
     * 
     */
}    




/**
 * 整个主要场景的UI类
 */
export default class GameFieldUI{
    /*
    控制整个Game场景中可视元素的类
    此类是单例
    */
    public static i:GameFieldUI;
    public static init(scene:Laya.Scene):void{
        this.i = new GameFieldUI(scene);
        this.init = ()=>{};
    }

    

    private constructor(scene){
        
        this.UISet = scene.getChildByName("UISet");
        this.SideBar = scene.getChildByName("SideBar");

        this._centre = new CentreField(scene);
        this._side = new SideField(scene, this.UISet.x + this._centre.range.width + 20);
        this._scene = scene;
        
        

        console.log(this);
    }

    private _scene:Laya.Scene;
    private _side:SideField;        //场景右侧的干员选框
    private _centre:CentreField;    //场景中间的游戏地图
    public readonly UISet:Laya.Sprite;
    public readonly SideBar:Laya.Sprite;

    public get Centre():CentreField{
        return this._centre;
    }

    public get Side():SideField{
        return this._side;
    }

    public update():void{
    }

    
}