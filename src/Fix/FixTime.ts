export default class FixTime {
    public static readonly frameRate: number = 60;
    public static readonly deltaTime: number = 1 / FixTime.frameRate;
    public static frameCount: number;
    public static elapsedTime: number;//已经过的时间

    public static init(): void {
        this.frameCount = 0;
        this.elapsedTime = 0;
    }

    public static update(): void {
        this.frameCount++;
        this.elapsedTime += this.deltaTime;
        // console.log(this.elapsedTime);
    }
}

export class DodTimer{

    public interval:number = 0;
    
    private _lastAct:number = 0;

    constructor(interval:number = 100){
        this.interval = interval;
    }
    
    public get ready():boolean{
        return FixTime.elapsedTime - this._lastAct >= this.interval;
    }

    public reset():void{
        this._lastAct = FixTime.elapsedTime;
    }
}