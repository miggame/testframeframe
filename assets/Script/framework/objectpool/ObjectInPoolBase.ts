import { ObjectBase } from './ObjectBase';
import { GlobalApp } from '../GlobleApp';

export class ObjectInPoolBase<T extends ObjectBase> {
    private _obj: T;
    private _spawnCount: number;


    constructor(obj: T, isSpawn: boolean) {
        this._obj = obj;
        this._spawnCount = isSpawn ? 1 : 0;
        if (isSpawn) {
            this._obj.onSpawn();
        }

    }

    public get name(): string {
        return this._obj.name;
    }

    public peek(): T {
        return this._obj;
    }

    public isInUse(): boolean {
        return this._spawnCount > 0;
    }


    public spawn(): T {
        this._spawnCount += 1;
        this._obj.lastTime = Date.now();
        this._obj.onSpawn();
        return this._obj;
    }

    public unSpawn() {
        this._obj.onUnSpawn();
        this._spawnCount -= 1;
        this._obj.lastTime = Date.now();
        if (this._spawnCount < 0) {
            GlobalApp.LogMgr.error("spawnCount < 0 name:" + this._obj.name);
        }
    }

    public release() {
        this._obj.onRelease();
    }


}

