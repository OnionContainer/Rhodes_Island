import { Vec2, MyMath } from "../../../../OneFileModules/MyMath";

/**
 * Pos类描述位置并提供移动所需的接口
 */
export class Pos{
    // public autoSwitchTarget:boolean = true;
    public data:Vec2 = new Vec2(0,0);//位置
    public target:Vec2 = new Vec2(0,0);//目标
    public speed:number = 0;//速度
    public approach:number = 0;//逼近次数
    public vecSpeed:Vec2 = new Vec2(0,0);//分量速度
    private _arrived:boolean = false;//已到达目的地(每次设置新目的地时设为false)
    public get arrived():boolean{return this._arrived;}//获取是否已到达的信息

    public setTarget(target:Vec2):void{
        
        this.target = target;
        this.aim();
    }

    public setSpeed(speed:number):void{
        this.speed = speed;
        this.aim();
    }

    /**
     * 计算移动参数,并将_arrived设为false
     */
    private aim():void{
        this.vecSpeed = MyMath.moveToComponent(this.data,this.target,this.speed);
        this.approach = this.data.distanceTo(this.target) / this.speed;
        this._arrived = false;
        
    }

    /**
     * 向目标点移动一次
     */
    public move():void{
        this.approach -= 1;
        if (this.approach <= 0) {
            this.data.x = this.target.x;
            this.data.y = this.target.y;
            this._arrived = true;
            return;
        }
        this.data.x = this.data.x + this.vecSpeed.x;
        this.data.y = this.data.y + this.vecSpeed.y;
        return;
    }
    constructor(){

    }
}