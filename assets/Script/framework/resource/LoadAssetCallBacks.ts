
export class LoadAssetCallBacks {
    constructor(bind: any, cbOK: Function, cbFail: Function) {
        this._bind = bind;
        this._loadOK = cbOK;
        this._loadFail = cbFail;
    }

    public _loadOK: Function;
    public _loadFail: Function;
    public _bind: any;

}
