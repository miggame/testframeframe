
export interface IResourceHelper {

    //loadBytes(url: string, bind: any, cb: Function): void;
    //readFile(url: string, bind: any, cb: Function): void;
    loadAsset(url: string, bind: any, cb_ok: Function,cb_fail:Function): void;
    release(obj: any): void;
    getDepResource(obj):Array<any>;
}
