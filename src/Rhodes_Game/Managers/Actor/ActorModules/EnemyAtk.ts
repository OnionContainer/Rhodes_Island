import Oprt from "../Oprt";
import {ActorCollider} from "../../ActorCollisionProcessor";
import {Seeker} from "./AtkAbst";
import RhodesGame from "../../../RhodesGame";
import {Enemy} from "../Enemy";


/**
 * by XWV
 */
export class OprtSeeker implements Seeker {

    private collider: ActorCollider;

    constructor(collider: ActorCollider) {
        this.collider = collider;
    }

    public getCollider(): ActorCollider {
        return this.collider;
    }

    public resetCollider(collider: ActorCollider) {
        let processor = RhodesGame.Instance.actorCollisionProcessor;
        if (this.collider) {
            processor.unregisterCollider(this.collider);
        }
        this.collider = collider;
        processor.registerCollider(collider)
    }

    getFocus(): Oprt {
        let focusList = this.getFocusList(1);
        return focusList.length < 1 ? null : focusList[0];
    }

    getFocusList(count: number): Oprt[] {
        let result: Oprt[] = [];
        let actor = this.collider.getActor();
        if (actor instanceof Enemy) {
            if (actor.profile.blocker) {
                result.push(actor.profile.blocker);
            }
        }

        let captureList = this.getCaptureList();
        captureList.sort(((a, b): number => {
            //按优先级倒序排列
            return -OprtSeeker.comparePriorityLevel(a, b);
        }));

        result.forEach(function (e) {
            if (captureList.indexOf(e)) {
                captureList.splice(captureList.indexOf(e), 1);
            }
        });
        result.push(...captureList);

        return result.slice(0, count);
    }

    private static comparePriorityLevel(oprtA: Oprt, oprtB: Oprt) {

        //仇恨等级差，等级越高越容易被攻击
        let dHateLevel = oprtA.profile.hateLevel - oprtB.profile.hateLevel;

        if (dHateLevel == 0) {  //仇恨等级相等
            let oprtMgr = RhodesGame.Instance.oprtMgr;

            //部署序号差，部署顺序越靠后序号值越大，越容易被攻击
            return oprtMgr.getDeploymentOrderNumber(oprtA) - oprtMgr.getDeploymentOrderNumber(oprtB);
        } else {

            return dHateLevel;
        }

        //当A优先级大于B，返回值为正，反之则为负
    }

    getCaptureList(): Oprt[] {
        let result: Oprt[] = [];
        this.collider.getCollidingList().forEach(function (e) {
            let actor = e.getActor();
            if (actor instanceof Oprt) {
                result.push(actor);
            }
        });
        return result;
    }

    followActor() {
        this.collider.refreshCollisionRangeFollowActor();
    }

}