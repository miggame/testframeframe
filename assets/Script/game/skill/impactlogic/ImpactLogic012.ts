import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";
import { getAABBDis, refixHp } from "../../util/common";

enum OWNPARAMINDEX {
    IDX_SHIELD = 0,
}



enum DATADESCINDEX {
    IDX_ATTR_PER = 0,//反伤倍数
    IDX_ATTR_DIS = 1,//距离
    IDX_ATTR_MAX,
}

export class ImpactLogic012 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_012;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {

        return true;
    }


    public onByDamage(data: ImpactData, e: entity, atk: entity, damage: number): number {
        if (atk) {
            let dis = getAABBDis(e, atk);
            if (dis <= data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_DIS)) {
                let dam = data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_PER) * damage / 100;
                refixHp(atk, e, data, dam);
            }
        }



        return damage;
    }
}
