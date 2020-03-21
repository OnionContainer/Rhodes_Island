import { ActorType } from "../../../Common/DodKey";
import { Seeker } from "./ActorSeeker";
import { Vec2 } from "../../../Common/DodMath";
import Actor from "../Actor";
import RhodesGame from "../../RhodesGame";

/**
 * 此对象是一种可以被攻击状态机应用的Actor搜索器
 * 专门用来对应地图节点搜索敌人（而非干员）
 */
export class MapNodeSeeker implements Seeker {

    private _origin:Vec2;//中心位置
    private _rotate:number = 0;//顺时针旋转90度的次数，默认为0
    private _relativeNodeList:Vec2[] = [];//需要监控的地图节点的相对位置
    private _absoluteNodeList:Vec2[] = [];//需要监控的地图节点的绝对位置

    private _focus:Actor;//锁定的敌人
    private _focusChanged:boolean = false;//锁定的敌人已修改
    private _captureList:Actor[]//捕捉到的敌人

    private setAbsolute():void{//重新计算所有需要监控的地图节点的绝对位置
        this._absoluteNodeList = [];
        this._relativeNodeList.forEach(ele=>{
            this._absoluteNodeList.push(this._origin.plus(ele));
        });

    }

    constructor(origin:Vec2, res:any, rotate:number = 0){
        //这里的res是一种代表攻击范围类型的数据
        this._origin = origin;
        this._rotate = rotate;
        
        //test
        this._relativeNodeList.push(new Vec2(0,0), new Vec2(1,0), new Vec2(2,0));
        this.setAbsolute();
    }


    getFocus(): Actor {
        throw new Error("Method not implemented.");
    }
    getFocusList(count: number): Actor[] {
        throw new Error("Method not implemented.");
    }
    getCaptureList(): Actor[] {
        throw new Error("Method not implemented.");
    }
    followActor(): Actor {
        throw new Error("Method not implemented.");
    }
    focusChanged(): boolean {
        throw new Error("Method not implemented.");
    }
    update(): void {
        this._absoluteNodeList.forEach(ele=>{
            let list:Actor[] = RhodesGame.Instance.battle.mapNodeCPU.matrixGet(ele);
        });
        
    }
}