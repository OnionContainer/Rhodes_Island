import Actor from "../Actor";
import PerformanceCentre from "../../../Common/Graphics/Performance_Module/PerformanceCentre";
import { Vec2 } from "../../../Common/DodMath";
import FixTime from "../../../Fix/FixTime";

export class UnitRender{

    private _keeper:Actor;


    constructor(keeper:Actor){
        this._keeper = keeper;
    }


    public bornAnimation():void{
        PerformanceCentre.instance.displayActor(this._keeper, this._keeper.transform.pos.data, new Vec2(30,30), "#ff00ff");
        let borntime = FixTime.elapsedTime;
        
        let looper = ()=>{
            if (FixTime.elapsedTime - borntime >= 3) {
                PerformanceCentre.instance.distroyActor(this._keeper, new Vec2());
                Laya.timer.clear(this, looper);
                return;
            }
            PerformanceCentre.instance.editBar(this._keeper, 0, (FixTime.elapsedTime - borntime)/3);
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

