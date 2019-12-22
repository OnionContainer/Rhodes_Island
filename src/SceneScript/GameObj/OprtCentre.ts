import Oprt from "./People_stuff/Oprt";

export default class OprtCentre{
    public static i:OprtCentre;
    public static init():void{
        this.i = new OprtCentre;
    }

    constructor(){

    }

    private _oprtGroup:Oprt[] = [];

    public createOprt(unitY:number, unitX:number, id:string){
        let oprt:Oprt = new Oprt(unitY, unitX, id);
        this._oprtGroup.push(oprt);
        console.log("New Operator at " + unitY + "_" + unitX);
    }


    public update():void{
        this._oprtGroup.forEach((ele)=>{
            ele.update();
        });
    }

}