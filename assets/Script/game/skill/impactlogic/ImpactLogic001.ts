import { entity } from "../../../framework/entity/Entity";
import { ImpactData } from "../ImpactData";
import { isAlive, onDamage } from "../../util/common";
import { ImpactLogicBase, SKILLIMPACTID } from "./ImpactLogicBase";
import { ImpactInfo } from "../ImpactInfo";
import { GlobalApp } from '../../../framework/GlobleApp';


enum OWNPARAMINDEX {
    IDX_DAMAGE = 0,
    IDX_DAMAGE_COLD,
    IDX_DAMAGE_FIRE,
    IDX_DAMAGE_LIGHT,
    IDX_DAMAGE_TYPE,
    IDX_DAMAGE_POWER_RATE,

}

enum DATADESCINDEX {
    IDX_DAMAGE = 0,
    IDX_DAMAGE_COLD,
    IDX_DAMAGE_FIRE,
    IDX_DAMAGE_LIGHT,
    IDX_DAMAGE_TYPE,
    IDX_DAMAGE_POWER_RATE,

}

export class ImpactLogic001 extends ImpactLogicBase {
    public id: number;
    constructor() {
        super();
        this.id = SKILLIMPACTID.SKILLIMPACTID_001;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {
        let damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE);
        this.setDamage(data, damage);
        damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE_FIRE);
        this.setDamageFire(data, damage);
        damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE_COLD);
        this.setDamageCold(data, damage);
        damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE_LIGHT);
        this.setDamageLight(data, damage);
        damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE_TYPE);
        this.setDamageType(data, damage);
        damage = info.getValueByIndex(DATADESCINDEX.IDX_DAMAGE_POWER_RATE);
        this.setDamagePowerRate(data, damage);
        return true;
    }



    public onActive(data: ImpactData, e: entity): void {
        if (!isAlive(e))
            return;
        let damage = this.getDamage(data) + this.getDamageCold(data) + this.getDamageFire(data) + this.getDamageLight(data);
        let atk = GlobalApp.entityManager.getEntityByID(data.castID);
        onDamage(e, atk, data, damage);
    }




    public onInterval(data: ImpactData, e: entity): void {
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

    public setDamageType(data: ImpactData, value: number): void {
        data.setParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_TYPE, value);
    }

    public getDamageType(data: ImpactData): number {
        return data.getParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_TYPE);
    }

    public setDamageCold(data: ImpactData, value: number): void {
        data.setParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_COLD, value);
    }

    public getDamageCold(data: ImpactData): number {
        return data.getParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_COLD);
    }

    public setDamageFire(data: ImpactData, value: number): void {
        data.setParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_FIRE, value);
    }

    public getDamageFire(data: ImpactData): number {
        return data.getParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_FIRE);
    }

    public setDamageLight(data: ImpactData, value: number): void {
        data.setParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_LIGHT, value);
    }

    public getDamageLight(data: ImpactData): number {
        return data.getParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_LIGHT);
    }


    public setDamagePowerRate(data: ImpactData, value: number): void {
        data.setParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_POWER_RATE, value);
    }

    public getDamagePowerRate(data: ImpactData): number {
        return data.getParamByIndex(OWNPARAMINDEX.IDX_DAMAGE_POWER_RATE);
    }

}
