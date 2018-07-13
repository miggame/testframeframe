import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData, ImpactDataFlag } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { getAttrValue } from "../../util/common";
import { entity } from "../../../framework/entity/Entity";
import { ATTR_DEF } from "../../attr/AttrManager";

enum OWNPARAMINDEX {
    IDX_SHIELD = 0,
}



enum DATADESCINDEX {
    IDX_ATTR_PER = 0,//生命百分比
    IDX_ATTR_MAX,
}

export class ImpactLogic010 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_010;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {

        return true;
    }


    public onActive(data: ImpactData, e: entity): void {
        let hp = getAttrValue(e, ATTR_DEF.ATTR_DEF_MAXHP);
        data.setParamByIndex(OWNPARAMINDEX.IDX_SHIELD, hp * data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_PER) / 100);
    }




    public onByDamage(data: ImpactData, e: entity, atk: entity, damage: number): number {
        let num = data.getParamByIndex(OWNPARAMINDEX.IDX_SHIELD)
        if (damage > 0) {
            if (num >= damage) {
                damage = 0;
                num = num - damage;
            }
            else {
                damage = damage - num;
                num = 0;
            }
            if (num <= 0) {
                data.flag.setFlag(ImpactDataFlag.FADE_OUT);
            }
        }
        return damage;
    }
}
