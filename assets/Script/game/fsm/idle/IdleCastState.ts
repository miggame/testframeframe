import { SkillComponent } from "../../entity/component/SkillComponent";
import { AIFsmManager } from "../AIFsmManager";
import { FsmManager } from "../../../framework/common/fsm/FsmManager";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";
import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { SKillManger } from "../../skill/SkillManager";


export class IdleCastState extends FsmBase {
    constructor() {
        super();
        this._groupName = "IdleState";
    }

    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {
        super.OnEntry(owner);
        let t: AIFsmManager = <AIFsmManager>owner;

        let curSkill: CurCastSkillComponent = <CurCastSkillComponent>t.e.getCompnentByType(CurCastSkillComponent);
        if (curSkill) {
            let skill = <SkillComponent>t.e.getCompnentByType(SkillComponent);
            if (skill) {
                let select = skill.skillList[0];
                curSkill.skillDelay = SKillManger.Instance.getSkillInfo(select.skillID).skillDelay;
                curSkill.skillLevel = select.level;
                curSkill.skillID = select.skillID;
                curSkill.skillInstanceID = select.skillID * 100 + select.level;
            }
        }


    }

    public OnUpdate(owner: FsmManager, dt: number, rdt: number) {


    }

    public OnLeave(owner: FsmManager) {
        super.OnLeave(owner);
    }

    public OnDestroy(owner: FsmManager) {

    }

}
