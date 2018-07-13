import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";

enum OWNPARAMINDEX {
    IDX_SHIELD = 0,
}



enum DATADESCINDEX {
    IDX_ATTR_PER = 0,//伤害百分比
    IDX_ATTR_DIS = 1,//距离
    IDX_ATTR_MAX,
}

export class ImpactLogic013 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_013;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {

        return true;
    }



    public onDie(data: ImpactData, e: entity): void {

    }
}
