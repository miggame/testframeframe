import { iSystem } from "./iSystem";
import { iComponet } from "./iComponet";
import { getClassName } from "../utils/util";




export class entity  {
    public id: number;
    constructor() {      
        this.cPool = {};
        this.sPool = new Array<iSystem>();
        this.sStatePool = new Array<boolean>();
        this.isDestory = false;
    }
    public isDestory:boolean;

    private cPool: any;
    private sPool: Array<iSystem>;
    private sStatePool: Array<boolean>;

    public init() {

    }

    public reset() {
        for (let i = 0; i < this.sPool.length; ++i) {
            this.sPool[i].onClear(this);
        }

        this.cPool={};
        this.sPool.splice(0);
        this.isDestory = false;
    }




    public destory() {
        this.reset();
        this.cPool = undefined;
        this.sPool = undefined;
    }


    public addCompnent(c: iComponet): iComponet {
        this.cPool[getClassName(c)] = c;
        return c;
    }

    public removeCompnet(c: iComponet): void {
        if (!c)
            return;
        this.cPool[getClassName(c)] = null;
    }

    public getCompnentByType(tp: any): iComponet {
        let name: string = tp.name;
        let t: iComponet;
        t = this.cPool[name];
        return t;
    }

    public addSystem(s: iSystem): void {
        this.sPool.push(s);
        s.onInit(this);
        this.sStatePool.push(true);
    }

    public changeSystemState(s: iSystem, state: boolean): void {
        if (!s)
            return;
        for (let i = 0; i < this.sPool.length; ++i) {
            if (this.sPool[i] === s) {
                this.sStatePool[i] = state;
                break;
            }
        }
    }


    // public removeSystem(s: game.interfaces.iSystem): void {
    //     if (!s)
    //         return;
    //     for (let i = 0; i < this.sPool.length; ++i) {
    //         if (this.sPool[i] === s) {
    //             this.sPool.splice(i, 1);
    //             break;
    //         }
    //     }
    //     s.onClear(this);
    // }

    /*
    public onUpdate(time: number, delta: number):void
    {
        for(let i:number = 0;i < this.sPool.length;++i)
        {
            this.sPool[i].onUpdate(this,time,delta);
        }
    }
    */

    public onFrameUpdate(frame: number): void {
        for (let i: number = 0; i < this.sPool.length; ++i) {
            if (this.sStatePool[i]) {
                this.sPool[i].onFrameUpdate(this, frame);
            }
        }
    }

}
