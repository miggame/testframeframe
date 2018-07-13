import { IResourceHelper } from './IResourceHelpr';
import { IObjectPool } from '../objectpool/IObjectPool';
import { ObjectBase } from '../objectpool/ObjectBase';

export class AssetObject extends ObjectBase {

    private _resourceHelp: IResourceHelper;
    private _dependAssets: Array<AssetObject>;
    private _assetPool: IObjectPool<AssetObject>;



    constructor(name: string, target: any, resourceHelp: IResourceHelper, dep: Array<AssetObject>, assetPool: IObjectPool<AssetObject>) {
        super(name, target);
        this._resourceHelp = resourceHelp;
        this._assetPool = assetPool;
        this._dependAssets = dep;
    }

    public onUnSpawn() {
        super.onUnSpawn();
        
        for (let i = 0; i < this._dependAssets.length; ++i) {
            this._assetPool.unSpawn(this._dependAssets[i]);
        }        
    }

    public onRelease() {
        this._resourceHelp.release(this.target);
    }

}
