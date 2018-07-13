import { FsmManager } from "../../../framework/common/fsm/FsmManager";
import { SpecialStateListComponent } from "../../entity/component/SpecialStateListComponent";
import { IsDeadComponent } from "../../entity/component/IsDeadComponent";
import { AIFsmManager } from "../AIFsmManager";
import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { SPECIAL_STATE } from "../../skill/SkillManager";
import { AnimationComponent } from "../../entity/component/AnimationComponent";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";

export class AtkState extends FsmBase {
    constructor() {
        super();
        this._groupName = "AtkState";
    }

    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {
        super.OnEntry(owner);

        let t: AIFsmManager = <AIFsmManager>owner;
        let ct: CurCastSkillComponent = <CurCastSkillComponent>t.e.getCompnentByType(CurCastSkillComponent);
        if (ct) {
            let ct1: AnimationComponent = <AnimationComponent>t.e.getCompnentByType(AnimationComponent);
            {
                //todo 此处要根据具体的技能来处理动画，并且需要处理状态持续时间问题
                ct1.readyAnim = "Idle";
                ct1.loop = true;
            }
        }

    }

    public OnUpdate(owner: FsmManager, dt: number, rdt: number) {
        let t: AIFsmManager = <AIFsmManager>owner;

        let isDead: IsDeadComponent = <IsDeadComponent>t.e.getCompnentByType(IsDeadComponent);
        if (isDead) {
            if (isDead.isDead) {
                t.ChangeState("DeadState");
                return;
            }
        }

        let state: SpecialStateListComponent = <SpecialStateListComponent>t.e.getCompnentByType(SpecialStateListComponent);
        if (state && state.list[SPECIAL_STATE.SPECIAL_STATE_STUN]) {
            t.ChangeState("StunState");
        }

        let ct: CurCastSkillComponent = <CurCastSkillComponent>t.e.getCompnentByType(CurCastSkillComponent);
        if (ct) {
            if (ct.isAttack === 0) {
                t.ChangeState("IdleState");
                return;
            }
        }
    }

    public OnLeave(owner: FsmManager) {
        super.OnLeave(owner);
    }

    public OnDestroy(owner: FsmManager) {

    }

}
