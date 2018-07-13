import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class SpriteRenderComponent extends BaseComponent {
    public get r() {
      return this._r;
    }

    public set r(val) {
      if (this._r != val)
        this.mark = true;
      this._r = val;
    }

    private _r:any;

    public get resName() {
      return this._resName;
    }

    public set resName(val) {
      if (this._resName != val)
        this.mark = true;
      this._resName = val;
    }

    private _resName:string;

}