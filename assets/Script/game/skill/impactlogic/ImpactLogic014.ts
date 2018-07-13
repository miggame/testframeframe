import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { SKillManger } from "../SkillManager";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";
import { Game } from "../../Game";

enum OWNPARAMINDEX {
    IDX_SHIELD = 0,
}



enum DATADESCINDEX {
    IDX_ATTR_IMPACT = 0,//给自己效果

    IDX_ATTR_MAX,
}

export class ImpactLogic014 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_014;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {

        return true;
    }

    public onKill(data: ImpactData, e: entity, tar: entity): void {
        let impact: ImpactData = new ImpactData();
        SKillManger.Instance.initImpactData(data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_IMPACT), impact);
        Game.skillManager.activeImpact(e, impact);

    }


}
