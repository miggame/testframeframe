import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class typeIDComponent extends BaseComponent {
    public get typeID() {
      return this._typeID;
    }

    public set typeID(val) {
      if (this._typeID != val)
        this.mark = true;
      this._typeID = val;
    }

    private _typeID:number;

}