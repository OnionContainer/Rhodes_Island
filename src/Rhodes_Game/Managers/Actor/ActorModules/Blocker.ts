import { ColiReceiver } from "./ColiMessage";
import { Pos } from "./Position";
import Actor from "../Actor";
import { Vec2 } from "../../../../OneFileModules/MyMath";
import { Enemy } from "../Enemy";
import { KVPair, ArrayAlgo } from "../../../../OneFileModules/DataStructure";
import Oprt from "../Oprt";
import EnemyMgr from "../../EnemyMgr";
import RhodesGame from "../../../RhodesGame";


/**
 * 阻挡的逻辑似乎比较松散和复杂
 * Blocker可能需要通过一个单例与其他Blocker联系
 * 或者整个图结构啥的……
 * 目前一大bug就是如果一个敌人正在被阻挡，且同时处于多个干员的阻挡范围，撤出正在阻挡它的干员不会使得其他多个干员尝试对它进行阻挡
 * 一个解决办法是在解除阻挡之后立即发出一个同步处理的事件，让其他blocker自查能否阻挡正在被释放的敌人
 */
export class Blocker extends ColiReceiver{

    
    private _blockPoint:Vec2;//阻挡点
    private get _source():Enemy[]{
        return RhodesGame.instance.enemyMgr.matrix.checkPoint(this._blockPoint.x, this._blockPoint.y);
    }
    private _level:number = 0;//当前阻挡消耗
    private _maxLevel:number = 3;//最高阻挡消耗
    public blockList:Enemy[] = [];//阻挡列表
    public owner:Oprt;

    constructor(blockPoint:Vec2, owner:Oprt){
        super(10,10);
        this.owner = owner;
        this._blockPoint = blockPoint;
        this.setDetection(this._blockPoint, Actor.Identity.ENEMY);
    }


    protected onEntre(actor:Enemy, pos:Vec2):void{
        this.tryBlock(actor);
    }

    protected onLeave(actor:Enemy, pos:Vec2):void{
        this.release(actor);
    }

    private tryBlock(enemy:Enemy):void{
        //不能阻挡的情况直接跳出去
        if (enemy.profile.invisible){return;}//隐身敌人不能被阻挡
        if (enemy.profile.blocked){return;}//已被阻挡的敌人不能被再次阻挡
        if (enemy.profile.breakthrough + this._level > this._maxLevel) {return;}
        //如果敌人的突破能力（通常是1）加上this的阻挡能力，超过阻挡能力上限，则不阻挡

        //确认能够阻挡，进入阻挡逻辑
        this.blockList.push(enemy);
        enemy.onBlock(this.owner);
    }

    private release(enemy:Enemy):void{
        const i = this.blockList.indexOf(enemy);
        if (i < 0) {
            throw new DOMException("Impossible to release an enemy that is not captured", "Blocker Logic Exception");
        }
        this.blockList.splice(i,1)[0].onRelease();//删除元素并调用解除阻挡方法
    }
}