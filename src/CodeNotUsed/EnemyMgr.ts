import {Enemy} from "./Enemy";
import {Vec2} from "../../Common/DodMath";
import Actor from "./Actor";
import {EventCentre} from "../../Event/EventCentre";
import {ArrayAlgo} from "../../Common/DodDataStructure";
import {ColiEmit, ColiReceiver} from "./ActorModules/ColiMessage";
import PerformanceCentre from "../../Common/Graphics/Performance_Module/Performance_Module/PerformanceCentre";
import {OprtSeeker} from "./ActorModules/EnemyAtk";
import {CircleCollisionRange} from "../Collision/CollisionRange";
import {ActorCollider, SimpleActorCollider} from "../Collision/ActorCollisionProcessor";
import Oprt from "./Oprt";


class EnemyMatrix extends ColiReceiver {

    private _matrix: Enemy[][][] = [];

    public checkPoint(x: number, y: number): Enemy[] {
        return this._matrix[x][y];
    }

    constructor(width: number, height: number) {
        super(width, height);
        for (let w = 0; w < width; w += 1) {
            this._matrix[w] = [];
            for (let h = 0; h < height; h += 1) {
                this._matrix[w][h] = [];
                this.setDetection(new Vec2(w, h), Actor.Identity.ENEMY);
            }
        }
    }

    /**
     * Overwrite
     */
    protected onEntre(actor: Enemy, position: Vec2): void {
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
    protected onLeave(actor: Enemy, position: Vec2) {
        ArrayAlgo.removeEle(actor, this._matrix[position.x][position.y]);
    }
}

class PathInfo {
    private _collection: any = {};

    constructor() {
    }

    public add(name: string, path: Vec2[]): boolean {
        if (this._collection[name] !== undefined) {//this path is already defined
            return false;
        }
        this._collection[name] = path;
    }

    public read(name: string): Vec2[] {
        return this._collection[name];
    }
}

class TheBestRendererEver {
    private _sprite: Laya.Sprite = new Laya.Sprite();

    constructor() {
        Laya.stage.addChild(this._sprite);
        this._sprite.zOrder = 10;
    }

    public render(enemyList: Enemy[]): void {
        this._sprite.graphics.clear();
        enemyList.forEach(ele => {
            this._sprite.graphics.drawRect(ele.pos.data.x, ele.pos.data.y,
                ColiEmit.GLOBAL_UNIT_SUBWIDTH, ColiEmit.GLOBAL_UNIT_SUBHEIGHT, "#00ffff", "#00ff00", 2);
        });
    }
}

/**
 * 敌人对象管理中心
 *
 */
export default class EnemyMgr {

    private pathInfo: PathInfo = new PathInfo();//把这个东西改成键值对数据结构
    private renderer: TheBestRendererEver = new TheBestRendererEver();//测试用模块

    private enemyOnStage: Enemy[] = [];//已经处于战场上的敌人
    private enemyPrepared: Enemy[] = [];//进入战场前的敌人
    private deadEnemies: Enemy[] = [];//已死亡的敌人

    public matrix: EnemyMatrix;

    constructor() {
        //@test
        this.pathInfo.add("default",
            Vec2.listFromList([
                [500, 500],
                [39, 558],
                [0, 0],
                [300, 400],
                [900, 900],
                [900, 0],
                [400, 114]
            ])
        );


        let e = new Enemy();

        e.pos.setSpeed(5);
        this.toStage(e, this.pathInfo.read("default"));
        console.log(e);


        //上面这些都不重要

        this.matrix = new EnemyMatrix(10, 10);//这里应该是两个从数据库中得到的数字

        /**
         * by XWV
         */

        //创建干员对象监视器<-创建监视范围碰撞器<-创建碰撞范围
        //碰撞器需要定义与所有者位置绑定的碰撞范围刷新方法、是否应该与另一个碰撞器发生碰撞的判断方法
        e.seeker = new OprtSeeker(
            new class extends SimpleActorCollider {
                refreshCollisionRangeFollowActor() {
                    let actor = <Enemy>this.getActor();
                    this.getCollisionRange().center.x = actor.pos.data.x;
                    this.getCollisionRange().center.y = actor.pos.data.y;
                }

                shouldCollideWith(collider: ActorCollider): boolean {
                    return collider.getActor() instanceof Oprt;
                }
            }(
                e, new CircleCollisionRange(new Vec2(e.pos.data.x, e.pos.data.y), e.profile.attackRangeRadius)
            )
        );


        //@redcall
        PerformanceCentre.Initialization(Laya.stage);
        PerformanceCentre.instance.NewRect(new Vec2(), new Vec2(100, 100), "#ff0000", PerformanceCentre.instance.MainSpr, e);

        EventCentre.instance.on(EventCentre.EType.ENEMY_DEAD, this, this.onEnemyDead);//注册敌人死亡事件
    }

    public update(): void {
        this.moveAllEnemy();//移动所有的enemy
        this.enemyOnStage.forEach(ele=>{

            //ele.skill.update();//更新所有技能实例

            ele.buffList.forEach(buff=>{//更新所有buff实例
                buff.update();
            });

            ele.atkSM.update();//更新所有攻击状态机实例
        });
        
        // this.renderer.render(this.enemyOnStage);
    }

    /**
     * 此函数将一个敌人移入onStage区域
     * enemy只能通过这个函数进入战场
     * @param enemy
     */
    private toStage(enemy: Enemy, path: Vec2[]): void {
        this.enemyOnStage.push(enemy);
        enemy.correspondedPath = path;
        enemy.pathSegCount = 1;
        enemy.pos.data = path[0].clone();
        enemy.pos.setTarget(path[1]);
        // console.log(path[0], enemy.pos.data);
    }

    /**
     * 监听敌人死亡事件的函数
     * @param enemy 
     */
    private onEnemyDead(enemy: Enemy): void {
        enemy.grid.eventLeaveAll(enemy, Actor.Identity.ENEMY);
        const index = this.enemyOnStage.indexOf(enemy);
        if (index === -1) {
            throw new DOMException("Enemy that is not exist is trying to die", "Void Dead Exception");
        }
        this.deadEnemies.push(this.enemyOnStage.splice(index, 1)[0]);
    }

    /**
     * 移动所有在场上的enemy对象
     * 发布移动事件
     */
    private moveAllEnemy(): void {

        let enemy = this.enemyOnStage[0];//选取唯一一个敌人对象
        if (enemy === undefined) {
            return;
        }

        enemy.pos.setTarget(new Vec2(Laya.stage.mouseX, Laya.stage.mouseY));//设定目标（跟随鼠标）
        if (enemy.profile.blocked) {//敌人在不阻挡时不进行移动
            return;
        }

        /**
         * modified by XWV
         */
        enemy.move();

        PerformanceCentre.instance.RepositionSpr(enemy, enemy.pos.data);

        //注意：阻挡逻辑还未写入下面的正式代码
        if (Math.random() < 10) {
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

// class EnemyEServer{
//     private _mgr:EnemyMgr;

//     constructor(mgr:EnemyMgr) {
//         this._mgr = mgr;
//         EventCentre.instance.on(EventCentre.EType.ENEMY_DEAD, this, this.onEnemyDead);
//     }

//     private onEnemyDead(enemy:Enemy) {
//         enemy.grid.eventLeaveAll(enemy, Actor.Identity.ENEMY);
//         this._mgr.
//     }
// }


