import { SKILLIMPACTID, ImpactLogicBase } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { entity } from "../../../framework/entity/Entity";
import { ImpactInfo } from "../ImpactInfo";
import { SKillManger } from "../SkillManager";
import { GlobalApp } from '../../../framework/GlobleApp';
import { Game } from "../../Game";

enum OWNPARAMINDEX {
    IDX_SHIELD = 0,
}



enum DATADESCINDEX {
    IDX_ATTR_IMPACT = 0,//属性类型

    IDX_ATTR_MAX,
}

export class ImpactLogic016 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_016;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {

        return true;
    }

    public onSpawn(data: ImpactData, e: entity): void {
        let impactID = data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_IMPACT);
        if (impactID > 0) {
            let impact: ImpactData = new ImpactData();
            SKillManger.Instance.initImpactData(impactID, impact);
            Game.skillManager.activeImpact(e, impact);

        }
    }

}
