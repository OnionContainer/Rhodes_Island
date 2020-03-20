import Actor from "./Actor";
import { Vec2 } from "../../Common/DodMath";

export default class Route {

    private _path:Vec2[] = Vec2.listFromList([
        [500,500],
        [0,0],
        [500,0],
        [0,500]
    ]);
    private _tarCount:number = -1;//目前指向的目标

    constructor(keeper:Actor, res:any){
        //todo: 根据res获取应走的路线
    }

    public currentTarget():Vec2{
        return this._path[this._tarCount];
    }

    public next():boolean{
        if (this._tarCount < this._path.length - 1) {//还有下一项
            this._tarCount += 1;
            return true;
        } else {//没有下一项
            return false;
        }
    }
}