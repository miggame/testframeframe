import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { entity } from "../../../framework/entity/Entity";
import { ImpactData } from "../ImpactData";
import { SkillLogicBase, SKILLLOGICID } from "./SkillLogicBase";
import { SKillManger } from "../SkillManager";
import { SKILLIMPACTID } from "../impactlogic/ImpactLogicBase";
import { ImpactLogic001 } from "../impactlogic/ImpactLogic001";
import { Game } from "../../Game";

enum SKILLDESCINDEX {
    SKILLDESCINDEX_ONCE_IMPACT_FOR_SELF = 0,
}

enum SKILLIMPACT {
    SKILLIMPACTMAX = 2,
}

/**
 * 对目标释放
 */
export class SkillLogicToSelf extends SkillLogicBase {

    constructor() {
        super();
        this.id = SKILLLOGICID.SKILLLOGICID_TOSELF;
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

        //todo 处理目标的问题,只是暂时处理为这样
        this.addEenmy(t, e.id);

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

                value = this.getValueOnceValue(t.skillInstanceID, SKILLDESCINDEX.SKILLDESCINDEX_ONCE_IMPACT_FOR_SELF);

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
        v = instInfo.getValue(SKILLDESCINDEX.SKILLDESCINDEX_ONCE_IMPACT_FOR_SELF + index);
        return v;
    }
}

