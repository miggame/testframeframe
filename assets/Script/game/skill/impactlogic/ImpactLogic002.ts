import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactData } from "../ImpactData";
import { entity } from "../../../framework/entity/Entity";
import { isAlive, onDamage } from "../../util/common";
import { ImpactInfo } from "../ImpactInfo";
import { GlobalApp } from "../../../framework/GlobleApp";

enum OWNPARAMINDEX {
    IDX_DAMAGE = 0,
}

enum DATADESCINDEX {
    IDX_DAMAGE = 0,
    IDX_DAMAGE_MAX = 1,
}

export class ImpactLogic002 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_002;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {
        let damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE);
        this.setDamage(data, damage);


        return true;
    }



    public onActive(data: ImpactData, e: entity): void {
        if (!isAlive(e))
            return;
        let damage = this.getDamage(data);
        let atk = GlobalApp.entityManager.getEntityByID(data.castID);
        onDamage(e, atk, data, damage);

    }


    public getIntAttrRefix(data: ImpactData, e: entity, index: number): number {
        return 0;
    }

    public setDamage(data: ImpactData, value: number): void {
        data.setParamByIndex(OWNPARAMINDEX.IDX_DAMAGE, value);
    }

    public getDamage(data: ImpactData): number {
        return data.getParamByIndex(OWNPARAMINDEX.IDX_DAMAGE);
    }


}
