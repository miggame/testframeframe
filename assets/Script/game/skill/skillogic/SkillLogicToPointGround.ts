import { SkillLogicBase, SKILLLOGICID } from "./SkillLogicBase";
import { entity } from "../../../framework/entity/Entity";
import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { IsDeadComponent } from "../../entity/component/IsDeadComponent";
import { getSpecialState, getCampRelation } from "../../util/common";
import { SPECIAL_STATE, SKillManger } from "../SkillManager";
import { CampComponent } from "../../entity/component/CampComponent";
import { PostionComponent } from "../../entity/component/PostionComponent";
import { SKILLIMPACTID } from "../impactlogic/ImpactLogicBase";
import { ImpactLogic001 } from "../impactlogic/ImpactLogic001";
import { ImpactData } from "../ImpactData";
import { GlobalApp } from '../../../framework/GlobleApp';

enum SKILLDESCINDEX {
    SKILLDESCINDEX_ONCE_IMPACT_FOR_TARGET = 0,
    SKILLDESCINDEX_SCAN_RADIUS,//周围目标半径
    SKILLDESCINDEX_EFFECTED_OBJ_COUNT,//周围目标最大数量        
}

enum SKILLIMPACT {
    SKILLIMPACTMAX = 2,
}

/**
 * 对位置半径范围释放
 */
export class SkillLogicToPointGround extends SkillLogicBase {

    constructor() {
        super();
        this.id = SKILLLOGICID.SKILLLOGICID_POINTGROUND;
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
        for (let i = 0; i < t.enemy.length; ++i) {
            t.enemy[i] = 0;
        }



        let maxNum = this.getValueOnceValue(t.skillInstanceID, SKILLDESCINDEX.SKILLDESCINDEX_EFFECTED_OBJ_COUNT);
        let maxRad = this.getValueOnceValue(t.skillInstanceID, SKILLDESCINDEX.SKILLDESCINDEX_SCAN_RADIUS);

        //判定改为椭圆判定了 maxRad代表了短直径，1.5是长直径,需要解方程
        let b = maxRad / 2;
        let a = maxRad * 1.5 / 2;

        //处理周围人群
        let pool: Map<number, entity> = GlobalApp.entityManager.getPool();

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
            let pos2 = <PostionComponent>e.getCompnentByType(PostionComponent);
            let x = pos1.x - pos2.x;
            let y = pos1.y - pos2.y;


            let dis: number = x * x / (a * a) + y * y / (b * b);
            console.log("dis:" + dis);
            if (dis < 1) {
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
                    let target: entity = GlobalApp.entityManager.getEntityByID(t.enemy[i]);
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