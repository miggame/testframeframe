import { OjbectPoolManager } from "../objectpool/ObjectPoolManager";
import { IResourceHelper } from "./IResourceHelpr";
import { ILoadResourceAgentHelper } from "./ILoadResourceAgentHelper";
import { LoadAssetCallBacks } from "./LoadAssetCallBacks";
import { ResourceLoader } from "./ResourceLoader";
import { IResourceManager } from "./IResourceManager";
import { BaseClass } from "../base/BaseClass";

import { LoadAssetTask } from "./LoadAssetTask";

export class ResourceManager extends BaseClass implements IResourceManager {
    private _resourceLoader: ResourceLoader;
    private _resourceHelper: IResourceHelper;


    constructor() {
        super();
        this._resourceLoader = new ResourceLoader(this);
        this._resourceHelper = null;
    }

    public onUpdate(delta: number, realDelta: number): void {
        this._resourceLoader.update(delta, realDelta);
    }

    public shutdown(): void {
        this._resourceLoader.shutdown();
    }

    public setObjectPoolManager(objectPoolManager: OjbectPoolManager) {
        this._resourceLoader.setObjectPoolManager(objectPoolManager);
    }

    public setResourceHelper(helper: IResourceHelper) {
        this._resourceHelper = helper;
    }

    public addLoadResourceAgentHelper(agentHelper: ILoadResourceAgentHelper): void {
        this._resourceLoader.addLoadResourceAgentHelper(agentHelper, this._resourceHelper);
    }

    public loadAsset(name: string, cb: LoadAssetCallBacks, userData: any): LoadAssetTask {
        return this._resourceLoader.loadAsset(name, cb, userData);
    }

    private unLoadAsset(obj: any) {
        this._resourceLoader.unLoadAsset(obj);
    }

    //todo 暂时屏蔽此功能，会出现问题
    private cancelLoadTask(task: LoadAssetTask) {
        if (task)
            this._resourceLoader.cancelLoadTask(task);
    }
    //todo 屏蔽，有问题
    private unLoadAssetByName(name: string) {
        this._resourceLoader.unLoadAssetByName(name);
    }

    public unLoadAssetTarget(obj: any) {
        this._resourceLoader.unLoadAssetTarget(obj);
    }

}
