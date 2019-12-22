
export default abstract class State {
    protected _x:number;
    protected _y:number;
    constructor(data:any) {
        
    }

    public get x():number{
        return this._x;
    }

    public get y():number{
        return this._y;
    }
}