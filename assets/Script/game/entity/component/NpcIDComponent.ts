import { BaseComponent } from "../../../framework/entity/BaseComponent";
  export class NpcIDComponent extends BaseComponent {
    public get npcID() {
      return this._npcID;
    }

    public set npcID(val) {
      if (this._npcID != val)
        this.mark = true;
      this._npcID = val;
    }

    private _npcID:number;

    public get cardID() {
      return this._cardID;
    }

    public set cardID(val) {
      if (this._cardID != val)
        this.mark = true;
      this._cardID = val;
    }

    private _cardID:number;

}