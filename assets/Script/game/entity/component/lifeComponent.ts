import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class lifeComponent extends BaseComponent {
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