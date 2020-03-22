import Actor from "../Actor";
import { Seeker } from "./ActorSeeker";
import { Vec2 } from "../../../Common/DodMath";
import { ActorType } from "../../../Common/DodKey";
import RhodesGame from "../../RhodesGame";
import { ArrayAlgo } from "../../../Common/DodDataStructure";

/**
 * 作者：草生葱
 * 
 * Blocker是阻挡模块
 * 储存阻挡相关的信息
 * 它负责每帧检测干员可阻挡的位置是否有敌人进入，并决定是否阻挡
 * 
 * 
 * //todo: 如果进行阻挡或解除阻挡，Blocker将会发布事件
 */
export class Blocker{

    private _keeper:Actor;
    private _pos:Vec2;
    private _blockList:Actor[] = [];//已阻挡的列表
    private _blockedBy:Actor = null;//被谁阻挡
    private _blockAbility:number = 3;//阻挡能力
    private _breakthrough:number = 1;//反阻挡能力

    public get isBlocked():boolean{
        return this._blockedBy != null;
    }

    constructor(keeper:Actor, res:any){
        this._keeper = keeper;
        this._pos = keeper.profile.getNodePos();

        if (this._keeper.type != ActorType.Operator) {//不是干员类型的话就清空update方法
            this.update = ()=>{};
        }
        //todo: 根据res设置阻挡能力、反阻挡能力

        //test
        this._pos = new Vec2(4,4);
    }

    /**
     * 重设阻挡位置
     * @param pos 地图节点位置，整数Vec2
     */
    public reposition(pos:Vec2):void{
        this._pos = pos;
        this._blockList.forEach(ele=>{
            this._blockAbility += ele.blocker._breakthrough;
        });
        this._blockList = [];
    }

    public update():void{
        /* 目前的算法会产生一个判定问题：
         * 设有相邻的两个格子A和B，B在右边，A上站着推王（朝右），B上站着塞雷娅
         * 敌人在【移入】B格时会被塞莱娅阻挡
         * 此时由于推王的攻击范围是两格，她可以攻击到塞雷娅阻挡的敌人
         * 这与游戏表现相冲突：攻击范围2格的近卫是无法跨一个人攻击敌人的，3格才行（我印象中是）
         * 
         * 这个问题在此版本暂且忽略
        */
        if (this._blockAbility <= 0) {//没有阻挡能力就不考虑剩下的事了
            return;
        }
        let list:Actor[] = RhodesGame.Instance.battle.mapNodeCPU.matrixGet(this._pos);//获取阻挡目标
        let newCapture:Actor[] = ArrayAlgo.findCompSet(list, this._blockList);
        newCapture = newCapture.filter(ele=>{
            return ele.blocker._blockedBy == null && ele.profile.blockable;
        });
        //只选取无人阻挡且可被阻挡的部分
        if (newCapture.length == 0) {//没有出现新的阻挡目标
            return;
        }
        newCapture.forEach(ele=>{
            if (ele.blocker._breakthrough <= this._blockAbility) {
                this._blockList.push(ele);
                this._blockAbility -= ele.blocker._breakthrough;
                ele.blocker._blockedBy = this._keeper;
            }
        });
    }

}