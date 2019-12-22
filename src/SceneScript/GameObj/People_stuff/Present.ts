import GameFieldUI from "../GameFieldUI";
import State from "./State";

/**
 * 所有表现类的基类
 */
export default abstract class Present{
    protected _sprite:Laya.Sprite;
    constructor(url:string){
        this._sprite = GameFieldUI.i.Centre.CreateSprite(url);
    }

    public get sprite():Laya.Sprite{
        return this._sprite;
    }

    public perform(state:State):void{
        this._sprite.pos(state.x,state.y);
    }
}