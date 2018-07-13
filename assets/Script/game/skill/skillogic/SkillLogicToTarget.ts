import { CurCastSkillComponent } from "../../entity/component/CurCastSkillComponent";
import { entity } from "../../../framework/entity/Entity";
import { ImpactLogic001 } from "../impactlogic/ImpactLogic001";
import { EnemyComponent } from "../../entity/component/EnemyComponent";
import { SkillLogicBase, SKILLLOGICID } from "./SkillLogicBase";
import { SKillManger } from "../SkillManager";
import { SKILLIMPACTID } from "../impactlogic/ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { Game } from "../../Game";


enum SKILLDESCINDEX {
    SKILLDESCINDEX_ONCE = 0,
    SKILLDESCINDEX_TICK,
}

enum SKILLIMPACT {
    SKILLIMPACTMAX = 2,
}

/**
 * 对目标释放
 */
export class SkillLogicToTarget extends SkillLogicBase {

    constructor() {
        super();
        this.id = SKILLLOGICID.SKILLLOGICID_TARGET;
    }

    public onInterrupt(e: entity): boolean {
        return true;
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

        //todo 处理目标的问题,只是暂时处理为这样
        let isFind: boolean = false;
        for (let i = 0; i < t.enemy.length; ++i) {
            if (t.enemy[i] == 0) {
                t.enemy[i] = enemy.enemyID;
                isFind = true;
            }
        }

        if (!isFind) {
            t.enemy.push(enemy.enemyID);
        }


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
                let j = SKILLDESCINDEX.SKILLDESCINDEX_ONCE;
                let value = this.getValueOnceValue(t.skillInstanceID, j);
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
        v = instInfo.getValue(SKILLDESCINDEX.SKILLDESCINDEX_ONCE + index);
        return v;
    }
}

