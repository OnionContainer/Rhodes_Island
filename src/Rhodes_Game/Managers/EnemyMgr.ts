import { Enemy } from "./Actor/Enemy";
import { Vec2 } from "../../OneFileModules/MyMath";
import Actor from "./Actor/Actor";
import { EventCentre } from "../../OneFileModules/EventCentre";
import { ArrayAlgo } from "../../OneFileModules/DataStructure";
import { ColiReceiver } from "./Actor/ActorModules/ColiMessage";
    

class EnemyMatrix extends ColiReceiver{

    private _matrix:Enemy[][][] = [];

    public checkPoint(x:number,y:number):Enemy[]{
        return this._matrix[x][y];
    }

    constructor(width:number, height:number){
        super(width, height);
        for (let w = 0; w < width; w += 1) {
            this._matrix[w] = [];
            for (let h = 0; h < height; h += 1) {
                this._matrix[w][h] = [];
                this.setDetection(new Vec2(w,h), Actor.Identity.ENEMY);
            }
        }
    }

    /**
     * Overwrite
     */
    protected onEntre(actor:Enemy, position:Vec2):void{
        let list = this._matrix[position.x][position.y];
        if (list.indexOf(actor) !== -1) {//如果此Enemy已经存在于这一格，则终止执行
            return;
        }
        list.push(actor);
    }

    /**
     * Overwrite
     * 
     */
    protected onLeave(actor:Enemy, position:Vec2){
        ArrayAlgo.removeEle(actor, this._matrix[position.x][position.y]);
        
    }
}

/**
 * 敌人对象管理中心
 * 
 */
export default class EnemyMgr{
    
    private pathGroup:Vec2[][] = [//路径信息
        //每一局游戏可能存在多种供敌人途经的路径。这些路径信息在初始化后存在这里
        Vec2.listFromList([
            [500,500],
            [39,558],
            [0,0],
            [300,400]
        ]),
    ];
    private _testLayer:Laya.Sprite;//一个测试用的图层，不重要

    private enemyOnStage:Enemy[] = [];//已经处于战场上的敌人
    private enemyOffStage:Enemy[] = [];//进入战场前的敌人
    private enemyDeadZone:Enemy[] = [];//已死亡的敌人

    private _matrix:EnemyMatrix;

    constructor(){
        
        this._testLayer = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;

        let e = new Enemy();
        e.pos.setSpeed(5);
        this.enemyToStage(e,this.pathGroup[0]);
        console.log(e);

        //上面这些都不重要

        this._matrix = new EnemyMatrix(10,10);//这里应该是两个从数据库中得到的数字
    }

    public update():void{
        this.moveAllEnemy();//移动所有的enemy
        this.test();
    }

    /**
     * 此函数将一个敌人移入onStage区域
     * @param enemy 
     */
    private enemyToStage(enemy:Enemy, path:Vec2[]):void{
        this.enemyOnStage.push(enemy);
        enemy.correspondedPath = path;
        enemy.pathSegCount = 1;
        enemy.pos.data = path[0].clone();
        enemy.pos.setTarget(path[1]);
        // console.log(path[0], enemy.pos.data);
    }

    /**
     * 移动所有在场上的enemy对象
     * 发布移动事件
     */
    private moveAllEnemy():void{
        for (let enemy of this.enemyOnStage) {
            if (enemy.pos.arrived) {
                enemy.pathSegCount += 1;
                if (enemy.pathSegCount >= enemy.correspondedPath.length) {
                    //此敌人已到达终点
                    continue;
                }
                enemy.pos.setTarget(enemy.correspondedPath[enemy.pathSegCount]);
            }
            enemy.pos.move();
            enemy.grid.pos(enemy.pos.data.x, enemy.pos.data.y);
            enemy.grid.event(enemy, Actor.Identity.ENEMY);
        }
    }

    private test():void{
        this._testLayer.graphics.clear();
        this.enemyOnStage.forEach(ele=>{
            this._testLayer.graphics.drawRect(ele.pos.data.x, ele.pos.data.y, 10, 10, "#ff0000");
        });
    }
}


