import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";

enum OWNPARAMINDEX {
    IDX_DAMAGE = 0,
}

enum DATAMAXINDEX {
    IDX_MAXINDEX = 4,
}


enum DATADESCINDEX {
    IDX_ATTR_TYPE = 0,
    IDX_ATTR_VALUE = 1,
    IDX_ATTR_MAX,
}

export class ImpactLogic009 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_009;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {
        return true;
    }


    public getIntAttrRefix(data: ImpactData, e: entity, index: number): number {
        let ret = 0;
        for (let i = 0; i < DATAMAXINDEX.IDX_MAXINDEX; ++i) {
            ret += this.getIntInfo(data, i, index);
        }
        return ret;
    }

    public getIntInfo(data: ImpactData, i: number, attrid: number): number {
        let ret = 0;
        if (attrid == data.getInfo().getValueByIndex(i * DATADESCINDEX.IDX_ATTR_MAX + DATADESCINDEX.IDX_ATTR_TYPE)) {
            ret = data.getInfo().getValueByIndex(i * DATADESCINDEX.IDX_ATTR_MAX + DATADESCINDEX.IDX_ATTR_VALUE);
        }

        return ret;
    }


}
