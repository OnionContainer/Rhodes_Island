
/**
 * Present：表现类
 */
export default abstract class Present {

    private _sprite:Laya.Sprite
    private _father:Laya.Sprite

    constructor(father:Laya.Sprite,data:any) {
        this._sprite = Laya.Sprite.fromImage(data["img"])
        this._father = father

        this._father.addChild(this._sprite)
    }

    public setSize(size:number):void{
        this._sprite.size(size,size)
    }

    public setPos(x:number,y:number):void{
        this._sprite.pos(x,y)
    }


}