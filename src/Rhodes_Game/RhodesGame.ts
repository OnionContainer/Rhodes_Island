import OprtMgr from "./Managers/OprtMgr";
// import EnemyMgr from "./Managers/EnemyMgr";
import {Vec2} from "../OneFileModules/MyMath";
import Actor from "./Managers/Actor/Actor";
import {EventCentre} from "../OneFileModules/EventCentre";
import {ColiEmit, ColiReceiver} from "./Managers/Actor/ActorModules/ColiMessage";
import {Enemy} from "./Managers/Actor/Enemy";
import {ArrayAlgo} from "../OneFileModules/DataStructure";
import {Damage} from "./Managers/Actor/ActorModules/Damage";
import Oprt from "./Managers/Actor/Oprt";
import EnemyMgr from "./Managers/EnemyMgr";
import {ActorCollisionProcessor} from "./Managers/Actor/ActorModules/ActorCollisionProcessor";


class ColiReporter extends ColiReceiver {
    public inList: Vec2[] = [];
    public layer: Laya.Sprite = new Laya.Sprite();

    constructor() {
        super(10, 10);
        for (let w = 0; w < 10; w += 1) {
            for (let h = 0; h < 10; h += 1) {
                this.setDetection(new Vec2(w, h), Actor.Identity.ENEMY);
            }
        }

        Laya.stage.addChild(this.layer);
        this.layer.zOrder = -10;
    }

    protected onEntre(actor: Actor, pos: Vec2): void {
        // console.log("Enter" + pos.x + "|" + pos.y);
        this.inList.push(pos);
        this.render();
    }

    protected onLeave(actor: Actor, pos: Vec2): void {
        const index = ArrayAlgo.findEle(pos, this.inList);
        if (index !== -1) {
            this.inList.splice(index, 1);
        }
        this.render();
        // console.log("Leave" + pos.x + "|" + pos.y);
    }

    public render(): void {
        this.layer.graphics.clear();
        this.inList.forEach(ele => {
            this.layer.graphics.drawRect(ele.x * ColiEmit.GLOBAL_UNIT_WIDTH + 1,
                ele.y * ColiEmit.GLOBAL_UNIT_HEIGHT + 1,
                ColiEmit.GLOBAL_UNIT_WIDTH - 2,
                ColiEmit.GLOBAL_UNIT_HEIGHT - 2,
                "#ff0000"
            );
        });
    }
}


/**
 * 这是游戏本体
 * 说一些Rhodes_Game文件夹下的注释规则，方便以后ctrl+f
 *
 * 1.//@todo 标注需要完善的部分
 *
 * 2.//@tofix 标注已知有问题的部分
 *
 * 3.//@test 标注仅供测试使用的部分
 *
 * 3.//@redcall 标注调用渲染模块的部分
 *
 */
export default class RhodesGame {

    /**
     * modified by XWV
     */
    private static instance: RhodesGame;

    public actorEServer: ActorEServer;
    public oprtMgr: OprtMgr;
    public enemyMgr: EnemyMgr;

    /**
     * by XWV
     */
    public readonly actorCollisionProcessor: ActorCollisionProcessor = new ActorCollisionProcessor();

    private reporter;

    static getInstance(): RhodesGame {
        if (!RhodesGame.instance) {
            RhodesGame.instance = new RhodesGame();
        }
        return RhodesGame.instance
    }

    /**
     * modified by XWV
     */
    private constructor() {

        // RhodesGame.instance = this;
        EventCentre.init();
        this.actorEServer = new ActorEServer();
        this.reporter = new ColiReporter();//@test
        console.log(this.reporter);
        //init stage

        this.oprtMgr = new OprtMgr();
        this.enemyMgr = new EnemyMgr();

        Laya.timer.loop(20, this, this.update);

    }

    public update(): void {
        this.enemyMgr.update();
        this.oprtMgr.update();
    }


}

/**
 * actor事件处理中心
 * 为什么是actor事件处理中心呢？明明也有可能处理别的事件
 * 到时候也不会写一个别的类
 * 应该叫GameEServer啥的
 * 但是反正现在先跑起来再说吧
 */
export class ActorEServer {
    constructor() {
        EventCentre.instance.on(EventCentre.EType.ATTACK, this, this.onAttack);
    }

    /**
     * 伤害处理逻辑
     * @param from
     * @param to
     */
    public onAttack(from: Actor, to: Actor) {
        let damage: Damage = new Damage(from.profile.attackPower);
        from.buffList.forEach(e => {
            damage = e.launchDamage(damage);
        });
        to.buffList.forEach(e => {
            damage = e.recieveDamage(damage);
        });
        const value = damage.finalValue();
        to.profile.hitPoint -= value;

        //@test
        console.log(`${(to instanceof Oprt) ? "Oprt" : "Enemy"} is damaged, cur hp: ${to.profile.hitPoint}/${to.profile.maxHitPoint}`);
        if (to.profile.hitPoint <= 0) {
            console.log(typeof to + "dead");
            const eType: string = to instanceof Oprt ? EventCentre.EType.OPRT_DEAD : EventCentre.EType.ENEMY_DEAD;
            EventCentre.instance.event(eType, to);
        }
        //Redcall
        //@todo 绘图逻辑

    }


}