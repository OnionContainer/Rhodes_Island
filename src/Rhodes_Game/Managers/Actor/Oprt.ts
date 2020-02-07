import Actor from "./Actor";
import { OprtStateMachine, EnemySeeker } from "./ActorModules/OprtAtk";
import { Vec2 } from "../../../OneFileModules/MyMath";

export default class Oprt extends Actor{
    public state:OprtStateMachine;

    constructor(){
        super();
        this.state = new OprtStateMachine(new EnemySeeker(10,10, Vec2.listFromList(
            [
                [0,0],
                [1,0],
                [2,0]
            ]
        )));
    }
}