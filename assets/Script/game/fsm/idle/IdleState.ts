import { FsmManager } from "../../../framework/common/fsm/FsmManager";
import { EnemyComponent } from "../../entity/component/EnemyComponent";
import { PathingComponent } from "../../entity/component/PathingComponent";
import { AIFsmManager } from "../AIFsmManager";
import { IsDeadComponent } from "../../entity/component/IsDeadComponent";
import { SpecialStateListComponent } from "../../entity/component/SpecialStateListComponent";
import { SPECIAL_STATE } from "../../skill/SkillManager";
import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { Game } from "../../Game";
import { AnimationComponent } from "../../entity/component/AnimationComponent";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";

export class IdleState extends FsmBase {
    constructor() {
        super();
        this._groupName = "IdleState";
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

        let ct3: CurCastSkillComponent = <CurCastSkillComponent>t.e.getCompnentByType(CurCastSkillComponent);
        if (ct3) {
            if (ct3.isAttack === 1) {

                t.ChangeState("AtkState");
                return;
            }
        }


        let ct: EnemyComponent = <EnemyComponent>t.e.getCompnentByType(EnemyComponent);
        if (ct) {
            if (Game.entityManager.getEntityByID((<EnemyComponent>ct).enemyID)) {
                t.ChangeState("TraceState");
                return;
            }
        }

        let ct1: PathingComponent = <PathingComponent>t.e.getCompnentByType(PathingComponent);
        if (ct1) {
            if (ct1.isfinish == false) {
                t.ChangeState("PathState");
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
