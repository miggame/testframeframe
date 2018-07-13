import { ObjectBase } from './ObjectBase';
import { ObjectPoolBase } from './ObjectPoolBase';
import { IObjectPool } from './IObjectPool';
import { ObjectInPoolBase } from './ObjectInPoolBase';
import { GlobalApp } from '../GlobleApp';

export class ObjectPool<T extends ObjectBase> extends ObjectPoolBase implements IObjectPool<T> {

    private _pool: Array<ObjectInPoolBase<T>>;
    private _isAllowMulti: boolean;
    private _expireTime: number;
    private _capacity: number;
    private _autoReleaseTime: number;
    private _autoReleaseTimeTick: number;
    private _poolTemp: Array<T>;
    constructor(name: string, allow: boolean, capacity: number, expireTime: number, autoReleaseTime: number) {
        super(name);
        this._pool = new Array<ObjectInPoolBase<T>>();
        this._isAllowMulti = allow;
        this._capacity = capacity;
        this._expireTime = expireTime;
        this._autoReleaseTime = autoReleaseTime;
        this._poolTemp = new Array<T>();
        this._autoReleaseTimeTick = 0;
    }

    public count() {
        return this._pool.length;
    }

    public allowMultiSpawn(): boolean {
        return this._isAllowMulti;
    }

    public expireTime(): number {
        return this._expireTime;
    }

    public register(obj: T, isSpawn: boolean) {
        this._pool.push(new ObjectInPoolBase<T>(obj, isSpawn));
    }


    public canSpawn(spawnObj: any): boolean {
        for (let i = 0; i < this._pool.length; ++i) {
            let obj = this._pool[i];
            if (obj.peek().target !== spawnObj) {
                continue;
            }
            if (this._isAllowMulti || !obj.isInUse()) {
                return true;
            }
        }

        return false;
    }


    public spawn(spawnObj: any): T {
        for (let i = 0; i < this._pool.length; ++i) {
            let obj = this._pool[i];
            if (obj.peek().target !== spawnObj) {
                continue;
            }
            if (this._isAllowMulti || !obj.isInUse()) {
                return obj.spawn();
            }
        }

        return null;
    }

    public unSpawn(obj: T) {
        this.unSpawnTarget(obj.target);
    }

    public unSpawnByName(name: string) {
        return;
        /*
        for (let i = 0; i < this._pool.length; ++i) {
            let obj = this._pool[i];
            if (obj.peek().name == name) {
                obj.unSpawn();
                break;
            }
        }*/

    }


    public unSpawnTarget(target: any) {
        if (!target) {
            GlobalApp.LogMgr.error("unspawn target error");
        }

        for (let i = 0; i < this._pool.length; ++i) {
            let obj = this._pool[i];
            if (obj.peek().target === target) {
                obj.unSpawn();
                return;
            }
        }
        GlobalApp.LogMgr.error("unspawn target no find taget");

    }

    public release() {
        this.releaseByCount(this._pool.length - this._capacity, this.filter);

    }

    public releaseByCount(count: number, f: Function) {
        if (count < 0) {
            count = 0;
        }

        let canRelease: Array<T> = this.getCanRelease();
        if (canRelease.length <= 0) {
            return;
        }

        let expireTime = Date.now() - this._expireTime;
        let releaseArray: Array<T> = f.apply(this, [canRelease, count, expireTime]);

        if (releaseArray.length <= 0) {
            return;
        }
        this._poolTemp.splice(0);

        let isFind: boolean = false;
        for (let i = 0; i < releaseArray.length; ++i) {
            let obj = releaseArray[i];

            for (let j = this._pool.length - 1; j >= 0; --j) {
                let rOjb = this._pool[j];
                if (rOjb.peek().target == obj.target) {
                    isFind = true;
                    rOjb.release();
                    this._pool.splice(j, 1);
                    break;
                }
            }
        }

        if (!isFind) {
            GlobalApp.LogMgr.error("release obj error");
        }

    }

    private getCanRelease(): Array<T> {
        this._poolTemp.splice(0);
        for (let i = 0; i < this._pool.length; ++i) {
            let obj = this._pool[i];
            if (!obj.isInUse()) {
                this._poolTemp.push(obj.peek());
            }
        }
        return this._poolTemp;
    }

    private filter(can: Array<T>, count: number, time: number): Array<T> {
        let t: Array<T> = new Array<T>();
        for (let i = 0; i < can.length; ++i) {
            let obj = can[i];
            if (obj.lastTime < time) {
                t.push(obj);
            }
        }
        return t;
    }




    public update(delta: number, realDelta: number): void {
        this._autoReleaseTimeTick += realDelta;
        if (this._autoReleaseTimeTick > this._autoReleaseTime) {
            this._autoReleaseTimeTick -= this._autoReleaseTime;
            this.release();
        }
    }

    public shutDown(): void {
        for (let j = this._pool.length - 1; j >= 0; --j) {
            let rOjb = this._pool[j];
            rOjb.release();
            this._pool.splice(j, 1);
            break;
        }
    }


}

