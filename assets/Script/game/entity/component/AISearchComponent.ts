import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class AISearchComponent extends BaseComponent {
    public get radius() {
      return this._radius;
    }

    public set radius(val) {
      if (this._radius != val)
        this.mark = true;
      this._radius = val;
    }

    private _radius:number;

}