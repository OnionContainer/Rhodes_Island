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
    onDeploy(pos:Vec2):void

    删函数():void

}

/**
 * 对Actor的攻击行为敏感的模块
 */
export interface AttackInterestedModule{

    beforeAtk():void

    afterAtk():void
}