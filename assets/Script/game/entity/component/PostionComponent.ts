import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class PostionComponent extends BaseComponent {
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

}