import Oprt from "./Actor/Oprt";

export default class OprtMgr{

    private _OprtList:Oprt[] = [];

    constructor(){

    }

    public update():void{
        this._OprtList.forEach(ele=>{
            ele.state.execute(ele);
        });
    }
}