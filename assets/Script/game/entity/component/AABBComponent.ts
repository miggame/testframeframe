import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class AABBComponent extends BaseComponent {
    public get x() {
      return this._x;
    }

    public set x(val) {
      if (this._x != val)
        this.mark = true;
      this._x = val;
    }

    private _x:number;

    public get y() {
      return this._y;
    }

    public set y(val) {
      if (this._y != val)
        this.mark = true;
      this._y = val;
    }

    private _y:number;

    public get w() {
      return this._w;
    }

    public set w(val) {
      if (this._w != val)
        this.mark = true;
      this._w = val;
    }

    private _w:number;

    public get h() {
      return this._h;
    }

    public set h(val) {
      if (this._h != val)
        this.mark = true;
      this._h = val;
    }

    private _h:number;

}