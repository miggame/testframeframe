import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class CampComponent extends BaseComponent {
    public get Camp() {
      return this._Camp;
    }

    public set Camp(val) {
      if (this._Camp != val)
        this.mark = true;
      this._Camp = val;
    }

    private _Camp:number;

}