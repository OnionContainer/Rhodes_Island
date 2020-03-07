export default class FixTime {
    public static readonly frameRate: number = 60;
    public static readonly deltaTime: number = 1 / FixTime.frameRate;
    public static frameCount: number;
    public static elapsedTime: number;

    public static init(): void {
        this.frameCount = 0;
        this.elapsedTime = 0;
    }

    public static update(): void {
        this.frameCount++;
        this.elapsedTime += this.deltaTime;
    }
}