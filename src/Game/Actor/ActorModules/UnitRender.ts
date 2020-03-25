import Actor from "../Actor";
import PerformanceCentre from "../../../Common/Graphics/Performance_Module/PerformanceCentre";
import { Vec2 } from "../../../Common/DodMath";
import FixTime from "../../../Fix/FixTime";
import { Symbolized, MySymbol } from "../../../Fix/FixSymbol";

export class UnitRender{

    private _keeper:Actor;


    constructor(keeper:Actor){
        this._keeper = keeper;
    }


    /**
     * 出生动画
     */
    public bornAnimation():void{

        let fakeActor:Symbolized = new class implements Symbolized {
            symbol: MySymbol = new MySymbol();
        }

        PerformanceCentre.instance.displayActor(fakeActor, this._keeper.transform.pos.data, new Vec2(30,30), "#ff00ff");
        let borntime = FixTime.elapsedTime;
        
        let looper = ()=>{
            if (FixTime.elapsedTime - borntime >= 3) {
                PerformanceCentre.instance.distroyActor(fakeActor);
                Laya.timer.clear(this, looper);
                return;
            }
            PerformanceCentre.instance.editBar(fakeActor, 0, (FixTime.elapsedTime - borntime)/3);
        }

        Laya.timer.loop(16, this, looper);
    }

    public deploy():void{
        console.log("Deploy");
        PerformanceCentre.instance.displayActor(this._keeper, this._keeper.transform.pos.data, new Vec2(50,50));
    }

    public move(vec:Vec2):void{
        PerformanceCentre.instance.move(this._keeper, vec);
    }
}

