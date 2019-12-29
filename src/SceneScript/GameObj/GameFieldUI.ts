import Database from "../../Toybox/Database";
import EventCentre from "../../Toybox/EventCentre";
import { Struc, Box } from "../../Toybox/DataStructure";
import MyMath from "../../Toybox/myMath";
import People, { Weapon } from "./People_stuff/People";
import MyGlobal from "../../Toybox/Global";
import Game from "../Game";
import OprtCentre from "./OprtCentre";
import Enemy from "./People_stuff/Enemy";
import Oprt from "./People_stuff/Oprt";
import Present from "./People_stuff/Present";

class TempPst extends Present{
    constructor(){
        super(null);
    }
    public removeHealthBar():void{
        this._sprite.graphics.clear();
    }
}

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
        
        //绘制方块
        
        let pst:TempPst = new TempPst();
        pst.removeHealthBar();
    
        // let weapon:Weapon = new Weapon(2,0,5);
        // pst.drawAttackRange(weapon);
        //绘制方块


        GameFieldUI.i.UISet.addChild(spr);


        Laya.timer.loop(20, this, this.onLoop, [spr, GameFieldUI.i.Centre.range, pst]);//拖动图标开始跟随鼠标
        this.sprite.stage.once(Laya.Event.MOUSE_UP, this, this.onMouseUp, [spr, GameFieldUI.i.Centre.range, pst]);//监听鼠标抬起事件
    }

    private onLoop(spr:Laya.Sprite, range:Box, pst:TempPst):void{
        let x:number = Game.UISet.mouseX;
        let y:number = Game.UISet.mouseY;
        if ((x>0 && x<range.right) && (y>0&&y<range.bottom)) {
            let size:number = Database.i.UnitSize;
            x = x-x%size;
            y = y-y%size;
            spr.pos(x, y);
            pst.clearAttackRange();
            pst.drawAttackRange(new Weapon(Math.floor(y/size),Math.floor(x/size),5));
            return;
        }
        spr.pos(x - spr.width/2, y - spr.height/2);
    }

    private onMouseUp(spr:Laya.Sprite, range:Box, pst:TempPst):void{
        Laya.timer.clear(this, this.onLoop);//停止跟随循环
        
        let x:number = Game.UISet.mouseX;
        let y:number = Game.UISet.mouseY;
        if ((x>0 && x<range.right) && (y>0&&y<range.bottom)) {//鼠标处于地图范围内
            

            let size:number = Database.i.UnitSize;
            x = (x-x%size)/size;//计算单位位置
            y = (y-y%size)/size;

            const xMan:number = x*size;
            const yEs:number = y*size;

            //Looooooooooooooooooooooooooooooop
            let dirNum:number = 0;
            let direct:Function = ()=>{
                let currentX = Game.UISet.mouseX;
                let currentY = Game.UISet.mouseY;
                if (currentX > xMan && currentY > yEs && currentY < yEs + size) {
                    console.log("right");
                    dirNum = 0;
                    pst.clearAttackRange();
                    pst.drawAttackRange(new Weapon(y,x,5));
                } else if (currentX < xMan && currentY > yEs && currentY < yEs + size) {
                    console.log("left");
                    dirNum = 2;
                    pst.clearAttackRange();
                    pst.drawAttackRange(new Weapon(y,x,5).rotateClock().rotateClock());
                } else if (currentY < yEs && currentX > xMan && currentX < xMan + size) {
                    console.log("up");
                    dirNum = 3;
                    pst.clearAttackRange();
                    pst.drawAttackRange(new Weapon(y,x,5).rotateClock().rotateClock().rotateClock());
                } else if (currentY > yEs && currentX > xMan && currentX < xMan + size) {
                    console.log("down");
                    dirNum = 1;
                    pst.clearAttackRange();
                    pst.drawAttackRange(new Weapon(y,x,5).rotateClock());
                }
            };


            Laya.timer.loop(20, this, direct);
            Laya.stage.once(Laya.Event.MOUSE_DOWN, this, ()=>{
                pst.clearAttackRange()
                Laya.timer.clear(this, direct);
                OprtCentre.i.createOprt(y, x, this.id, dirNum);
                spr.destroy();//消除拖动图标
            });
            
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
        let list:string[] = MyGlobal.ListOfOprt;//Global.ListOfOprt仅在开发时采用，后续将会通过制定标准规定干员列表的来源

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
    private _subLayer:Laya.Sprite = new Laya.Sprite();  //测试用图层
    private _topLayer:Laya.Sprite = new Laya.Sprite();  //上层图层
    private _blocks:Laya.Sprite[][];    //各个地图节点
     /*
    blocks是游戏界面包含的格子sprite集合
    每个sprite的父级sprite都是scene下的UISet
    在取用block时，第一层数组的index值为横坐标，第二层数组的index值为纵坐标
    */
    private _recs:Box[][];              //各个地图节点对应的方格
    private _enemyDistribution:Enemy[][][] = [];    //敌人所处的区域
    private _scene:Laya.Scene;          //场景
    private _size:number;               //格子大小（像素）               
    private _width:number;              //横向格子数量
    private _height:number;             //纵向格子数量

    public range:Box;                   //中心区域范围

    constructor(scene:Laya.Scene){
        //获取数据
        const data:any = Database.i.getGround();
        const [width, hight, size] = [data["width"], data["height"], data["size"]];
        this._size = size;
        this._width = width;
        this._height = hight;
        this._scene = scene;
        this._origin = scene.getChildByName("UISet") as Laya.Sprite;
        this._origin.addChild(this._subLayer);

        this._origin.parent.addChild(this._topLayer);
        this._topLayer.pos(this._origin.x,this._origin.y);
        this._topLayer.zOrder = 100;
        
        //创建CentreField区域数据
        this.range = new Box();
        this.range.size(width*size,hight*size);

        //Start
        //创建地图方格 和对应的Box

        this._blocks = [];
        this._recs = [];
        for (let y = 0; y < hight; y += 1) {
            this._blocks[y] = [];
            this._recs[y] = [];
            for (let x = 0; x < width; x += 1) {
                console.log(Database.i.getGround());
                let pngNum:number = Database.i.getGround()["matrix"][y][x];
                let block:Laya.Sprite = Laya.Sprite.fromImage(`Basic/${pngNum}.png`);
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

        //监控敌人位置
        for (let row:number = 0; row < hight; row += 1) {
            this._enemyDistribution[row] = [];
            for (let col:number = 0; col < width; col += 1) {
                console.log("run");
                this._enemyDistribution[row][col] = [];
                EventCentre.instance.on(EventCentre.FieldName.COLLISION,
                    EventCentre.TypeName.IN(row,col),
                    this, this._onEnemyEntre, [row, col]);
                EventCentre.instance.on(EventCentre.FieldName.COLLISION,
                    EventCentre.TypeName.OUT(row,col),
                    this, this._onEnemyLeave, [row, col]);
            }
        }
        console.log(this._enemyDistribution);

        EventCentre.instance.on(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.EFFECT, this, this.onAttackOccur);
        EventCentre.instance.event(EventCentre.FieldName.GLOBAL,
            EventCentre.TypeName.EFFECT,
            [500,500,"2"]
        )
    }

    /**
     * 此函数仅在29日重构前使用
     */
    public attackEffect(fromX:number, fromY:number, toX:number, toY:number):void{
        let sprite:Laya.Sprite = new Laya.Sprite();
        this._topLayer.addChild(sprite);
        sprite.zOrder = 10000;
        
        sprite.graphics.drawRect(fromX,fromY,10,10,"#ff0000");
        let count:number = 0;
        let max:number = 30;
        
        let func:Function = ()=>{
            sprite.graphics.drawRect(fromX + (toX-fromX)*count/max, fromY + (toY-fromY)*count/max, 5, 5, "#ff0040");
            count += 1;
            if (count <= max) {
                Laya.timer.once(10,this,func);
            } else {
                sprite.graphics.drawRect(toX,toY,10,10,"#ff0040");
                Laya.timer.once(1500,this,()=>{
                    this._topLayer.removeChild(sprite);
                });
            }
        };
        func();
        
    }

    /**
     * 这个也只在demo里使用
     */
    public onAttackOccur(x:number, y:number, color:string):void{
        x += Math.random()*20 - 10;
        y += Math.random()*20 - 10;

        let spr:Laya.Sprite = new Laya.Sprite;
        this._topLayer.addChild(spr);

        let time:number = 0;
        let scale:number = 0.7;
        const size:number = Database.i.UnitSize;
        let scaleIncreaseRate:number = 0.4;
        let scaleIncreaseRateIncreaseRate:number = -0.06;

        let ok:Function = ()=>{
            const currentSize:number = size*scale;
            const locate:number = (size-currentSize)/2;

            // console.log(color);

            spr.graphics.clear();
            spr.graphics.drawRect(x + locate, y + locate, currentSize, 4, color);
            spr.graphics.drawRect(x + locate, y + locate, 4, currentSize, color);
            spr.graphics.drawRect(x + locate + currentSize, y + locate, 4, currentSize, color);
            spr.graphics.drawRect(x + locate, y + locate + currentSize, currentSize, 4, color);


            scale = scale + scaleIncreaseRate;
            scaleIncreaseRate = Math.max(0.01, scaleIncreaseRate + scaleIncreaseRateIncreaseRate);
            time += 1;

            if (time < 20) {
                Laya.timer.once(20, this, ok);
            } else {
                spr.parent.removeChild(spr);
            }
        }

        ok();


    }

    /**
     * 查看特定坐标中是否包含输入的enemy对象
     */
    public searchPoint(row:number, col:number, enemy:Enemy):boolean{
        if (row < 0 || col < 0 || row >= this._height || col >= this._width ) {//超出边界直接false
            return false;
        }
        let arr:Enemy[] = this._enemyDistribution[row][col];
        for (let i = 0; i < arr.length; i += 1) {
            if (arr[i] === enemy) {
                return true;
            }
        }
        return false;
    }

    /**
     * 将所有存在enemy的地图节点绘制为紫色
     */
    private _paint():void{
        if (!MyGlobal.LINE_EFFECT_ON) {
            return;
        }

        this._subLayer.graphics.clear();
        this._enemyDistribution.forEach((row,y)=>{
            row.forEach((ele,x)=>{
                if (ele.length !== 0) {
                    this._subLayer.graphics.drawRect(x*Database.i.UnitSize, y*Database.i.UnitSize,
                    Database.i.UnitSize, Database.i.UnitSize, "#ff00ff");
                }
            });
        });
    }

    private _onEnemyEntre(row:number, col:number, enemy:Enemy):void{
        // console.log("Entre:" + row + "|" + col);
        // console.log(this._enemyDistribution[row][col]);
        this._enemyDistribution[row][col].push(enemy);
        this._paint();
    }

    private _onEnemyLeave(row:number, col:number, enemy:Enemy):void{
        // console.log("Leave:" + row + "|" + col);
        let length = this._enemyDistribution[row][col].length;
        for (let i = 0; i < length; i += 1) {
            if (this._enemyDistribution[row][col][i] === enemy) {
                this._enemyDistribution[row][col].splice(i,1);
                break;
            }
        }
        this._paint();
    }

    public CreateSprite(imgURL:string,x:number = 0,y:number = 0):Laya.Sprite{
        let sprite:Laya.Sprite = Laya.Sprite.fromImage(imgURL);//创建sprite
        this._scene.getChildByName("UISet").addChild(sprite);//插入中心区域
        sprite.size(Database.i.UnitSize, Database.i.UnitSize);//根据数据库提供的常量设置大小
        sprite.pos(x,y);//确定位置
        return sprite;
    }


    /**
     * 输入一个方格，输出与其交叠的地图方格
     */
    public collision(from:Box):Box[] {
        
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
        
        //弄个暂停键凑合用
        let pauseButton:Laya.Sprite = new Laya.Sprite();
        pauseButton.size(50,50).pos(0,0);
        pauseButton.graphics.drawRect(0,0,50,50,"#ff0000");
        this._scene.addChild(pauseButton);
        pauseButton.on(Laya.Event.MOUSE_DOWN, this, ()=>{
            EventCentre.instance.event(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.PAUSE);
        });
        

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