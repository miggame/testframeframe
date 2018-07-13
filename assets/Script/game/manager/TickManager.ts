import { BaseClass } from '../../framework/base/BaseClass';


export class TickManager extends BaseClass {


    public _lastTS: number;
    private _updateObservers: Array<any> = new Array<any>();
    private _updateRemoveObservers: Array<any> = new Array<any>();

    private _updateFrameObservers: Array<any> = new Array<any>();
    private _updateRemoveFrameObservers: Array<any> = new Array<any>();



    private _stoped: boolean = false;
    private _timerHandle: number;
    private _minimize: boolean = false;
    public runDelta: number;
    constructor() {
        super();
        this._lastTS = Date.now();
        this._timerHandle = 0;
    }

    public start() {
        let call = this;
        this._timerHandle = setInterval(() => {
            call.onUpdate();
        }, 33);
    }

    public stop() {
        clearInterval(this._timerHandle);
    }
    
    public targetFrame: number = 0;
    public lastSyncFrame: number = 0;


    public reset() {
        this.targetFrame = 0;
        this.lastSyncFrame = 0;
    }



    private onUpdate(): void {
        let now: number = Date.now();
        let delta = now - this._lastTS;

        this._lastTS = now;
        this.runDelta = delta;
        if (!this._stoped) {
            this._broadcastUpdateEvent(now, delta);
        }


        while (this.lastSyncFrame < this.targetFrame) {
            this.lastSyncFrame += 1;
            this._broadcastFrameUpdateEvent(this.lastSyncFrame);

        }

    }


    /**
     * 添加update回调
     * @param {common.bkext.UpdateObserver | any} observer
     * @return {boolean}
     */
    public addUpdateObserver(observer: any): boolean {
        for (let i = 0; i < this._updateObservers.length; ++i) {
            if (this._updateObservers[i] == observer) {
                return;
            }
        }
        this._updateObservers.push(observer);
        return true;
    }

    /**
     * 移除update回调 先暂时屏蔽移除功能
     * @param {any} observer
     * @return {boolean}
     */
    // public removeUpdateObserver(observer: any): boolean {
    //     for (let i = 0; i < this._updateObservers.length; ++i) {
    //         if (this._updateObservers[i] == observer) {
    //             this._updateRemoveObservers.push(observer);
    //             return true;
    //         }
    //     }
    //     return false;
    // }


    /**
     * 添加frameupdate回调
     * @param {common.bkext.UpdateObserver | any} observer
     * @return {boolean}
     */
    public addFrameUpdateObserver(observer: any): boolean {
        for (let i = 0; i < this._updateFrameObservers.length; ++i) {
            if (this._updateFrameObservers[i] == observer) {
                return false;
            }
        }

        this._updateFrameObservers.push(observer);
        return true;
    }

    /**
     * 移除frameupdate回调 暂时屏蔽
     * @param {common.bkext.UpdateObserver | any} observer
     * @return {boolean}
     */
    // public removeFrameUpdateObserver(observer: any): boolean {
    //     return this._updateFrameObservers.delete(observer);
    // }


    /**
     * 正常调用udpate
     * @param {number} time
     * @param {number} delta
     * @private
     */
    private _broadcastUpdateEvent(time: number, deltaReal: number): void {
        for (let i = 0; i < this._updateObservers.length; ++i) {
            this._updateObservers[i].onUpdate(time, deltaReal);
        }
    }

    /**
     * 帧同步调用update
     * @param time 
     * @param delta 
     */
    private _broadcastFrameUpdateEvent(frame: number): void {

        for (let i = 0; i < this._updateFrameObservers.length; ++i) {
            this._updateFrameObservers[i].onFrameUpdate(frame);
        }
    }

}


