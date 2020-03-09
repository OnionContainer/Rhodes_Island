import { Buff } from "../Actor/ActorModules/Buff";
import { EventCentre } from "../../Event/EventCentre";
/**
 * 模块说明: 游戏战斗地图模块  
 * 负责内容: 地图属性设置，全局buff管理  
 * 负责人: 银华  
 * 时间: 2020年3月3日12:45:41  
 */



export default class GameMap{

    private mapSize:number;
    private globalBuffList:Buff[];
    private maxLifePoint:number;
    private currentCost:number;
    private initialCost:number;
    private maxCost:number;
    private costIncreaseTime:number;
    private workingSpeed:number;
    private timeLine:number;
    private mapNodeList:MapNode[][];

    constructor(){
        this.setMapData();
        //?
        EventCentre.instance.on("ChangeCost",this,this.changeCost);
    }

    public update():void{
        this.getGlobalBuffList();
        this.updateTime(); 
        this.currentCost += this.costIncreaseTime*0.02*this.workingSpeed;//0.02为单帧时间
    }


    private setMapData():boolean{
        //等数据接口
        if(0){//存在数据则设置，否则默认
            //todo......
            return true;
        }else{
            //建立默认地图模型
            let width = 4;
            let height = 1;
            this.mapSize = width*height;
            this.globalBuffList = null;
            this.maxLifePoint = 10;
            this.initialCost = 10;
            this.currentCost = this.initialCost;
            this.maxCost = 99;
            this.costIncreaseTime = 1.0;
            this.workingSpeed = 1;
            this.timeLine = 0;
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
                    this.mapNodeList[height][width] = mapNode;       
                }
            } 
            return false;
        }   
    }

    private getGlobalBuffList():Buff[]{
        return this.globalBuffList;
    }

    private changeCost():void{
        //todo....
    }

    private updateTime():number{
        this.timeLine += 0.02*this.workingSpeed;//每帧时间
        return this.timeLine;
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