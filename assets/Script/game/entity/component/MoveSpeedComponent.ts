import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class MoveSpeedComponent extends BaseComponent {
    public get speed() {
      return this._speed;
    }

    public set speed(val) {
      if (this._speed != val)
        this.mark = true;
      this._speed = val;
    }

    private _speed:number;

}