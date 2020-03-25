import { ColiEmit } from "./ActorModules/ColiMessage";
import { Profile } from "./ActorModules/Profile";
import { Symbolized, MySymbol } from "../../Fix/FixSymbol";
import { Buff } from "./ActorModules/Buff";
import { AtkStateMachine } from "./Attack/AtkAbst";
import { Damage } from "./ActorModules/Damage";
import { ActorType } from "../../Common/DodKey";
import ActorStateMgr, { ActorStateID } from "./State/ActorStateFsm";
import { ActorBuffMgr } from "./ActorModules/ActorBuffMgr";
import { Transform } from "./ActorModules/Transform";
import { UnitRender } from "./ActorModules/UnitRender";
import { Animation } from "./ActorModules/Animation";
import Route from "./ActorRoute";
import { ActorSkill } from "./ActorModules/ActorSkill";
import { ActorCost } from "./ActorModules/ActorCost";
import { Blocker } from "./Attack/Blocker";
import { Vec2 } from "../../Common/DodMath";
import GameBattle from "../GameBattle";





//基本原则：少用继承，多用组合
export default class Actor implements Symbolized{
    public symbol: MySymbol; //全局唯一的标识数字
    public type: ActorType = ActorType.None; //默认身份为Actor

    public state: ActorStateMgr; //状态机 统筹状态更新

    public profile:Profile;//基本属性与访问方法合集

    public atk: AtkStateMachine;//攻击状态机
    public coliEmit:ColiEmit = new ColiEmit(0,0,ColiEmit.GLOBAL_UNIT_SUBWIDTH,ColiEmit.GLOBAL_UNIT_SUBHEIGHT);//碰撞事件发布者
    public blocker:Blocker;//阻挡模块
    public buffMgr:ActorBuffMgr;
    public transform:Transform;
    public render:UnitRender;
    public animation:Animation;
    public route:Route;//路径对象
    public skill:ActorSkill;
    public cost:ActorCost;

    //TODO：去包一个组件
    // /**
    //  * 目标选择器
    //  */
    // public seeker: Seeker;

    // /*
    // * 当前锁定目标
    // * */
    // public focus: Actor;

    
    constructor(type: ActorType, res: any) {
        res['xxx'] = 1145141919810;

        this.symbol = new MySymbol();
        this.type = type;
        this.state = new ActorStateMgr(this);
        // according to different type, add different components to this actor. 
        this.transform = new Transform(this);
        this.profile = new Profile(this, res['xxx']); 
        this.atk = new AtkStateMachine(this, res['xxx']);
        this.blocker = new Blocker(this, res['xxx']);
        
        this.buffMgr = new ActorBuffMgr(this, res['xxx']);
        
        this.render = new UnitRender(this);
        
        this.animation = new Animation(this, res['xxx']);
 
        if (ActorType.Monster == this.type) {
            this.route = new Route(this, res['xxx']);

        } else if (ActorType.Operator == this.type) {
            this.skill = new ActorSkill(this, res['xxx']);
            
            this.cost = new ActorCost(this);
            
        }
    }

    public awake(): void {
        this.state.runState(ActorStateID.Prepared);
    }

    public update(): void {
        this.state.update();
    }

    public reset(): void {
        // reset clear resource related module
        // this.render.reset();
    }

    /**
     * 将此对象设置到场上
     */
    public setOnMap(pos:Vec2): void {
        //todo: 启动模块
        this.atk.onDeploy(pos);
        this.transform.onDeploy(pos);
        
        this.state.runState(ActorStateID.Born);
        //TODO
    }

    public setPosition(): void {
        //TODO
    }

    /**
     * 攻击一个或多个Actor目标
     * 2020/3/5 攻击逻辑已从事件触发改为直接调用
     * 发起和接收攻击的逻辑均封装在Actor类中
     * @param victim 
     */
    public attack(...victim:Actor[]):void{
        let dmg:Damage = this.profile.generateDamage(this);

        victim.forEach(ele=>{
            this.beAttacked(dmg.copy());
        });
    }
    
    /**
     * 被攻击
     * @param damage 
     */
    public beAttacked(damage:Damage):void{
        //@todo
        //减少生命值
        //发出攻击事件
        //（可能）发出死亡事件
    }
    

}


