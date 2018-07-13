import { FsmManager } from "../../../framework/common/fsm/FsmManager";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";
import { MovePostionComponent } from "../../entity/component/MovePostionComponent";
import { AIFsmManager } from "../AIFsmManager";
import { PostionComponent } from "../../entity/component/PostionComponent";
import { AABBComponent } from "../../entity/component/AABBComponent";
import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { IsDeadComponent } from "../../entity/component/IsDeadComponent";
import { EnemyComponent } from "../../entity/component/EnemyComponent";
import { entity } from "../../../framework/entity/Entity";
import { SPECIAL_STATE } from "../../skill/SkillManager";
import { SpecialStateListComponent } from "../../entity/component/SpecialStateListComponent";
import { AnimationComponent } from "../../entity/component/AnimationComponent";
import { Game } from "../../Game";


export class TraceState extends FsmBase {
    constructor() {
        super();
        this._groupName = "TraceState";
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

        let ct: EnemyComponent = <EnemyComponent>t.e.getCompnentByType(EnemyComponent);
        if (ct) {
            let target: entity = Game.entityManager.getEntityByID((<EnemyComponent>ct).enemyID)
            if (target == null) {
                t.ChangeState("IdleState");
                return;
            }

            let targetIsDead = <IsDeadComponent>target.getCompnentByType(IsDeadComponent);
            if (!targetIsDead || targetIsDead.isDead) {
                t.ChangeState("IdleState");
                return;
            }


            let ct3: CurCastSkillComponent = <CurCastSkillComponent>t.e.getCompnentByType(CurCastSkillComponent);
            if (ct3) {
                if (ct3.isAttack === 1) {

                    t.ChangeState("AtkState");
                    return;
                }
            }


            //计算阻挡相关问题
            let tPos = <PostionComponent>target.getCompnentByType(PostionComponent);
            if (tPos) {
                let tx = tPos.x;
                let ty = tPos.y;

                let tAABB = <AABBComponent>target.getCompnentByType(AABBComponent);
                if (tAABB) {
                    //todo 需要考虑自己的问题么？
                    let sPos = <PostionComponent>t.e.getCompnentByType(PostionComponent);
                    if (sPos) {
                        let halfX = (tAABB.w) / 2;
                        let halfY = (tAABB.h) / 2
                        let xOffset = sPos.x - tPos.x;
                        let yOffset = sPos.y - tPos.y;
                        if (Math.abs(xOffset) < halfX) {
                            tx = sPos.x;
                        }
                        else {
                            if (xOffset < 0) {
                                tx = tPos.x - halfX;
                            }
                            else {
                                tx = tPos.x + halfX;
                            }
                        }

                        if (Math.abs(yOffset) < halfY) {
                            ty = sPos.y;
                        }
                        else {
                            if (yOffset < 0) {
                                ty = tPos.y - halfY;
                            }
                            else {
                                ty = tPos.y + halfY;
                            }
                        }

                    }

                }


                let tMovePos = <MovePostionComponent>t.e.getCompnentByType(MovePostionComponent);
                if (tMovePos) {
                    tMovePos.x = tx;
                    tMovePos.y = ty;
                }
                else {
                    let mt: MovePostionComponent = Game.ComponentPoolMgr.getObject(MovePostionComponent);
                    mt.x = tx;
                    mt.y = ty;
                    t.e.addCompnent(mt);
                }
            }
            return;
        }

        t.ChangeState("IdleState");
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
