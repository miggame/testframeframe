import { BaseClass } from "../base/BaseClass";
import { ILogHelp } from "./ILogHelp";

export enum LOGTYPEDEF {
    /// <summary>
    /// 调试。
    /// </summary>
    Debug,

    /// <summary>
    /// 信息。
    /// </summary>
    Info,

    /// <summary>
    /// 警告。
    /// </summary>
    Warning,

    /// <summary>
    /// 错误。
    /// </summary>
    Error,

    /// <summary>
    /// 严重错误。
    /// </summary>
    Fatal
}

export class LogManager extends BaseClass {
    private _logHelp: ILogHelp;

	/**
	 * 构造函数
	 */
    public constructor() {
        super();
    }

    public addHelp(log: ILogHelp) {
        this._logHelp = log;
    }


    public info(message?: any, ...optionalParams: any[]): void {
        if (this._logHelp)
            this._logHelp.log(LOGTYPEDEF.Info, message, ...optionalParams);
    }

    public warn(message?: any, ...optionalParams: any[]): void {
        if (this._logHelp)
            this._logHelp.log(LOGTYPEDEF.Warning, message, ...optionalParams);
    }

    public error(message?: any, ...optionalParams: any[]): void {
        if (this._logHelp)
            this._logHelp.log(LOGTYPEDEF.Error, message, ...optionalParams);
    }
    
    public debug(message?: any, ...optionalParams: any[]): void {
        if (this._logHelp)
            this._logHelp.log(LOGTYPEDEF.Debug, message, ...optionalParams);
    }

}