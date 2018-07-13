import { ObjectPoolBase } from './ObjectPoolBase';
import { ObjectBase } from './ObjectBase';
import { ObjectPool } from './ObjectPool';
import { GlobalApp } from '../GlobleApp';
import { BaseClass } from '../base/BaseClass';

export class OjbectPoolManager extends BaseClass {

    private _pool: any;

    constructor() {
        super();
        this._pool = {};
    }


    public onUpdate(delta: number, realDelta: number): void {
        for (let k in this._pool) {
            let obj = this._pool[k];
            obj.update(delta, realDelta);
        }
    }

    public shutDown(): void {
        for (let k in this._pool) {
            let obj: ObjectPoolBase = <ObjectPoolBase>this._pool[k];
            obj.shutDown();
        }
    }

    public release(): void {

    }

    public createPoolMultiSpawn<T extends ObjectBase>(name: string, expireTime: number, capacity: number, autoReleaseTime: number): ObjectPool<T> {
        if (this.hasObjPool(name)) {
            GlobalApp.LogMgr.error("has create this pool:" + name);
        }

        let pool = new ObjectPool<T>(name, true, capacity, expireTime, autoReleaseTime);
        this._pool[name] = pool;
        return pool;
    }

    public hasObjPool(name: string): boolean {
        let isFind: boolean = false;
        for (let k in this._pool) {
            let obj: ObjectPoolBase = <ObjectPoolBase>this._pool[k];
            if (k == name) {
                isFind = true;
                break;
            }
        }
        return isFind;
    }


}