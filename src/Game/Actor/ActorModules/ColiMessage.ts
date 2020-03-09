import { Vec2, DodMath } from "../../../Common/DodMath";
import { FixRect } from "../../../Fix/FixRect";
import { ArrayAlgo } from "../../../Common/DodDataStructure";
import { EventCentre } from "../../../Event/EventCentre";
import Actor from "../Actor";

/**
 * 碰撞消息发布者
 */
export class ColiEmit{
    public static readonly GLOBAL_UNIT_WIDTH:number = 100;//全局单位宽
    public static readonly GLOBAL_UNIT_HEIGHT:number = 100;//全局单位高
    public static readonly GLOBAL_UNIT_SUBWIDTH:number = 90;//全局内部单位宽
    public static readonly GLOBAL_UNIT_SUBHEIGHT:number = 90;//全局内部单位高

    private _rec:FixRect;
    
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
            DodMath.intDivision(this._rec.x,ColiEmit.GLOBAL_UNIT_WIDTH),
            DodMath.intDivision(this._rec.y,ColiEmit.GLOBAL_UNIT_HEIGHT),
            DodMath.intDivision(this._rec.right,ColiEmit.GLOBAL_UNIT_WIDTH),
            DodMath.intDivision(this._rec.bottom,ColiEmit.GLOBAL_UNIT_HEIGHT)
        ]

        let result:Vec2[] = [];

        for (let hori:number = left; hori <= right; hori += 1) {
            for (let verti:number = top; verti <= bottom; verti += 1) {
                result.push(new Vec2(hori, verti));
            }
        }
        return result;
    }

    public pos(x:number, y:number):ColiEmit{
        this._rec.x = x;
        this._rec.y = y;
        return this;
    }

    public size(width:number, height:number):ColiEmit{
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

    
    /**
     * 发布离开当前存在的所有坐标的事件
     * @param publisher 
     * @param identity 
     */
    public eventLeaveAll(publisher?:any, identity:string = Actor.Identity.ACTOR):void{
        this._pastSet.forEach(vec=>{
            EventCentre.instance.event(EventCentre.EType.LEAVE(vec, identity), publisher);
        });
    }

    constructor(x:number,y:number,width:number = ColiEmit.GLOBAL_UNIT_SUBWIDTH, height:number = ColiEmit.GLOBAL_UNIT_SUBHEIGHT){
        this._rec = new FixRect(x,y,width,height);
    }
}

/**
 * 碰撞消息接收者
 * 可以通过setDetection监控指定点，指定Identity的进入和离开事件
 * 可以通过offDetection撤销指定点的监控
 * 这个不能直接用，要继承一层把onLeave和onEntre函数重写之后才能用
 */
export abstract class ColiReceiver{
    /*
    这里的任何矩阵都可以用键值对替代。x与y两个参数可以生成永不重复的键

    */
    private _detectionMatrix:boolean[][] = [];//记录哪个坐标已被监控
    private detectionExist(position:Vec2):boolean{//查看某个坐标是否已被监控
        return this._detectionMatrix[position.x][position.y];
    }
    private _cancellationMatrix:Function[][][] = [];//存放用于取消监听的函数
    private _width:number;
    private _height:number;

    constructor(width:number, height:number){
        this._width = width;
        this._height = height;

        for (let w = 0; w < width; w += 1) {
            this._detectionMatrix[w] = [];
            this._cancellationMatrix[w] = [];
            for (let h = 0; h < height; h += 1) {
                this._detectionMatrix[w][h] = false;
                this._cancellationMatrix[w][h] = [];
            }
        }
    }

    /**
     * 此方法提供给此类的子类重写
     * 每当此实例监控的进入碰撞事件在已启用监听的坐标发生时，此函数将被调用
     * @param actor 
     * @param position
     */
    protected abstract onEntre(actor:Actor, position:Vec2):void

    /**
     * 此方法提供给此类的子类重写
     * 每当此实例监控的进入碰撞事件在已启用监听的坐标发生时，此函数将被调用
     * @param actor 
     * @param position
     */
    protected abstract onLeave(actor:Actor, position:Vec2):void

    /**
     * 在指定坐标上设置监听碰撞事件
     * identity可以在Actor.Identity里选择
     * 那我为什么不写enum呢……
     */
    public setDetection(position:Vec2, identity:string):void{
        if (this.detectionExist(position)) {//如果在此处已存在监控，则取消监控
            console.log("setDetection函数不能在同一个坐标多次监控，请查看ColiReciever类");
            return;
        }
        if (position.x >= this._width || position.x < 0 ||
            position.y > this._height || position.y < 0) {//如果监控位置超出边界，则取消监控
            return;
        }


        position = position.clone();//复制位置对象以防止传址问题
        let detector:Function[] = [];//这是监听函数，存起来准备撤除监听时用
        //设置监听事件
            detector[0] = (actor:Actor)=>{//进入事件函数
                this.onEntre(actor, position);
            }
            detector[1] = (actor:Actor)=>{//离开事件函数
                this.onLeave(actor, position);
            }
            
            EventCentre.instance.on(EventCentre.EType.ENTRE(position, identity), this, detector[0]);
            EventCentre.instance.on(EventCentre.EType.LEAVE(position, identity), this, detector[1]);
        //设置监听事件
        
        this._cancellationMatrix[position.x][position.y].push(()=>{//将监听移除函数存入函数矩阵
            EventCentre.instance.off(EventCentre.EType.ENTRE(position, identity), this, detector[0]);
        }, ()=>{
            EventCentre.instance.off(EventCentre.EType.LEAVE(position, identity), this, detector[1]);
        });

        this._detectionMatrix[position.x][position.y] = true;//将此坐标的状态设为“已被监听”
    }

    /**
     * 移除指定坐标的碰撞事件监听
     * @param position
     */
    public offDetection(position:Vec2):void{
        this._cancellationMatrix[position.x][position.y].forEach((ele)=>{//执行每一个预存的函数
            ele();
        });
        this._cancellationMatrix[position.x][position.y] = [];//删除此处的预存函数
        this._detectionMatrix[position.x][position.y] = false;//将此坐标设为未监听
    }
}
