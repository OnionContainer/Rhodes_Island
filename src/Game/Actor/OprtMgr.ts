import Oprt from "./Oprt";
import {Vec2} from "../../Common/DodMath";

export default class OprtMgr {

    private _OprtList: Oprt[] = [];

    constructor() {
        let oprt: Oprt = new Oprt();
        oprt.onStage(new Vec2(0, 0));
        this._OprtList.push(oprt);
    }

    /**
     * by XWV
     */
    public getDeploymentOrderNumber(oprt: Oprt): number {
        return this._OprtList.indexOf(oprt);
    }

    /**
     * 部署干员
     * @param place 位置
     * @param symbol 部署干员编号
     */
    public deployOprt(place:Vec2, symbol:number):void{
        //@todo
        //部署干员
    }

    /**
     * 干员死亡事件处理
     * @param symbol 死亡干员编号
     */
    public onOprtDie(symbol:number):void{

        //@todo
        //处理死亡事件
    }

    public update(): void {
        this._OprtList.forEach(ele => {
            //ele.skill.update();//技能实例更新

            ele.buffList.forEach(buff=>{
                buff.update();
            });//增益/减益状态实例更新

            ele.atkSM.update();//攻击状态机更新
        });
    }
}

/**
 * 干员管理类需提供的接口：
 * 
 * 部署干员
 * 
 * 消灭干员
 */