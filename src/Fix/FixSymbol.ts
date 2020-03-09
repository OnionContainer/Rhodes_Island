export interface Symbolized{
    symbol:MySymbol;
}

export class MySymbol{
    private static count:number = 0;

    private _data:number;

    public get data():number{
        return this._data;
    }

    constructor(){
        this._data = MySymbol.count;
        MySymbol.count += 1;
    }
}