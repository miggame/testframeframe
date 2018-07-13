import { BaseComponent } from "../../../framework/entity/BaseComponent";
import { CDData } from "../../skill/CDData";
  export class CDListComponent extends BaseComponent {
    public get CDList() {
      return this._CDList;
    }

    public set CDList(val) {
      if (this._CDList != val)
        this.mark = true;
      this._CDList = val;
    }

    private _CDList:Array<CDData>;

}