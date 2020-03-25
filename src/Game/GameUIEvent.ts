import RhodesGame from "./RhodesGame";
import PerformanceCentre from "../Common/Graphics/Performance_Module/PerformanceCentre";
import { Vec2 } from "../Common/DodMath";
import { Symbolized, MySymbol } from "../Fix/FixSymbol";
import { ColiEmit } from "./Actor/ActorModules/ColiMessage";

export default class GameUIEvent {

    public static fuck:number = 1;

    private _cancleList:Function[] = [];//todo

    private idiots:Idiot[] = [];

    constructor() {
        this._registerEvent();
    }

    private _registerEvent(): void {
        PerformanceCentre.instance.mainSpr.on(Laya.Event.CLICK, this, ()=>{
            let pos = new Vec2(
                PerformanceCentre.instance.mainSpr.mouseX,
                PerformanceCentre.instance.mainSpr.mouseY
            ).adsorp(ColiEmit.GLOBAL_UNIT_WIDTH);
            RhodesGame.Instance.battle.actorMgr.deployOprt(GameUIEvent.fuck,pos);
        });

        Laya.timer.loop(100, this, ()=>{
            let pos = new Vec2(
                PerformanceCentre.instance.mainSpr.mouseX,
                PerformanceCentre.instance.mainSpr.mouseY
            );
            // PerformanceCentre.instance.
            // console.log(pos);
        });
        
        // Laya.timer.loop(200,this,this.update);

        //TODO 
        //@阿葱 在这个类里注册所有战斗模块所需接收的UI事件
        //@example
        //eventcenter.on(eventcenter.gamepause, this, this._onGamePause);
    }

    /**
     * UI事件处理类基本完全通过事件与外界进行交互，没有进行帧循环的必要
     * 此处的update函数仅用于开发便利
     */
    public update():void{
        while (this.idiots.length < RhodesGame.Instance.battle.actorMgr.sideBar.length) {
            let idi = new Idiot();
            this.idiots.push(idi);
            PerformanceCentre.instance.displayActor(idi, new Vec2(50 + 100*idi.nnum, 600), new Vec2(100,100));
        }

        while (this.idiots.length > RhodesGame.Instance.battle.actorMgr.sideBar.length) {
            PerformanceCentre.instance.distroyActor(this.idiots.pop());
        }

        this.idiots.forEach((idiot, index)=>{
            PerformanceCentre.instance.attachButton(idiot, 1, ()=>{
                GameUIEvent.fuck = RhodesGame.Instance.battle.actorMgr.sideBar[index].symbol.data;
            });
        });
    }

    //@example
    // private _onGamePause(): void {
    //     RhodesGame.Instance.battle.level.pauseGame();
    // }
}

class Idiot implements Symbolized {

    public static num = 0;

    symbol: MySymbol = new MySymbol();

    public nnum = 0;

    constructor(){
        this.nnum = Idiot.num;
        this.nnum += 1;
    }
}