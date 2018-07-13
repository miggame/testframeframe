import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class HPComponent extends BaseComponent {
    public get curHP() {
      return this._curHP;
    }

    public set curHP(val) {
      if (this._curHP != val)
        this.mark = true;
      this._curHP = val;
    }

    private _curHP:number;

}