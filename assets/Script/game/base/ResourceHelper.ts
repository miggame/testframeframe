import { IResourceHelper } from '../../framework/resource/IResourceHelpr';
import { Game } from '../Game';



export class ResourceHelper implements IResourceHelper {

    private getDepArray(obj: any, resArray: any): boolean {
        let ret: boolean = false;
        let t = cc.loader.getDependsRecursively(obj);
        if (t.length == 2) {

            let array = new Array<any>();
            array.push(obj);
            resArray[obj] = array;
            return true;
        }

        let tArray = new Array<any>();
        resArray[obj] = tArray;
        for (let i = 0; i < t.length; ++i) {
            let resT = cc.loader.getRes(t[i]);

            tArray.push(resT);
        }

        return ret;
    }

    public getDepResource(obj): Array<any> {
        let ret = new Array<any>();

        return ret;
    }
    /**
     * todo 不允许多层嵌套问题
     * @param url 
     * @param bind 
     * @param cb_ok 
     * @param cb_fail 
     */
    public loadAsset(url: string, bind: any, cb_ok: Function, cb_fail: Function): void {
        cc.loader.loadRes(url, (err: Error, resource: any) => {
            if (!err) {
                let t = cc.loader.getDependsRecursively(resource);
                let ret = new Array<any>();
                for (let i = 0; i < t.length; ++i) {
                    let resT = cc.loader.getRes(t[i]);
                    if (resT) {
                        ret.push(resT);
                    }
                }

                cb_ok.call(bind, [resource, ret]);
            }
            else {
                cb_fail.call(bind, [err.message]);
            }
        });
    }

    public release(obj: any): void {
        Game.LogMgr.info("release taget:");
        cc.loader.release(obj);

    }

}