import { ITask } from '../../framework/base/Task/ITask';
import { AnsyBase } from './AnsyBase';
export class AnsyTask implements ITask {
    private static sSerial: number = 0;

    private _serial: number;
    private _isDone: boolean;

    private _userData: any;

    private _startTime: number;

    private _asnyBase: AnsyBase;
    constructor(ansy: AnsyBase, userData: any) {
        this._serial = AnsyTask.sSerial++;
        this._isDone = false;
        this._asnyBase = ansy;
        this._userData = userData;
        this._startTime = Date.now();
    }


    public isDone(): boolean {
        return this._isDone;
    }

    public get AnsyReq(): AnsyBase {
        return this._asnyBase;
    }

    public getTaskID(): number {
        return this._serial;
    }

    public set done(val: boolean) {
        this._isDone = val;
    }

    public get userData(): any {
        return this._userData;
    }

    public set userDate(val: any) {
        this._userData = val;
    }

    public get startTime() {
        return this._startTime;
    }

    public set startTime(val: number) {
        this._startTime = val;
    }


    public onAnsyCallOK(): void {
        this._asnyBase.onOK(this._userData);
    }

    public onAnsyCallFail(): void {
        this._asnyBase.onFail(this._userData);
    }
}