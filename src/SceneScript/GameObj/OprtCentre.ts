import Oprt from "./People_stuff/Oprt";

export default class OprtCentre{
    public static i:OprtCentre;
    public static init():void{
        this.i = new OprtCentre;
    }

    constructor(){

    }

    private _oprtGroup:Oprt[] = [];

    public createOprt(y:number, x:number, id:string){
        console.log("New Operator at " + y + "_" + x);
    }




}