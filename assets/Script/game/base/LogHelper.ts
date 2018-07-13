import { ILogHelp } from '../../framework/log/ILogHelp';
import { LOGTYPEDEF } from '../../framework/log/LogManager';

export class LogHelper implements ILogHelp {
    public log(type: LOGTYPEDEF, message?: any, ...optionalParams: any[]): void {
        //todo 简单处理
        console.log(message);
    }
}