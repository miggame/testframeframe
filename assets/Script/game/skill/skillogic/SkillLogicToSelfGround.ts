import { SkillLogicBase, SKILLLOGICID } from "./SkillLogicBase";
import { entity } from "../../../framework/entity/Entity";
import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { EnemyComponent } from "../../entity/component/EnemyComponent";
import { IsDeadComponent } from "../../entity/component/IsDeadComponent";
import { getSpecialState, getCampRelation } from "../../util/common";
import { SPECIAL_STATE, SKillManger } from "../SkillManager";
import { CampComponent } from "../../entity/component/CampComponent";
import { PostionComponent } from "../../entity/component/PostionComponent";
import { distance_sq } from "../../util/util";
import { SKILLIMPACTID } from "../impactlogic/ImpactLogicBase";
import { ImpactLogic001 } from "../impactlogic/ImpactLogic001";
import { ImpactData } from "../ImpactData";
import { Game } from "../../Game";

enum SKILLDESCINDEX {
    SKILLDESCINDEX_ONCE_IMPACT_FOR_TARGET = 0,
    SKILLDESCINDEX_SCAN_RADIUS,//周围目标半径
    SKILLDESCINDEX_EFFECTED_OBJ_COUNT,//周围目标最大数量        
}

enum SKILLIMPACT {
    SKILLIMPACTMAX = 2,
}

/**
 * 对目标释放
 */
export class SkillLogicToSelfGround extends SkillLogicBase {

    constructor() {
        super();
        this.id = SKILLLOGICID.SKILLLOGICID_SELFGROUND;
    }

    public onInterrupt(e: entity): boolean {
        return true;
    }


    private addEenmy(t: CurCastSkillComponent, id: number) {
        let isFind: boolean = false;
        for (let i = 0; i < t.enemy.length; ++i) {
            if (t.enemy[i] == 0) {
                t.enemy[i] = id;
                isFind = true;
            }
        }

        if (!isFind) {
            t.enemy.push(id);
        }
    }

    public start(e: entity): boolean {
        let t = (<CurCastSkillComponent>e.getCompnentByType(CurCastSkillComponent));
        if (!t) {
            return false;
        }


        //计算敌人列表
        let enemy = <EnemyComponent>e.getCompnentByType(EnemyComponent);
        if (!enemy)
            return false;

        if (enemy.enemyID <= 0)
            return false;

        for (let i = 0; i < t.enemy.length; ++i) {
            t.enemy[i] = 0;
        }

        let maxNum = this.getValueOnceValue(t.skillInstanceID, SKILLDESCINDEX.SKILLDESCINDEX_EFFECTED_OBJ_COUNT);
        let maxRad = this.getValueOnceValue(t.skillInstanceID, SKILLDESCINDEX.SKILLDESCINDEX_SCAN_RADIUS);

        //处理周围人群
        let pool: Map<number, entity> = Game.entityManager.getPool();

        let totalNum: number = 0;
        let self = this;
        pool.forEach((te) => {
            if (te === e) {
                return;
            }

            if (maxNum > 0 && totalNum >= maxNum)
                return;
            let isdead = <IsDeadComponent>e.getCompnentByType(IsDeadComponent);
            if (!isdead || isdead.isDead == true) {
                return;
            }

            let isdead2 = <IsDeadComponent>te.getCompnentByType(IsDeadComponent);
            if (!isdead2 || isdead2.isDead == true) {
                return;
            }
            if (getSpecialState(te, SPECIAL_STATE.SPECIAL_STATE_UNATTACK) == 1)
                return;
            let camp1 = <CampComponent>te.getCompnentByType(CampComponent);
            let camp2 = <CampComponent>e.getCompnentByType(CampComponent);
            if (!camp1 || !camp2 || getCampRelation(camp1.Camp, camp2.Camp) === 1) {
                return;
            }

            let pos1 = <PostionComponent>te.getCompnentByType(PostionComponent);
            let pos2 = <PostionComponent > e.getCompnentByType(PostionComponent);
            let dis: number = distance_sq(pos1.x, pos1.y, pos2.x, pos2.y);
            if (dis < maxRad) {
                self.addEenmy(t, te.id);
                totalNum += 1;
            }
        });


        //todo 暂时处理，如果是一次性
        this.effectOnOnce(e);

    }

    public effectOnOnce(e: entity): boolean {
        let t = (<CurCastSkillComponent>e.getCompnentByType(CurCastSkillComponent));
        if (!t) {
            return false;
        }

        for (let i = 0; i < t.enemy.length; ++i) {
            if (t.enemy[i] > 0) {
                //todo 需要计算命中
                let hitFlag = 0;

                //暂时写死处理
                let value = 0;
                value = this.getValueOnceValue(t.skillInstanceID, SKILLDESCINDEX.SKILLDESCINDEX_ONCE_IMPACT_FOR_TARGET);

                if (value > 0) {
                    let impact: ImpactData = new ImpactData();
                    SKillManger.Instance.initImpactData(value, impact);
                    impact.castID = e.id;
                    let target: entity = Game.entityManager.getEntityByID(t.enemy[i]);
                    if (impact.logicID == SKILLIMPACTID.SKILLIMPACTID_001) {

                        SKillManger.Instance.getCombatReslut(<ImpactLogic001>impact.logic, impact, e, target, hitFlag);
                    }

                    SKillManger.Instance.registerImpact(target, e, impact, hitFlag);

                }


            }

        }

        return true;
    }

    public getValueOnceValue(instanceID: number, index: number): number {
        let v = 0;
        let instInfo = SKillManger.Instance.getSkillInstanceInfoByInstanceID(instanceID);
        v = instInfo.getValue(SKILLDESCINDEX.SKILLDESCINDEX_ONCE_IMPACT_FOR_TARGET + index);
        return v;
    }
}

