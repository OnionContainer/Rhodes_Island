import Actor from "./Actor";
import { OprtATK_SM, EnemySeeker } from "./ActorModules/OprtAtk";
import { Vec2 } from "../../Common/DodMath";
import { Blocker } from "./ActorModules/Blocker";

export default class Oprt extends Actor{
    public state:OprtATK_SM;
    public blocker:Blocker;
    public position:Vec2;

    constructor(){
        super();
        
    }

    /**
     * 这个函数应该在此对象移入战场时被调用
     * @param pos 进战场时的位置
     */
    public onStage(pos:Vec2){
        this.position = pos;
        // console.log(pos);
        this.blocker = new Blocker(this.position,this);
        this.state = new OprtATK_SM(new EnemySeeker(10,10, Vec2.listFromList(//需求数据库*-
            [
                [0,0],
                [1,0],
                [2,0]
            ]
        )));
    }
}