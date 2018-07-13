import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class SpecialStateListComponent extends BaseComponent {
    public get list() {
      return this._list;
    }

    public set list(val) {
      if (this._list != val)
        this.mark = true;
      this._list = val;
    }

    private _list:Array<number>;

}