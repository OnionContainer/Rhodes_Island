import Oprt from "./People_stuff/Oprt";
import EventCentre from "../../Toybox/EventCentre";

export default class OprtCentre{
    public static i:OprtCentre;
    public static init():void{
        this.i = new OprtCentre;
    }

    constructor(){
        EventCentre.instance.on(EventCentre.FieldName.GLOBAL, EventCentre.TypeName.OPRT_DEAD, this, this.onOprtDead);
    }

    private onOprtDead(oprt:Oprt):void{
        for (let i = 0; i < this._oprtGroup.length; i += 1) {
            if (this._oprtGroup[i] === oprt) {
                this._oprtGroup.splice(i,1);
                break;
            }
        }
    }

    private _oprtGroup:Oprt[] = [];

    public createOprt(unitY:number, unitX:number, id:string, rotate:number = 0){
        let oprt:Oprt = new Oprt(unitY, unitX, id, rotate);
        this._oprtGroup.push(oprt);
        console.log("New Operator at " + unitY + "_" + unitX);
    }


    public update():void{
        this._oprtGroup.forEach((ele)=>{
            ele.update();
        });
    }

}