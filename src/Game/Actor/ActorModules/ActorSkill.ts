import Actor from "../Actor";
import { DodTimer } from "../../../Fix/FixTime";
import { AttackInterestedModule, DeployInterestedModule } from "./ModuleInterface";
import { Vec2 } from "../../../Common/DodMath";

enum SkillTiming{
    Automatic,
    Manual,
    OnAtk,
    None
}



export class ActorSkill implements AttackInterestedModule, DeployInterestedModule{

    
    
    删函数(): void {
        throw new Error("Method not implemented.");
    }

    private _timingType:SkillTiming = SkillTiming.Manual;

    private _keeper:Actor;
    private _remainTimer:DodTimer;
    private _remainTime:number = 15;

    private _gainPtFromAtk = false;
    private _gainPtFromTime = true;
    private _gainPtFromDef = false;

    private _maxPt = 39;
    private _initPt = 15;
    private _currentPt = 0;
    private _autoRecoverTimer = new DodTimer(1);

    public get isActivated():boolean{return false;}

    constructor(keeper:Actor, res:any){
        this._keeper = keeper;
        this._remainTimer = new DodTimer(100);
        /*
        //todo: 根据res来修改此对象中的属性
        默认数值是能天使的7级二技能
        */
    }

    public update():void{
        //尝试按时间获取技能点
        if (this._gainPtFromTime && this._autoRecoverTimer.ready) {
            this._currentPt += 1;
        }

        //尝试自动触发
        if (this._timingType == SkillTiming.Automatic && this._currentPt>=this._maxPt) {
            this.activate();
        }
    }

    public beforeAtk(): void {
        // throw new Error("Method not implemented.");
    }

    public afterAtk(): void {
        //do nothing
    }

    public activate():void{
        
    }

    public terminate():void{

    }

    public onDeploy(pos: Vec2): void {
        this._currentPt = this._initPt;
        this._autoRecoverTimer.reset();
        // throw new Error("Method not implemented.");
    }
}