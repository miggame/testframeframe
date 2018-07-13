import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class LevelComponent extends BaseComponent {
    public get level() {
      return this._level;
    }

    public set level(val) {
      if (this._level != val)
        this.mark = true;
      this._level = val;
    }

    private _level:number;

}