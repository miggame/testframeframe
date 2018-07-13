import { AssetObject } from "./AssetOjbect";
import { LoadResourceTaskBase } from "./LoadResourceTaskBase";

import { ILoadResourceAgentHelper } from "./ILoadResourceAgentHelper";
import { IResourceHelper } from "./IResourceHelpr";
import { IObjectPool } from "../objectpool/IObjectPool";
import { ResourceLoader } from "./ResourceLoader";
import { ITaskAgent } from "../base/Task/ITaskAgent";




export enum WAITINGTYPE {
    WAITINGTYPE_NONE,
    WAITINGTYPE_WAITASSET,
    WAITINGTYPE_WAITRESOURCE,
}

export class LoadResourceAgent implements ITaskAgent<LoadResourceTaskBase> {

    private static sLoadingAssetName = {}; //全局查找pool

    private _agentHelper: ILoadResourceAgentHelper;
    private _resourceHelper: IResourceHelper;
    private _assetPool: IObjectPool<AssetObject>;
    private _resLoader: ResourceLoader;
    private _task: LoadResourceTaskBase;
    private _waitingType: WAITINGTYPE;
    private _loadingAsset: boolean;

    constructor(loadAgentHelper: ILoadResourceAgentHelper, resourceHelper: IResourceHelper, assetPool: IObjectPool<AssetObject>, resLoader: ResourceLoader) {
        this._agentHelper = loadAgentHelper;
        this._resourceHelper = resourceHelper;
        this._assetPool = assetPool;
        this._resLoader = resLoader;
        this._waitingType = WAITINGTYPE.WAITINGTYPE_NONE;
        this._task = null;
        this._loadingAsset = false;
    }

    public init(): void {

    }

    public getTask(): LoadResourceTaskBase {
        return this._task;
    }

    public update(delta: number, realDelta: number): void {
        if (this._waitingType == WAITINGTYPE.WAITINGTYPE_NONE) {
            return;
        }

        if (this._waitingType == WAITINGTYPE.WAITINGTYPE_WAITASSET) {

            if (this.isLoading(this._task.assetName)) {
                return;
            }
            this._waitingType = WAITINGTYPE.WAITINGTYPE_NONE;
            let asset = this._assetPool.spawn(this._task.assetName);
            if (!asset) {
                this.tryLoadAsset();
                return;
            }

            this.onAsssetObjectReady(asset);
            return;
        }



    }

    public shutdown(): void {
        this.reset();

    }

    public start(task: LoadResourceTaskBase): void {
        this._task = task;
        this._task.startTime = Date.now();
        if (this.isLoading(this._task.assetName)) {
            this._waitingType = WAITINGTYPE.WAITINGTYPE_WAITASSET;
            return;
        }
        this.tryLoadAsset();
    }

    public reset(): void {
        this._agentHelper.reset();
        this._task = null;
        this._waitingType = WAITINGTYPE.WAITINGTYPE_NONE;
        this._loadingAsset = false;
    }


    private tryLoadAsset() {
        let asset: AssetObject = this._assetPool.spawn(this._task.assetName);
        if (asset != null) {
            this.onAsssetObjectReady(asset);
        }

        this._loadingAsset = true;
        LoadResourceAgent.sLoadingAssetName[this._task.assetName] = this._task.assetName;
        this._waitingType = WAITINGTYPE.WAITINGTYPE_WAITASSET;
        this._resourceHelper.loadAsset(this._task.assetName, this, this.onLoadResourceAgentHelperLoadComplete, this.onLoadResourceAgentHelperLoadFail);

    }

    private onAsssetObjectReady(obj: AssetObject) {
        this._agentHelper.reset();
        let assetObj = obj.target;
        this._task.onLoadAssetOK(this, assetObj);
        this._task.done = true;
    }

    private isLoading(name: string): boolean {
        if (LoadResourceAgent.sLoadingAssetName[name] == null || LoadResourceAgent.sLoadingAssetName[name] == undefined) {
            return false;
        }

        return true;
    }

    private onError(err: string) {
        this._agentHelper.reset();
        this._task.onLoadAssetFail(this, err);
        if (this._loadingAsset) {
            this._loadingAsset = false;
            LoadResourceAgent.sLoadingAssetName[this._task.assetName] = null;
        }

        this._task.done = true;

    }

    private onLoadResourceAgentHelperLoadComplete(e: any) {
        let assetObject = null;
        let assetArray: Array<AssetObject> = new Array<AssetObject>();
        //依赖处理
        for (let i = 0; i < e[1].length; ++i) {
            let t = e[1][i];
            let obj = null;
            if (t === e[0]) {
                obj = new AssetObject(this._task.assetName, t, this._resourceHelper, assetArray, this._assetPool);
                
                this._assetPool.register(obj, true);
                assetObject = obj;
            }
            else {
                if (this._assetPool.canSpawn(t)) {
                    this._assetPool.spawn(t);
                }
                else {
                    obj = new AssetObject(this._task.assetName, t, this._resourceHelper, new Array<AssetObject>(), this._assetPool);
                    assetArray.push(obj);
                    this._assetPool.register(obj, true);
                }
            }
        }

        this._loadingAsset = false;
        LoadResourceAgent.sLoadingAssetName[this._task.assetName] = null;
        this.onAsssetObjectReady(assetObject);
    }



    private onLoadResourceAgentHelperLoadFail(e: any) {
        this.onError(e[0]);
    }

}
