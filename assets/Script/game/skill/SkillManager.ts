import { ImpactLogicBase } from "./impactlogic/ImpactLogicBase";
import { ImpactLogic001 } from "./impactlogic/ImpactLogic001";
import { ImpactLogic016 } from "./impactlogic/ImpactLogic016";
import { ImpactLogic015 } from "./impactlogic/ImpactLogic015";
import { ImpactLogic014 } from "./impactlogic/ImpactLogic014";
import { ImpactLogic013 } from "./impactlogic/ImpactLogic013";
import { ImpactInfo } from "./ImpactInfo";
import { SkillLogicToTarget } from "./skillogic/SkillLogicToTarget";
import { SkillLogicBase } from "./skillogic/SkillLogicBase";
import { SkillInfo } from "./SkillInfo";
import { SkillInstanceInfo } from "./SkillInstanceInfo";
import { SkillLogicToSelfGround } from "./skillogic/SkillLogicToSelfGround";
import { SkillLogicToPointGround } from "./skillogic/SkillLogicToPointGround";
import { SkillLogicToSelf } from "./skillogic/SkillLogicToSelf";
import { ImpactLogic002 } from "./impactlogic/ImpactLogic002";
import { ImpactLogic005 } from "./impactlogic/ImpactLogic005";
import { ImpactLogic006 } from "./impactlogic/ImpactLogic006";
import { ImpactLogic007 } from "./impactlogic/ImpactLogic007";
import { ImpactLogic008 } from "./impactlogic/ImpactLogic008";
import { ImpactLogic009 } from "./impactlogic/ImpactLogic009";
import { ImpactLogic010 } from "./impactlogic/ImpactLogic010";
import { ImpactLogic011 } from "./impactlogic/ImpactLogic011";
import { ImpactLogic012 } from "./impactlogic/ImpactLogic012";
import { CurCastSkillComponent } from "../entity/component/CurCastSkillComponent";
import { entity } from "../../framework/entity/Entity";
import { IsDeadComponent } from "../entity/component/IsDeadComponent";
import { ImpactData, ImpactDataFlag } from "./ImpactData";
import { BuffAttrListComponent } from "../entity/component/BuffAttrListComponent";
import { ATTR_DEF } from "../attr/AttrManager";
import { getAttrValue } from "../util/common";
import { SkillLogicToTargetAndGround } from "./skillogic/SkillLogicToTargetAndGround";
import { Game } from "../Game";


export enum SKILL_ERROR {
    SKILL_ERROR_OK = 0,

    SKILL_ERROR_SELF_DEAD = 1,

}
export enum SPECIAL_STATE {
    SPECIAL_STATE_UNBEATABLE = 0,//无敌
    SPECIAL_STATE_UNATTACK = 1,//无法被攻击
    SPECIAL_STATE_STUN = 2,//眩晕


    SPECIAL_STATE_MAX,
}




export class SKillManger {
    public static readonly Instance: SKillManger = new SKillManger();

    private skillLogicPool: Map<number, SkillLogicBase>;
    private skillInfoPool: Map<number, SkillInfo>;
    private skillInstancePool: Map<number, SkillInstanceInfo>;

    private impactInfoPool: Map<number, ImpactInfo>;
    private impactLogicPool: Map<number, ImpactLogicBase>;




    public init(): void {

        //手动注册所有的逻辑
        this.skillLogicPool = new Map<number, SkillLogicBase>();
        let t = new SkillLogicToTarget();
        this.skillLogicPool.set(t.id, t);

        t = new SkillLogicToSelfGround();
        this.skillLogicPool.set(t.id, t);
        t = new SkillLogicToTargetAndGround();
        this.skillLogicPool.set(t.id, t);
        t = new SkillLogicToPointGround();
        this.skillLogicPool.set(t.id, t);
        t = new SkillLogicToSelf();
        this.skillLogicPool.set(t.id, t);



        //手动注册所有的逻辑
        this.impactLogicPool = new Map<number, ImpactLogicBase>();
        let imp1 = new ImpactLogic001();
        this.impactLogicPool.set(imp1.id, imp1);
        let imp2 = new ImpactLogic002();
        this.impactLogicPool.set(imp2.id, imp2);

        let imp5 = new ImpactLogic005();
        this.impactLogicPool.set(imp5.id, imp5);
        let imp6 = new ImpactLogic006();
        this.impactLogicPool.set(imp6.id, imp6);
        let imp7 = new ImpactLogic007();
        this.impactLogicPool.set(imp7.id, imp7);
        let imp8 = new ImpactLogic008();
        this.impactLogicPool.set(imp8.id, imp8);
        let imp9 = new ImpactLogic009();
        this.impactLogicPool.set(imp9.id, imp9);
        let imp10 = new ImpactLogic010();
        this.impactLogicPool.set(imp10.id, imp10);
        let imp11 = new ImpactLogic011();
        this.impactLogicPool.set(imp11.id, imp11);
        let imp12 = new ImpactLogic012();
        this.impactLogicPool.set(imp12.id, imp12);
        let imp13 = new ImpactLogic013();
        this.impactLogicPool.set(imp13.id, imp13);
        let imp14 = new ImpactLogic014();
        this.impactLogicPool.set(imp14.id, imp14);
        let imp15 = new ImpactLogic015();
        this.impactLogicPool.set(imp15.id, imp15);
        let imp16 = new ImpactLogic016();
        this.impactLogicPool.set(imp16.id, imp16);




        this.skillInfoPool = new Map<number, SkillInfo>();
        this.skillInstancePool = new Map<number, SkillInstanceInfo>();
        this.impactInfoPool = new Map<number, ImpactInfo>();



    }

