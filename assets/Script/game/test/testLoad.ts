import { Game } from "../Game";
import { LoadAssetCallBacks } from "../../framework/resource/LoadAssetCallBacks";
import { ConfigManager } from '../manager/ConfigManager';


export class testLoad {
    public load() {
        //Game.ResourceMgr.loadAsset("prefab/testfab", new LoadAssetCallBacks(this, this.onOK, this.onFail), null);
        new ConfigManager().init();
    }


    public onOK(e: any) {
        let c = cc.instantiate(e[1]);

        //Game.ResourceMgr.unLoadAssetTarget(e[1]);
        console.log("dd");
    }
    public onFail(e: any) {
        console.log("dd2");
    }


}