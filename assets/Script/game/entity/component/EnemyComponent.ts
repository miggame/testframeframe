import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class EnemyComponent extends BaseComponent {
    public get enemyID() {
      return this._enemyID;
    }

    public set enemyID(val) {
      if (this._enemyID != val)
        this.mark = true;
      this._enemyID = val;
    }

    private _enemyID:number;

}