import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";
import { Game } from "../../Game";

enum OWNPARAMINDEX {
    IDX_SHIELD = 0,
}



enum DATADESCINDEX {
    IDX_ATTR_ODD = 0,//几率
    IDX_ATTR_PER = 1,//倍数
    IDX_ATTR_MAX,
}

export class ImpactLogic011 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_011;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {

        return true;
    }


    public onByDamage(data: ImpactData, e: entity, atk: entity, damage: number): number {
        let ret = Game.roomManager.rand.getRand();
        if (data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_ODD) * 10 <= ret) {
            damage = damage * data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ATTR_PER) / 100;
        }


        return damage;
    }
}
