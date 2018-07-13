import { BaseComponent } from "../../../framework/entity/BaseComponent";
import { AIFsmManager } from "../../fsm/AIFsmManager";
  export class AIComponent extends BaseComponent {
    public get state() {
      return this._state;
    }

    public set state(val) {
      if (this._state != val)
        this.mark = true;
      this._state = val;
    }

    private _state:AIFsmManager;

    public get aiState() {
      return this._aiState;
    }

    public set aiState(val) {
      if (this._aiState != val)
        this.mark = true;
      this._aiState = val;
    }

    private _aiState:Array<string>;

    public get curState() {
      return this._curState;
    }

    public set curState(val) {
      if (this._curState != val)
        this.mark = true;
      this._curState = val;
    }

    private _curState:string;

}