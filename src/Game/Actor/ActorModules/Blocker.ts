import { ColiReceiver } from "./ColiMessage";
import { Pos } from "./Position";
import Actor from "../Actor";
import { Vec2 } from "../../../Common/DodMath";
import { Enemy } from "../Enemy";
import { KVPair, ArrayAlgo } from "../../../Common/DodDataStructure";
import Oprt from "../Oprt";
import EnemyMgr from "../EnemyMgr";
import RhodesGame from "../../RhodesGame";
import { Seeker } from "./AtkAbst";


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
        return RhodesGame.Instance.battle.enemyMgr.matrix.checkPoint(this._blockPoint.x, this._blockPoint.y);
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


/**
 * 作者：葱
 * 这边做了一个不用事件驱动的阻挡器
 * 阻挡器：每帧尝试对范围内的敌人进行阻挡的类
 * 会直接调用Actor的接口
 * 会发出阻挡事件
 */
export class BlockerPlanB implements Seeker{

    public readonly oprt:Oprt;//拥有此阻挡器的干员
    public readonly blockList:Enemy[] = [];//目前已经阻挡的敌人
    public readonly pos:Vec2 = new Vec2(0,0);//阻挡位置

    constructor(oprt:Oprt, pos:Vec2){
        
    }

    /**
     * 每帧扫描阻挡的区域，决定如何进行阻挡
     */
    public update(){
        if (this.oprt.ableToBlock() == false) {//挡不了，不挡了
            return;
        }

        let restBlockability:number = 3//this.oprt.profile.maxblockability;//todo
        this.blockList.forEach(enemy=>{
            restBlockability -= enemy.profile.breakthrough;
        });

        if (restBlockability == 0) {//顶不住了，不挡了
            return;
        }

        if (restBlockability < 0) {//不应当出现的情况
            throw new DOMException("Unacceptable Breakthrough Change", "Game Rule Exception");
        }


        //重要：此处直接访问了RhodesGame单例，是否要进行此类访问尚待讨论
        let scanList:Enemy[] = RhodesGame.Instance.battle.enemyMgr.matrix.checkPoint(this.pos.x, this.pos.y);
        for (let i = 0; i < scanList.length; i += 1) {
            let current:Enemy = scanList[i];
            if (this.blockList.indexOf(current) !== -1) {//已经挡了的就不管了
                continue;
            }
            if (current.ableToBeBlocked() == false) {//挡不了的就不挡了
                continue;
            }
            if (current.profile.breakthrough>restBlockability) {//穿越能力太强的就不挡了
                continue;
            }
            
            restBlockability -= current.profile.breakthrough;
            current.setBlocked(true);
            this.blockList.push(current);
        }
    }


    public getFocus():Actor{
        //todo: 返回瞄准的目标
        return null;
    }

    public getFocusList():Actor[]{
        //todo: 问一下这个是什么思路
        return null;
    }

    public getCaptureList():Actor[]{
        //todo: 返回目前捕捉的所有Actor
        return null;
    }

    public followActor():Actor{
        //todo: 同样问一下这东西的思路
        return null;
    }


}