    public addImpactInfo(id: number, info: ImpactInfo): void {
        this.impactInfoPool.set(id, info);
    }

    public getImpactInfo(id: number): ImpactInfo {
        let ret = this.impactInfoPool.get(id);
        return ret;
    }




    public addSkillInfo(id: number, info: SkillInfo): void {
        this.skillInfoPool.set(id, info);
    }

    public getSkillInfo(id: number): SkillInfo {
        let ret = this.skillInfoPool.get(id);
        return ret;
    }

    public addSkillInstanceInfo(id: number, info: SkillInstanceInfo): void {
        this.skillInstancePool.set(id, info);
    }

    public getSkillInstanceInfo(level: number, skill: number): SkillInstanceInfo {
        let ret = this.skillInstancePool.get(skill * 100 + level);
        return ret;
    }

    public getSkillInstanceInfoByInstanceID(id: number): SkillInstanceInfo {
        let ret = this.skillInstancePool.get(id);
        return ret;
    }



    public commonCheck(e: entity): boolean {
        let curskill: CurCastSkillComponent = <CurCastSkillComponent>e.getCompnentByType(CurCastSkillComponent);
        if (!curskill) {
            return false;
        }

        let dead: IsDeadComponent = <IsDeadComponent>e.getCompnentByType(IsDeadComponent);
        if (dead && dead.isDead == true) {
            curskill.curErr = SKILL_ERROR.SKILL_ERROR_SELF_DEAD;
            return false;
        }





        return true;
    }

    public getSkillLogic(id: number): SkillLogicBase {
        let ret: SkillLogicBase = this.skillLogicPool.get(id);
        if (!ret)
            console.log("no this skill logic")

        return ret;
    }


    public getImpactLogic(id: number): ImpactLogicBase {
        let ret: ImpactLogicBase = this.impactLogicPool.get(id);
        if (!ret)
            console.log("no this impact logic")

        return ret;
    }

    public initImpactData(index: number, impact: ImpactData): void {
        let impactInfo = this.getImpactInfo(index);

        let impactLogic = this.getImpactLogic(impactInfo.logicID);

        impact.reset();
        impact.impactID = impactInfo.impactID;
        impact.logicID = impactInfo.logicID;
        impact.logic = Game.skillManager.getImpactLogic(impactInfo.logicID);
        impact.intervalTime = impactInfo.tickTime;
        impact.totalTime = impactInfo.totalTime;

        impact.setInfo(impactInfo);
        impactLogic.initImpactData(impact, impactInfo);

    }


    public registerImpact(recv: entity, send: entity, impactData: ImpactData, hitFlag: number): void {
        //todo 简单处理
        this.activeImpact(recv, impactData);


    }


    public activeImpact(recv: entity, impactData: ImpactData): void {
        let logic = SKillManger.Instance.getImpactLogic(impactData.logicID);
        logic.onActive(impactData, recv);
        if (impactData.isOverTime()) {
            //需要处理或者清理覆盖
            if (impactData.isOverTime()) {
                let list: BuffAttrListComponent = <BuffAttrListComponent>recv.getCompnentByType(BuffAttrListComponent);
                if (list) {
                    let isCanAdd = true;
                    let totalNum = 0;
                    for (let i = 0; i < list.buffAttrList.length; ++i) {
                        let buf = list.buffAttrList[i];
                        let impactInfo = buf.getInfo();
                        if (impactInfo.groupID == impactData.getInfo().groupID) {
                            if (impactInfo.maxNum == 1) {
                                if (impactInfo.priority < impactData.getInfo().priority) {
                                    buf.flag.setFlag(ImpactDataFlag.FADE_OUT);
                                    break;
                                }
                                else {
                                    isCanAdd = false;
                                }
                            }
                            else {
                                totalNum += 1;
                            }
                        }
                    }
                    if (totalNum >= impactData.getInfo().maxNum) {
                        isCanAdd = false;
                    }

                    if (isCanAdd)
                        list.buffAttrList.push(impactData);
                }

            }
        }
    }

    public getCombatReslut(logic: ImpactLogic001, imp: ImpactData, self: entity, tar: entity, flag: number): void {
        let damage = this.getDamageCore(logic, self, tar, flag, imp);
        logic.setDamage(imp, damage);
    }

    public getDamageCore(logic: ImpactLogic001, self: entity, tar: entity, flag: number, imp: ImpactData): number {
        let ret = 0;
        let atk = getAttrValue(self, ATTR_DEF.ATTR_DEF_ATK);
        //console.log("atk is:" + atk);

        ret = atk;
        ret += logic.getDamage(imp);
        return ret;
    }

}
