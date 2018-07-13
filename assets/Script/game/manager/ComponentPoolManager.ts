
import { BaseClass } from '../../framework/base/BaseClass';

import { IObjectPool } from '../../framework/objectpool/IObjectPool';
import { ObjectBase } from '../../framework/objectpool/ObjectBase';
import { Game } from '../Game';
export class ComponentPoolManager extends BaseClass {


    private _pool: IObjectPool<ObjectBase>;
    public init() {
        this._pool = this._pool = Game.ObjPoolMgr.createPoolMultiSpawn("Componet Pool", 10000, 4, 3000);
    }

    public getObject(obj: any):any {
        return new obj();
    }


}