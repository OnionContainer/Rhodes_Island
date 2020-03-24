import Actor from "../Actor/Actor";
import {MySymbol} from "../../Fix/FixSymbol";
import {CircleCollisionRange} from "./CollisionRange";


/**
 * 碰撞处理器，该类维护一个Map，Map记录所有需要进行碰撞处理的碰撞器，Map用碰撞器的唯一标识作为键以避免重复记录。
 *
 * 该类提供一个recalculate方法用于重新计算碰撞情况，对于Map中的每个处理对象，该方法计算其与Map中的所有其他对象
 * 的重叠情况，并将这些重叠的其他对象以列表的形式传递给该处理对象。
 *
 * by XWV
 */
export class ActorCollisionProcessor {

    private _colliderMap: { [key: number]: ActorCollider } = {};

    public registerCollider(collider: ActorCollider) {
        this._colliderMap[collider.symbol.data] = collider;
    }

    public unregisterCollider(collider: ActorCollider) {
        delete this._colliderMap[collider.symbol.data];
    }

    public update() {
        for (let i in this._colliderMap) {
            let targetCollider = this._colliderMap[i];
            let collidingList = [];
            for (let j in this._colliderMap) {
                let collider = this._colliderMap[j];
                if (collider == targetCollider) {
                    continue;
                }
                if (targetCollider.shouldCollideWith(collider) && targetCollider.getCollisionRange().isCoincideWithRange(collider.getCollisionRange())) {
                    collidingList.push(collider);
                }
            }
            targetCollider.onCollidingListRefresh(collidingList);
        }
    }

}


export abstract class ActorCollider {
    //唯一标识
    public readonly symbol: MySymbol = new MySymbol();

    //获取碰撞范围
    abstract getCollisionRange(): CircleCollisionRange ;

    /**
     * 重设碰撞范围
     * @param range 新的碰撞范围
     */
    abstract setCollisionRange(range: CircleCollisionRange);

    //获取碰撞器的所有者
    abstract getActor(): Actor;

    /**
     * 碰撞列表需要刷新
     * @param collidingList 新的碰撞列表
     * */
    abstract onCollidingListRefresh(collidingList: ActorCollider[]);

    /**
     * 是否应该与指定碰撞器发生碰撞
     * @param collider 另一个碰撞器
     * */
    abstract shouldCollideWith(collider: ActorCollider): boolean;

    /**
     * 当前碰撞列表
     * */
    abstract getCollidingList(): ActorCollider[];

    /**
     * 刷新碰撞范围，使其跟随所有者移动
     * */
    abstract refreshCollisionRangeFollowActor();

}

export abstract class SimpleActorCollider extends ActorCollider {

    private collidingList: ActorCollider[] = [];
    private readonly actor: Actor;
    private range: CircleCollisionRange;

    constructor(actor: Actor, range: CircleCollisionRange) {
        super();
        this.actor = actor;
        this.range = range;
    }


    getCollisionRange(): CircleCollisionRange {
        return this.range;
    }

    setCollisionRange(range: CircleCollisionRange) {
        this.range = range;
    }

    getActor(): Actor {
        return this.actor;
    }

    getCollidingList(): ActorCollider[] {
        return this.collidingList;
    }

    onCollidingListRefresh(collidingList: ActorCollider[]) {
        this.collidingList = collidingList;
    }


}