import Actor from "../Actor";
import PerformanceCentre from "../../../Common/Graphics/Performance_Module/PerformanceCentre";
import { Vec2 } from "../../../Common/DodMath";

export class UnitRender{

    private _keeper:Actor;


    constructor(keeper:Actor){
        this._keeper = keeper;
    }

    public deploy():void{
        console.log("Deploy");
        PerformanceCentre.instance.displayActor(this._keeper, this._keeper.transform.pos.data, new Vec2(50,50));
    }

    public move(vec:Vec2):void{
        PerformanceCentre.instance.move(this._keeper, vec);
    }
}