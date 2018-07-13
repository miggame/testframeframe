import { BaseComponent } from "../../../framework/entity/BaseComponent";
import { ImpactData } from "../../skill/ImpactData";
  export class BuffAttrListComponent extends BaseComponent {
    public get buffAttrList() {
      return this._buffAttrList;
    }

    public set buffAttrList(val) {
      if (this._buffAttrList != val)
        this.mark = true;
      this._buffAttrList = val;
    }

    private _buffAttrList:Array<ImpactData>;

}