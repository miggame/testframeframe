import { entity } from "./Entity";
import { BaseClass } from '../base/BaseClass';


export class EntityManager extends BaseClass {

    private runNum: number;
    constructor() {
        super();
        this.pool = {};
        this.runNum = 1000;
    }

    private pool: any;

    public createEntity(): entity {
        let t: entity = new entity();
        t.id = this.runNum++;
        t.init();
        return t;
    }

    public addEntity(e: entity): void {
        this.pool[e.id] = e;
    }

    public getPool(): any {
        return this.pool;
    }

    public getEntityByID(id: number): entity {
        let t: entity;
        t = this.pool[id];
        return t;
    }

    public removeEntity(e: entity) {
        this.removeEntityByid(e.id);
    }
    
    public removeEntityByid(id: number) {
        this.pool[id].destory();
        this.pool[id] = null;
    }

    public onFrameUpdate(frame: number): void {
        for (let k in this.pool) {
            this.pool[k].onFrameUpdate(frame);
        }

        for (let k in this.pool) {
            if (this.pool[k].isDestory)
                this.removeEntity(this.pool[k]);
        }
    }

    public reset() {
        for (let k in this.pool) {
            this.removeEntity(this.pool[k]);
        }

        //考虑了一下，不存在需要同步的问题
        //this.runNum = 1000;
    }

}

