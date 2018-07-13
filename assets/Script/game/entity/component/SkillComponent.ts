import { BaseComponent } from "../../../framework/entity/BaseComponent";
import { UserSkill } from "../../skill/UserSkill";
  export class SkillComponent extends BaseComponent {
    public get skillList() {
      return this._skillList;
    }

    public set skillList(val) {
      if (this._skillList != val)
        this.mark = true;
      this._skillList = val;
    }

    private _skillList:Array<UserSkill>;

}