import { LOGTYPEDEF } from "./LogManager";

export interface ILogHelp {
    log(type: LOGTYPEDEF, message?: any, ...optionalParams: any[]): void
}


