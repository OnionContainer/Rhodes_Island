import Database from "../../Toybox/Database";
import EventCentre from "../../Toybox/EventCentre";
import { Struc } from "../../Toybox/DataStructure";
import MyMath from "../../Toybox/myMath";



class SideField{
    constructor(scene:Laya.Scene){
        
    }
}

type movement = {
    x_speed:number,
    y_speed:number,
    x_end:number,
    y_end:number,
    callback:Function
    
}

class CentreField{
    private _blocks:Laya.Sprite[][];
    /*
    blocks是游戏界面包含的格子sprite集合
    每个sprite的父级sprite都是scene下的UISet
    在取用block时，第一层数组的index值为横坐标，第二层数组的index值为纵坐标
    */
    private _size:number;
    private _width:number;
    private _height:number;
    constructor(scene:Laya.Scene){
        const data:any = Database.inst.getGround();
        const [width, height, size] = [data["width"], data["height"], data["size"]];
        this._size = size;
        this._width = width;
        this._height = height;
        this._scene = scene;

        //Start
        //创建地图方格
        this._blocks = [];
        for(let x = 0; x < width; x += 1) {
            this._blocks[x] = []
            for(let y = 0; y < height; y += 1) {
                let block:Laya.Sprite = Laya.Sprite.fromImage("Basic/Rec.png");
                scene.getChildByName("UISet").addChild(block);
                block.size(size,size).pos(x*size,y*size);
                this._blocks[x][y] = block;
            }
        }
        //创建地图方格
        //End

    }

    private _scene:Laya.Scene;

    public CreateEnemy(imgURL:string,x:number = 0,y:number = 0):Laya.Sprite{
        let sprite:Laya.Sprite = Laya.Sprite.fromImage(imgURL);//创建sprite
        this._scene.getChildByName("UISet").addChild(sprite);//插入中心区域
        sprite.size(Database.inst.UnitSize, Database.inst.UnitSize);//根据数据库提供的常量设置大小
        sprite.pos(x,y);//确定位置
        return sprite;
    }

    

    public frameWork():void{
        
    }
}    
    
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
        this._side = new SideField(scene);
        this._centre = new CentreField(scene);
        this._scene = scene;
        
    }

    private _scene:Laya.Scene;
    private _side:SideField;        //场景右侧的干员选框
    private _centre:CentreField;    //场景中间的游戏地图
    public get Centre():CentreField{
        return this._centre;
    }

    public frameWork():void{
        this._centre.frameWork();
    }

    
}