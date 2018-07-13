import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";
import { HPComponent } from "../../entity/component/HPComponent";
import { ATTR_DEF } from "../../attr/AttrManager";
import { getAttrValue } from "../../util/common";

enum OWNPARAMINDEX {
    IDX_SHIELD = 0,
}



enum DATADESCINDEX {
    IDX_ATTR_TYPE = 0,//属性类型
    IDX_ATTR_PER = 1,//失去生命百分比
    IDX_ATTR_ADDPER = 2,//增加数值百分比

    IDX_ATTR_MAX,
}

export class ImpactLogic015 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_015;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {

        return true;
    }



    public getIntAttrRefix(data: ImpactData, e: entity, index: number): number {
        let ret = 0;
        if (index === data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_ADDPER)) {
            let hp: HPComponent = <HPComponent>e.getCompnentByType(HPComponent);
            let maxhp = getAttrValue(e, ATTR_DEF.ATTR_DEF_MAXHP);

            let p = Math.floor((maxhp - hp.curHP) * 100 / (maxhp * data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_PER)));

            ret = p * data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_ADDPER);
        }

        return ret;
    }




}
