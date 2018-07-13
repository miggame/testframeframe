import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";
import { SKillManger } from "../SkillManager";
import { Game } from '../../Game';

enum OWNPARAMINDEX {
    IDX_DAMAGE = 0,
}

enum DATADESCINDEX {
    IDX_ODD1 = 0, //几率
    IDX_IMPTOSELF = 1, //给自己的效果
    IDX_IODD2 = 2, //几率
    IDX_IMPTOTAR = 3, //给他人的效果
}

export class ImpactLogic006 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_006;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {
        return true;
    }

    public onDamageTarget(data: ImpactData, e: entity, tar: entity, damage: number) {
        let ret = Game.roomManager.rand.getRand();
        if (e && data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ODD1) * 10 <= ret) {
            let impactID = data.getInfo().getValueByIndex(DATADESCINDEX.IDX_IMPTOSELF);
            if (impactID > 0) {
                let impact: ImpactData = new ImpactData();
                SKillManger.Instance.initImpactData(impactID, impact);
                Game.skillManager.activeImpact(e, impact);

            }
        }
        ret = Game.roomManager.rand.getRand();
        if (tar && data.getInfo().getValueByIndex(DATADESCINDEX.IDX_IODD2) * 10 <= ret) {
            let impactID = data.getInfo().getValueByIndex(DATADESCINDEX.IDX_IMPTOTAR);
            if (impactID > 0) {
                let impact: ImpactData = new ImpactData();
                SKillManger.Instance.initImpactData(impactID, impact);
                Game.skillManager.activeImpact(tar, impact);

            }

        }

    }


    public getIntAttrRefix(data: ImpactData, e: entity, index: number): number {
        return 0;
    }



}
