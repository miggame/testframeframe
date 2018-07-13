import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { ImpactInfo } from "../ImpactInfo";
import { entity } from "../../../framework/entity/Entity";
import { refixHp } from "../../util/common";
import { GlobalApp } from "../../../framework/GlobleApp";
import { Game } from '../../Game';

enum OWNPARAMINDEX {
    IDX_DAMAGE = 0,
}

enum DATADESCINDEX {
    IDX_ODD = 0, //几率
    IDX_PER = 1, //百分比
}

export class ImpactLogic005 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_005;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {
        //let damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE);
        //this.setDamage(data, damage);


        return true;
    }

    public onDamageTarget(data: ImpactData, e: entity, tar: entity, damage: number) {
        let ret = Game.roomManager.rand.getRand();
        if (data.getInfo().getValueByIndex(DATADESCINDEX.IDX_ODD) * 10 <= ret) {
            let dam = damage * data.getInfo().getValueByIndex(DATADESCINDEX.IDX_PER) / 100;

            refixHp(e, tar, data, -dam);
        }


    }


    public getIntAttrRefix(data: ImpactData, e: entity, index: number): number {
        return 0;
    }



}
