import { Enemy } from "./Actor/Enemy";
import { Vec2 } from "../../OneFileModules/MyMath";
import Actor from "./Actor/Actor";
import { EventCentre } from "../../OneFileModules/EventCentre";
import { ArrayAlgo } from "../../OneFileModules/DataStructure";
import { ColiReceiver, ColiEmit } from "./Actor/ActorModules/ColiMessage";
import Path from "./Path";
    

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

class PathInfo{
    private _collection:any = {};
    constructor(){}
    public add(name:string, path:Vec2[]):boolean{
        if (this._collection[name] !== undefined) {//this path is already defined
            return false;
        }
        this._collection[name] = path;
    }
    public read(name:string):Vec2[]{
        return this._collection[name];
    }
}

class TheBestRendererEver{
    private _sprite:Laya.Sprite = new Laya.Sprite();
    constructor(){
        Laya.stage.addChild(this._sprite);
        this._sprite.zOrder = 10;
    }

    public render(enemyList:Enemy[]):void{
        this._sprite.graphics.clear();
        enemyList.forEach(ele=>{
            this._sprite.graphics.drawRect(ele.pos.data.x, ele.pos.data.y,
                 ColiEmit.GLOBAL_UNIT_SUBWIDTH, ColiEmit.GLOBAL_UNIT_SUBHEIGHT, "#00ffff", "#00ff00", 2);
        });
    }
}

/**
 * 敌人对象管理中心
 * 
 */
export default class EnemyMgr{
    
    private pathInfo:PathInfo = new PathInfo();//把这个东西改成键值对数据结构
    private renderer:TheBestRendererEver = new TheBestRendererEver();//测试用模块

    private enemyOnStage:Enemy[] = [];//已经处于战场上的敌人
    private enemyOffStage:Enemy[] = [];//进入战场前的敌人
    private enemyDeadZone:Enemy[] = [];//已死亡的敌人

    public matrix:EnemyMatrix;

    constructor(){
        this.pathInfo.add("default", 
            Vec2.listFromList([
                [500,500],
                [39,558],
                [0,0],
                [300,400],
                [900,900],
                [900,0],
                [400,114]
            ])
        );

        

        let e = new Enemy();
        e.pos.setSpeed(5);
        this.enemyToStage(e,this.pathInfo.read("default"));
        console.log(e);

        //上面这些都不重要

        this.matrix = new EnemyMatrix(10,10);//这里应该是两个从数据库中得到的数字
    }

    public update():void{
        this.moveAllEnemy();//移动所有的enemy
        this.renderer.render(this.enemyOnStage);
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

        let enemy = this.enemyOnStage[0];
        enemy.pos.setTarget(new Vec2(Laya.stage.mouseX, Laya.stage.mouseY));
        enemy.pos.move();
        enemy.grid.pos(enemy.pos.data.x, enemy.pos.data.y);
        enemy.grid.event(enemy, Actor.Identity.ENEMY);

        if (Math.random()<10) {
            return;
        }
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

}


