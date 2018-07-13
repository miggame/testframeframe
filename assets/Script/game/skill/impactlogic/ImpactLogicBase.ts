import { entity } from "../../../framework/entity/Entity";
import { ImpactInfo } from "../ImpactInfo";
import { ImpactData, ImpactDataFlag } from "../ImpactData";
import { cfg } from "../../Cfg";


export enum SKILLIMPACTID {
    SKILLIMPACTID_001 = 1,//分类型伤害
    SKILLIMPACTID_002 = 2,//无类型伤害
    SKILLIMPACTID_005 = 5,//攻击时吸血
    SKILLIMPACTID_006 = 6,//攻击给效果
    SKILLIMPACTID_007 = 7,//被攻击给效果
    SKILLIMPACTID_008 = 8,//眩晕
    SKILLIMPACTID_009 = 9,//修改属性
    SKILLIMPACTID_010 = 10,//护盾
    SKILLIMPACTID_011 = 11,//多倍伤害
    SKILLIMPACTID_012 = 12,//反弹伤害
    SKILLIMPACTID_013 = 13,//死亡时爆炸伤害
    SKILLIMPACTID_014 = 14,//杀死敌人，给自己效果
    SKILLIMPACTID_015 = 15,//失去生命，修改自己属性
    SKILLIMPACTID_016 = 16,//出生时，给与效果
}

export class ImpactLogicBase {
    public id: number;
    constructor() {
        this.id = 0;
    }

    public initImpactData(data: ImpactData, info: ImpactInfo): boolean {
        return true;
    }

    public onUpdate(data: ImpactData, e: entity): void {
        if (this.isOverTimed(data)) {
            data.runTime += cfg.frameTime;
            if (this.isIntervaled(data)) {
                if (data.runTime % data.intervalTime === 0) {
                    this.onInterval(data, e);
                }
            }

            if (data.runTime > data.totalTime) {
                this.onFadeOut(data, e);
                data.flag.setFlag(ImpactDataFlag.FADE_OUT);
            }
        }

    }

    public setDamage(data: ImpactData, value: number): void {

    }
    public getDamage(data: ImpactData): number {
        return 0;
    }

    public isOverTimed(data: ImpactData): boolean {
        return data.getInfo().overTimeFlag > 0;
    }

    public isIntervaled(data: ImpactData): boolean {
        return data.getInfo().tickTime > 0;
    }

    public onActive(data: ImpactData, e: entity): void {

    }


    //buf 消失
    public onFadeOut(data: ImpactData, e: entity): void {

    }

    //其他buf 消失
    public onFadeOutOther(data: ImpactData, toFade: ImpactData, e: entity) {

    }

    public onInterval(data: ImpactData, e: entity): void {
    }

    public onDie(data: ImpactData, e: entity): void {

    }

    public onKill(data: ImpactData, e: entity, tar: entity): void {

    }

    public onSpawn(data: ImpactData, e: entity): void {

    }

    public onUseOk(data: ImpactData, e: entity) {

    }

    public onDamageTarget(data: ImpactData, e: entity, tar: entity, damage: number) {

    }

    public onByDamage(data: ImpactData, e: entity, atk: entity, damage: number): number {
        return damage;
    }


    public getIntAttrRefix(data: ImpactData, e: entity, index: number): number {
        return 0;
    }



}
