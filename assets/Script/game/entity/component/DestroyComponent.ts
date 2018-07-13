import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class DestroyComponent extends BaseComponent {
    public get isNeedDestroy() {
      return this._isNeedDestroy;
    }

    public set isNeedDestroy(val) {
      if (this._isNeedDestroy != val)
        this.mark = true;
      this._isNeedDestroy = val;
    }

    private _isNeedDestroy:boolean;

    public get isDestroy() {
      return this._isDestroy;
    }

    public set isDestroy(val) {
      if (this._isDestroy != val)
        this.mark = true;
      this._isDestroy = val;
    }

    private _isDestroy:boolean;

    public get lastTime() {
      return this._lastTime;
    }

    public set lastTime(val) {
      if (this._lastTime != val)
        this.mark = true;
      this._lastTime = val;
    }

    private _lastTime:number;

}