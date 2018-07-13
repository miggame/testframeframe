export enum AnsyState {
    AnsyState_Run,
    AnsyState_OK,
    AnsyState_Fail,
}
export class AnsyBase {
    protected _state: AnsyState;
    private _okCB: Function;
    private _failCB: Function;
    private _bind: any;

    constructor(bind: any, okCB: Function, failCB: Function) {
        this._state = AnsyState.AnsyState_Run;
        this._bind = bind;
        this._failCB = failCB;
        this._okCB = okCB;
    }
    public onUpdate(delta: number, realDelta: number) {

    }


    public start() {

    }

    public getState(): AnsyState {
        return this._state;
    }

    public onOK(data: any) {
        if (this._okCB) {
            this._okCB.apply(this._bind, [data]);
        }
    }
    
    public onFail(data: any) {
        if (this._failCB) {
            this._failCB.apply(this._bind, [data]);
        }
    }


}
