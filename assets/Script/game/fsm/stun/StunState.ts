import { AnimationComponent } from "../../entity/component/AnimationComponent";
import { AIFsmManager } from "../AIFsmManager";
import { FsmManager } from "../../../framework/common/fsm/FsmManager";
import { SpecialStateListComponent } from "../../entity/component/SpecialStateListComponent";
import { IsDeadComponent } from "../../entity/component/IsDeadComponent";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";
import { SPECIAL_STATE } from "../../skill/SkillManager";


export class StunState extends FsmBase {
    constructor() {
        super();
        this._groupName = "StunState";
    }

    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {

        super.OnEntry(owner);
        let t: AIFsmManager = <AIFsmManager>owner;
        let ct1: AnimationComponent = <AnimationComponent>t.e.getCompnentByType(AnimationComponent);
        if (ct1) {
            ct1.readyAnim = "Idle";
            ct1.loop = true;
        }
        //t.e.changeSystemState(app.AppMain.Instance.systemManager.getSystem(game.system.CastSkillSystem), false);
        // t.e.changeSystemState(app.AppMain.Instance.systemManager.getSystem(game.system.MovementSystem), false);
        //t.e.changeSystemState(app.AppMain.Instance.systemManager.getSystem(game.system.SelectSkillSystem), false);

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
        if (!state.list[SPECIAL_STATE.SPECIAL_STATE_STUN]) {
            t.ChangeState("IdleState");
        }
    }

    public OnLeave(owner: FsmManager) {
        super.OnLeave(owner);
        let t: AIFsmManager = <AIFsmManager>owner;
        // t.e.changeSystemState(app.AppMain.Instance.systemManager.getSystem(game.system.CastSkillSystem), true);
        //  t.e.changeSystemState(app.AppMain.Instance.systemManager.getSystem(game.system.MovementSystem), true);
        //t.e.changeSystemState(app.AppMain.Instance.systemManager.getSystem(game.system.SelectSkillSystem), true);

    }

    public OnDestroy(owner: FsmManager) {

    }

}
