import GameFieldUI from "../GameFieldUI";

/**
 * 所有表现类的基类
 */
export default abstract class Present{
    protected _sprite:Laya.Sprite;
    constructor(url:string){
        this._sprite = GameFieldUI.i.Centre.CreateEnemy(url);
    }

    public get sprite():Laya.Sprite{
        return this._sprite;
    }
}