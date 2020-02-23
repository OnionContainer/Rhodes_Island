import Oprt from "./Actor/Oprt";
import { Vec2 } from "../../OneFileModules/MyMath";

export default class OprtMgr{

    private _OprtList:Oprt[] = [];

    constructor(){
        let oprt:Oprt = new Oprt();
        oprt.onStage(new Vec2(0,0));
        this._OprtList.push(oprt);
    }

    

    public update():void{
        this._OprtList.forEach(ele=>{
            ele.state.execute(ele);
        });
    }
}