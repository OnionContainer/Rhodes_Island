export default class OnionLog {
    private static _instance: OnionLog;
    public static get Instance(): OnionLog {
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
        OnionLog.Instance._writeToFile(msg);
    }

    private _writeToFile(log: string) {
        //TODO
    }
}