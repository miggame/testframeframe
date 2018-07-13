import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class IsDeadComponent extends BaseComponent {
    public get isDead() {
      return this._isDead;
    }

    public set isDead(val) {
      if (this._isDead != val)
        this.mark = true;
      this._isDead = val;
    }

    private _isDead:boolean;

    public get hpDead() {
      return this._hpDead;
    }

    public set hpDead(val) {
      if (this._hpDead != val)
        this.mark = true;
      this._hpDead = val;
    }

    private _hpDead:boolean;

}