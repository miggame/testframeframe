import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class BaseAttrComponent extends BaseComponent {
    public get baseAttr() {
      return this._baseAttr;
    }

    public set baseAttr(val) {
      if (this._baseAttr != val)
        this.mark = true;
      this._baseAttr = val;
    }

    private _baseAttr:number;

}