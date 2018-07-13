import { LoadResourceAgent } from "./LoadResourceAgent";
import { LoadAssetCallBacks } from "./LoadAssetCallBacks";
import { LoadResourceTaskBase } from "./LoadResourceTaskBase";

export class LoadAssetTask extends LoadResourceTaskBase {
    private _cb: LoadAssetCallBacks;
    constructor(name: string, cb: LoadAssetCallBacks, userData: any) {
        super(name, userData);
        this._cb = cb;
    }


    public onLoadAssetOK(agent: LoadResourceAgent, asset: any): void {
        super.onLoadAssetOK(agent, asset);
        if (this._cb._loadOK) {
            this._cb._loadOK.call(this._cb._bind, [this.assetName, asset, this.userData]);
        }
    }

    public onLoadAssetFail(agent: LoadResourceAgent, err: string): void {
        super.onLoadAssetFail(agent, err);
        if (this._cb._loadFail) {
            this._cb._loadFail.call(this._cb._bind, [this.assetName, err, this.userData]);
        }
    }

}
