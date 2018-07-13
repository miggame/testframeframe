import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class AnimationComponent extends BaseComponent {
    public get curAnim() {
      return this._curAnim;
    }

    public set curAnim(val) {
      if (this._curAnim != val)
        this.mark = true;
      this._curAnim = val;
    }

    private _curAnim:string;

    public get readyAnim() {
      return this._readyAnim;
    }

    public set readyAnim(val) {
      if (this._readyAnim != val)
        this.mark = true;
      this._readyAnim = val;
    }

    private _readyAnim:string;

    public get waitAnim() {
      return this._waitAnim;
    }

    public set waitAnim(val) {
      if (this._waitAnim != val)
        this.mark = true;
      this._waitAnim = val;
    }

    private _waitAnim:string;

    public get loop() {
      return this._loop;
    }

    public set loop(val) {
      if (this._loop != val)
        this.mark = true;
      this._loop = val;
    }

    private _loop:boolean;

}