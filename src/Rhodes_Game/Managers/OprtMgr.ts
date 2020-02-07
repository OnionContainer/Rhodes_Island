import Oprt from "./Actor/Oprt";

export default class OprtMgr{

    private _OprtList:Oprt[] = [];

    constructor(){
        let oprt:Oprt = new Oprt();
        this._OprtList.push(oprt);
    }

    

    public update():void{
        this._OprtList.forEach(ele=>{
            ele.state.execute(ele);
        });
    }
}