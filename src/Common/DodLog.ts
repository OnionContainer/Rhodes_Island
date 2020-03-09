export default class DodLog {
    private static _instance: DodLog;
    public static get Instance(): DodLog {
        return this._instance || (this._instance = new this());
    }

    public static debug(msg: any): void {
        msg = `${msg}`;
        console.debug(msg);
    }

    public static info(msg: any): void {
        msg = `${msg}`;
        console.info(msg);
    }

    public static warn(msg: any): void {
        msg = `${msg}`;
        console.warn(msg);
    }

    public static error(msg: any): void {
        msg = `${msg}`;
        console.error(msg);
        DodLog.Instance._writeToFile(msg);
    }

    private _writeToFile(log: string) {
        //TODO
    }
}