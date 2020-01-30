import { Vec2, MyMath } from "../../../../OneFileModules/MyMath";
import { Rec } from "../../../../OneFileModules/ExtendLaya";
import { ArrayAlgo } from "../../../../OneFileModules/DataStructure";
import { EventCentre } from "../../../../OneFileModules/EventCentre";
import Actor from "../Actor";

/**
 * 碰撞消息发布者
 */
export class GridSpace{
    public static readonly GLOBAL_UNIT_WIDTH:number = 100;//全局单位宽
    public static readonly GLOBAL_UNIT_HEIGHT:number = 100;//全局单位高
    public static readonly GLOBAL_UNIT_SUBWIDTH:number = 90;//全局内部单位宽
    public static readonly GLOBAL_UNIT_SUBHEIGHT:number = 90;//全局内部单位高

    private _rec:Rec;
    
    private _pastSet:Vec2[] = [];//此方块上一次存在于哪一点

    /**
     * 返回所有目前自身所处的方格
     */
    private findIntersect():Vec2[]{
        
        const [
            left,
            top,
            right,
            bottom
        ] = [
            MyMath.intDivision(this._rec.x,GridSpace.GLOBAL_UNIT_WIDTH),
            MyMath.intDivision(this._rec.y,GridSpace.GLOBAL_UNIT_HEIGHT),
            MyMath.intDivision(this._rec.right,GridSpace.GLOBAL_UNIT_WIDTH),
            MyMath.intDivision(this._rec.bottom,GridSpace.GLOBAL_UNIT_HEIGHT)
        ]

        let result:Vec2[] = [];

        for (let hori:number = left; hori <= right; hori += 1) {
            for (let verti:number = top; verti <= bottom; verti += 1) {
                result.push(new Vec2(hori, verti));
            }
        }
        return result;
    }

    public pos(x:number, y:number):GridSpace{
        this._rec.x = x;
        this._rec.y = y;
        return this;
    }

    public size(width:number, height:number):GridSpace{
        this._rec.width = width;
        this._rec.height = height;
        return this;
    }

    public event(publisher?:any, identity:string = Actor.Identity.ACTOR):void{
        let current:Vec2[] = this.findIntersect();//当前碰撞集合
        //this._pastSet//历史碰撞集合
        //离开：处于历史碰撞集合，但不处于当前碰撞集合的元素
        let leave:Vec2[] = ArrayAlgo.findComplementSet(this._pastSet, current) as Vec2[];
        //进入：处于当前碰撞集合，但不处于历史碰撞集合的元素
        let entre:Vec2[] = ArrayAlgo.findComplementSet(current, this._pastSet) as Vec2[];
        
        
        //发布事件
        // console.log("离开");
        leave.forEach(ele=>{
            EventCentre.instance.event(EventCentre.EType.LEAVE(ele, identity), publisher);
        });

        // console.log("进入");
        entre.forEach(ele=>{
            EventCentre.instance.event(EventCentre.EType.ENTRE(ele, identity), publisher);
        });

        this._pastSet = current;//更新历史碰撞集合为当前碰撞集合
    };

    constructor(x:number,y:number,width:number = GridSpace.GLOBAL_UNIT_SUBWIDTH, height:number = GridSpace.GLOBAL_UNIT_SUBHEIGHT){
        this._rec = new Rec(x,y,width,height);
    }
}


/**
 * 碰撞消息接收者
 */
export class ColiMatrix{
    /*
    这里的任何矩阵都可以用键值对替代。x与y两个参数可以生成永不重复的键

    */
    private _detectionMatrix:boolean[][] = [];//记录哪个坐标已被监控
    private detectionExist(position:Vec2):boolean{//查看某个坐标是否已被监控
        return this._detectionMatrix[position.x][position.y];
    }
    private _cancellationMatrix:Function[][][] = [];//存放用于取消监听的函数

    private _matrix:Actor[][][] = [];//存放Actor
    private _list:Actor[] = [];//在列表中存放Actor
    private _width:number;
    private _height:number;

    constructor(width:number, height:number){
        this._width = width;
        this._height = height;

        for (let w = 0; w < width; w += 1) {
            this._matrix[w] = [];
            this._detectionMatrix[w] = [];
            this._cancellationMatrix[w] = [];
            for (let h = 0; h < height; h += 1) {
                this._matrix[w][h] = [];
                this._detectionMatrix[w][h] = false;
                this._cancellationMatrix[w][h] = [];
            }
        }
    }

    public setDetection(position:Vec2, identity:string):void{
        if (this.detectionExist(position)) {//如果在此处已存在监控，则不进行重复监控
            return;
        }

        position = position.clone();//复制位置对象以防止传址问题
        
        //设置监听事件
            let detector:Function[] = [];
            detector[0] = (actor:Actor)=>{
                this._list.push(actor);
                this._matrix[position.x][position.y].push(actor);
            };

            detector[1] = (actor:Actor)=>{
                ArrayAlgo.removeEle(actor, this._list);
                ArrayAlgo.removeEle(actor, this._matrix[position.x][position.y]);
            }
            
            EventCentre.instance.on(EventCentre.EType.ENTRE(position, identity), this, detector[0]);
            EventCentre.instance.on(EventCentre.EType.LEAVE(position, identity), this, detector[1]);
        //设置监听事件
        
        this._cancellationMatrix[position.x][position.y].push(()=>{//将监听移除函数存入函数矩阵
            EventCentre.instance.off(EventCentre.EType.ENTRE(position, identity), this, detector[0]);
        }, ()=>{
            EventCentre.instance.off(EventCentre.EType.LEAVE(position, identity), this, detector[1]);
        });

        this._detectionMatrix[position.x][position.y] = true;
    }

    public offDetection(position:Vec2):void{
        this._cancellationMatrix[position.x][position.y].forEach((ele)=>{
            ele();
        });
        this._cancellationMatrix[position.x][position.y] = [];
        this._detectionMatrix[position.x][position.y] = false;
    }

}
