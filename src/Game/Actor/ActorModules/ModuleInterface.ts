import { Vec2 } from "../../../Common/DodMath";


/**
 * 对Actor的上场敏感的模块
 * 例子如攻击模块，只有在上场之后才新建Seeker
 * 反例如Render模块，不关心Actor是否上场
 */
export interface DeployInterestedModule{
    
    /**
     * 启动函数
     */
    start(pos:Vec2):void

    /**
     * 停用函数
     */
    terminate():void

    /**
     * 返回是否已启动
     */
    isWorking():boolean
}