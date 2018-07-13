import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class CurCastSkillComponent extends BaseComponent {
    public get skillID() {
      return this._skillID;
    }

    public set skillID(val) {
      if (this._skillID != val)
        this.mark = true;
      this._skillID = val;
    }

    private _skillID:number;

    public get curErr() {
      return this._curErr;
    }

    public set curErr(val) {
      if (this._curErr != val)
        this.mark = true;
      this._curErr = val;
    }

    private _curErr:number;

    public get isAttack() {
      return this._isAttack;
    }

    public set isAttack(val) {
      if (this._isAttack != val)
        this.mark = true;
      this._isAttack = val;
    }

    private _isAttack:number;

    public get skillDelay() {
      return this._skillDelay;
    }

    public set skillDelay(val) {
      if (this._skillDelay != val)
        this.mark = true;
      this._skillDelay = val;
    }

    private _skillDelay:number;

    public get skillLevel() {
      return this._skillLevel;
    }

    public set skillLevel(val) {
      if (this._skillLevel != val)
        this.mark = true;
      this._skillLevel = val;
    }

    private _skillLevel:number;

    public get skillInstanceID() {
      return this._skillInstanceID;
    }

    public set skillInstanceID(val) {
      if (this._skillInstanceID != val)
        this.mark = true;
      this._skillInstanceID = val;
    }

    private _skillInstanceID:number;

    public get enemy() {
      return this._enemy;
    }

    public set enemy(val) {
      if (this._enemy != val)
        this.mark = true;
      this._enemy = val;
    }

    private _enemy:Array<number>;

}