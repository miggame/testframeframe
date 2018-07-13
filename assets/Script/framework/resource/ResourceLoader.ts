import { LoadAssetCallBacks } from "./LoadAssetCallBacks";
import { LoadResourceAgent } from "./LoadResourceAgent";
import { AssetObject } from "./AssetOjbect";
import { ILoadResourceAgentHelper } from "./ILoadResourceAgentHelper";
import { IResourceHelper } from "./IResourceHelpr";
import { OjbectPoolManager } from "../objectpool/ObjectPoolManager";
import { TaskPool } from "../base/Task/TaskPool";
import { LoadResourceTaskBase } from "./LoadResourceTaskBase";
import { ResourceManager } from "./ResourceManager";
import { IObjectPool } from "../objectpool/IObjectPool";
import { LoadAssetTask } from "./LoadAssetTask";


export class ResourceLoader {

    private _resourceManager: ResourceManager;
    private _taskPool: TaskPool<LoadResourceTaskBase>;
    private _assetPool: IObjectPool<AssetObject>;

    constructor(resMgr: ResourceManager) {
        this._resourceManager = resMgr;
        this._taskPool = new TaskPool<LoadResourceTaskBase>();
        this._assetPool = null;
    }


    public get totalAgentCount(): number {
        return this._taskPool.totalCount;
    }

    public get freeAgentCount(): number {
        return this._taskPool.freeCount;
    }

    public get workAgentCount(): number {
        return this._taskPool.workCount;
    }

    public update(delta: number, realDelta: number): void {
        this._taskPool.update(delta, realDelta);
    }

    public shutdown() {
        this._taskPool.shutdown();
    }

    public setObjectPoolManager(objectPoolManager: OjbectPoolManager) {
        this._assetPool = objectPoolManager.createPoolMultiSpawn<AssetObject>("Asset Pool", 2000, 10, 2000);
    }

    public addLoadResourceAgentHelper(agentHelper: ILoadResourceAgentHelper, resourceHelper: IResourceHelper): void {
        let agent = new LoadResourceAgent(agentHelper, resourceHelper, this._assetPool, this);

        this._taskPool.addAgent(agent);
    }

    public loadAsset(name: string, cb: LoadAssetCallBacks, userDate: any):LoadAssetTask {
        let task = new LoadAssetTask(name, cb, userDate);
        this._taskPool.addTask(task);
        return task;
    }

    public cancelLoadTask(task:LoadAssetTask)
    {
        this._taskPool.removeTask(task.getTaskID());
    }

    public unLoadAsset(obj: any) {
        this._assetPool.unSpawn(obj);
    }

    public unLoadAssetByName(name: string) {
        this._assetPool.unSpawnByName(name);
    }

    public unLoadAssetTarget(obj: any) {
        this._assetPool.unSpawnTarget(obj);
    }
}
