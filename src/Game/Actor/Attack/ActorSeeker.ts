import Actor from "../Actor";
import { Vec2 } from "../../../Common/DodMath";

export interface Seeker {
    /**
     * @return 返回监控区域内攻击优先级最高的对象，区域内无可用对象时返回null
     */
    getFocus(): Actor

    /**
     * @param count 最多返回的数量
     * @return 尽可能返回不多于count个的优先级最高的对象，无可用对象时返回空列表
     */
    getFocusList(count: number): Actor[]

    /**
     * 返回监控区域内所有对象
     */
    getCaptureList(): Actor[]


    followActor():Actor

    /**
     * 关注的敌人是否已修改
     */
    focusChanged():boolean

    update():void

    /**
     * 重设中心点位置
     */
    reposition(pos:Vec2):void
}

