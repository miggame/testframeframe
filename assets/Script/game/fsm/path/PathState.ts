import { AIFsmManager } from "../AIFsmManager";
import { MovePostionComponent } from "../../entity/component/MovePostionComponent";
import { FsmManager } from "../../../framework/common/fsm/FsmManager";
import { Game } from "../../Game";
import { PathingComponent } from "../../entity/component/PathingComponent";
import { PostionComponent } from "../../entity/component/PostionComponent";
import { distance } from "../../util/util";
import { EnemyComponent } from "../../entity/component/EnemyComponent";
import { SpecialStateListComponent } from "../../entity/component/SpecialStateListComponent";
import { IsDeadComponent } from "../../entity/component/IsDeadComponent";
import { AnimationComponent } from "../../entity/component/AnimationComponent";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";
import { SPECIAL_STATE } from "../../skill/SkillManager";

export class PathState extends FsmBase {
    constructor() {
        super();
        this._groupName = "PathState";
    }

    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {

        super.OnEntry(owner);
        let t: AIFsmManager = <AIFsmManager>owner;
        let ct1: AnimationComponent = <AnimationComponent>t.e.getCompnentByType(AnimationComponent);
        if (ct1) {
            ct1.readyAnim = "Move";
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


        let ct: PathingComponent = <PathingComponent>t.e.getCompnentByType(PathingComponent);
        if (ct) {
            if (ct.isfinish) {
                t.ChangeState("IdleState");
                return;
            }
        }

        let ct2: EnemyComponent = <EnemyComponent>t.e.getCompnentByType(EnemyComponent);
        if (ct2) {
            if (Game.entityManager.getEntityByID((<EnemyComponent>ct2).enemyID)) {
                t.ChangeState("TraceState");
                return;
            }
        }
        let tPos = <PathingComponent>t.e.getCompnentByType(PathingComponent);
        if (tPos) {
            let curPos = <PostionComponent>t.e.getCompnentByType(PostionComponent);
            if (distance(tPos.x, tPos.y, curPos.x, curPos.y) < 10) {
                let tMovePos = <MovePostionComponent>t.e.getCompnentByType(MovePostionComponent);
                if (tMovePos) {
                    t.e.removeCompnet(tMovePos);
                }

                tPos.isfinish = true;
                //t.e.removeCompnet(tPos);
                t.ChangeState("IdleState");
                return;
            }
            tPos.y = curPos.y;

            //todo 特殊处理了寻路
            let tMovePos = <MovePostionComponent>t.e.getCompnentByType(MovePostionComponent);
            if (tMovePos) {
                tMovePos.x = tPos.x;
                tMovePos.y = tPos.y;
            }
            else {
                let mt: MovePostionComponent = Game.ComponentPoolMgr.getObject(MovePostionComponent);
                mt.x = tPos.x;
                mt.y = tPos.y;
                t.e.addCompnent(mt);
            }
        }


    }

    public OnLeave(owner: FsmManager) {
        super.OnLeave(owner);
        let t: AIFsmManager = <AIFsmManager>owner;
        let tMovePos = <MovePostionComponent>t.e.getCompnentByType(MovePostionComponent);
        if (tMovePos) {
            t.e.removeCompnet(tMovePos);
        }
    }

    public OnDestroy(owner: FsmManager) {

    }

}
