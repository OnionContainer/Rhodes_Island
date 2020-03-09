import { Buff } from "./Actor/ActorModules/Buff";
import { EventCentre } from "../Event/EventCentre";
import FixTime from "../Fix/FixTime";
import DodResourceMgr from "../Resources/DodResourceMgr";
/**
 * 模块说明: 游戏战斗地图模块  
 * 负责内容: 地图属性设置，全局buff管理  
 * 负责人: 银华  
 * 时间: 2020年3月3日12:45:41  
 */

//KR: 尽量做到职责单一 map类用于维护整个地图的拓扑结构

export default class GameMap{
    private _mapSize:number;
    private _mapNodeList:MapNode[][];

    constructor(){
        this._mapSize = 0;

        this._mapNodeList = [];
    }

    public init(res: any): void {
        this._setMapData(res);
    }

    public update(): void {

    }

    public reset() {
        this._mapNodeList.splice(0, this._mapNodeList.length);
    }

    private _setMapData(res: any): void{
        //TODO use res to init
        
        //建立默认地图模型
        let width = 4;
        let height = 1;
        this._mapSize = width*height;
        for(let j = 0;j<height;j++){
            for(let i = 0;i<width;i++){
                let mapNode:MapNode = null;
                if(width==0){
                    mapNode= new MapNode(width,NodeType.BLUEPOINT);
                }else if(width==3){
                    mapNode= new MapNode(width,NodeType.REDPOINT);
                }else{
                    mapNode= new MapNode(width,NodeType.GRAND);
                }
                this._mapNodeList[height][width] = mapNode;       
            }
        } 
    }

    public getNodeByIndex(index: number): MapNode {
        //TODO 以及提供各类接口
        return null;
    } 

}

enum NodeType{
    EMPTY,              //场景区域
    BLUEPOINT,          //我方基地
    REDPOINT,           //敌方出兵点
    GRAND,              //地面
    HIGHLAND,           //高台
             
}

class MapNode{
    private index:number;
    private type:NodeType;
    private isEmpty:boolean;

    constructor(index:number,type:NodeType){
        this.index = index;
        this.type = type;
        this.isEmpty = true;
    }

    public getIndex():number{
        return this.index;
    }

    public getType():NodeType{
        return this.type;
    }

    public setIndex(index:number):number{
        this.index = index;
        return this.index;
    }

    public setType(type:NodeType):NodeType{
        this.type = type;
        return this.type;
    }

    public empty():boolean{
        return this.isEmpty;
    }
}