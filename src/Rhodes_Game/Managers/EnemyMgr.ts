import { Enemy } from "./Actor/Enemy";
import { Vec2 } from "../../OneFileModules/MyMath";
import Actor from "./Actor/Actor";
import { EventCentre } from "../../OneFileModules/EventCentre";
    
    
export default class EnemyMgr{
    
    private pathGroup:Vec2[][] = [
        Vec2.listFromList([
            [500,500],
            [39,558],
            [0,0],
            [300,400]
        ]),
    ];
    private _testLayer:Laya.Sprite;

    private enemyOnStage:Enemy[] = [];
    private enemyOffStage:Enemy[] = [];
    private enemyDeadZone:Enemy[] = [];


    constructor(){
        this._testLayer = Laya.stage.addChild(new Laya.Sprite()) as Laya.Sprite;

        let e = new Enemy();
        e.pos.setSpeed(5);
        this.enemyToStage(e,this.pathGroup[0]);
        console.log(e);
    }

    public update():void{
        this.moveAllEnemy();
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


