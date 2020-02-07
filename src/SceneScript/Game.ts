import {ui} from "../ui/layaMaxUI";
import RhodesGame from "../Rhodes_Game/RhodesGame";
import { LinkList } from "../OneFileModules/DataStructure";
import { TTTT } from "../Rhodes_Game/Managers/Actor/ActorModules/OprtAtk";



export default class Game extends ui.GameSceneUI{
    public static UISet:Laya.Sprite;
    public static stage:Laya.Stage;
    private _pause:boolean = false;


    private rhodes:RhodesGame;

    //全局数据（数据库类完成后将被替代）
    public static frameLength:number = 20;//帧长度

    constructor(){
        super();

        let centre = new Laya.EventDispatcher();

        new TTTT();

        



        this.rhodes = new RhodesGame();
        // Laya.timer.loop(20,this,this.update);
    }

    private update():void{
        // this.rhodes.update();
    }
}

