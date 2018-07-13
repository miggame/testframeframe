import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class PropAttrListComponent extends BaseComponent {
    public get propAttrList() {
      return this._propAttrList;
    }

    public set propAttrList(val) {
      if (this._propAttrList != val)
        this.mark = true;
      this._propAttrList = val;
    }

    private _propAttrList:Array<number>;

}