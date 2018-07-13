import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class IsMainComponent extends BaseComponent {
    public get isMain() {
      return this._isMain;
    }

    public set isMain(val) {
      if (this._isMain != val)
        this.mark = true;
      this._isMain = val;
    }

    private _isMain:boolean;

}