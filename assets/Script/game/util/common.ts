import { entity } from "../../framework/entity/Entity";
import { BuffAttrListComponent } from "../entity/component/BuffAttrListComponent";

import { ATTR_DEF, AttrManager } from "../attr/AttrManager";
import { IsDeadComponent } from "../entity/component/IsDeadComponent";
import { HPComponent } from "../entity/component/HPComponent";
import { GlobalApp } from "../../framework/GlobleApp";

import { GameEvent } from "../base/GameEvent";
import { AttrInfo } from "../attr/AttrInfo";
import { BaseAttrComponent } from "../entity/component/BaseAttrComponent";
import { PropManager } from "../attr/PropManager";
import { SkillComponent } from "../entity/component/SkillComponent";
import { PostionComponent } from "../entity/component/PostionComponent";
import { AABBComponent } from "../entity/component/AABBComponent";
import { CDListComponent } from "../entity/component/CDListComponent";
import { EnemyComponent } from "../entity/component/EnemyComponent";
import { SpecialStateListComponent } from "../entity/component/SpecialStateListComponent";
import { Entity_Type } from '../entity/EntityType';
import { PlayerBag, ItemTool } from "../gameobj/Bag";
import { PLAYER_BAG_TYPE } from "../gameobj/Player";
import { ImpactData } from "../skill/ImpactData";
import { ImpactLogicBase } from "../skill/impactlogic/ImpactLogicBase";
import { SKillManger, SPECIAL_STATE } from "../skill/SkillManager";
import { Game } from "../Game";
import { CDData } from "../skill/CDData";

/**
 * 处理伤害
 * @param me 被攻击者
 * @param atk 攻击者
 * @param impact 效果
 * @param damage 伤害
 */
export function onDamage(me: entity, atk: entity, impact: ImpactData, damage: number): void {
    let buf: BuffAttrListComponent = <BuffAttrListComponent>atk.getCompnentByType(BuffAttrListComponent);
    if (buf && damage > 0 && atk) {
        for (let i = buf.buffAttrList.length - 1; i >= 0; --i) {
            buf.buffAttrList[i].logic.onDamageTarget(impact, atk, me, damage);
        }
    }

    buf = <BuffAttrListComponent>me.getCompnentByType(BuffAttrListComponent);
    if (buf && damage > 0) {
        for (let i = buf.buffAttrList.length - 1; i >= 0; --i) {
            damage = buf.buffAttrList[i].logic.onByDamage(buf.buffAttrList[i], me, atk, damage);
        }
    }


    //处理减伤
    if (damage > 0) {

        let def = getAttrValue(me, ATTR_DEF.ATTR_DEF_DEF);
        if (def > 90) {
            def = 90;
        }

        damage = damage * (100 - def) / 100;
    }

    this.refixHp(me, atk, impact, damage);


}


export function refixHp(me: entity, atk: entity, impact: ImpactData, damage: number): void {
    let hp: HPComponent = <HPComponent>me.getCompnentByType(HPComponent);
    hp.curHP -= damage;

    if (hp.curHP <= 0) {
        //需要抛出血量变化
        let dead: IsDeadComponent = <IsDeadComponent>me.getCompnentByType(IsDeadComponent);
        if (dead && atk && dead.hpDead == false) {
            dead.hpDead = true;
            let buf = <BuffAttrListComponent>atk.getCompnentByType(BuffAttrListComponent);
            if (buf && damage > 0) {
                for (let i = buf.buffAttrList.length - 1; i >= 0; --i) {
                    buf.buffAttrList[i].logic.onKill(buf.buffAttrList[i], atk, me);
                }
            }
        }


        hp.curHP = 0;
    }
    GlobalApp.EventMgr.dispatchEvent(GameEvent.GameEventDef_Damage, [me.id]);
}


/**
 * 判定是否存活
 * @param e 
 */
export function isAlive(e: entity): boolean {
    let ret = false;
    let t = <IsDeadComponent>e.getCompnentByType(IsDeadComponent);
    if (t) {
        if (t.isDead == false)
            ret = true;
    }
    return ret;
}

export function getHP(e: entity): number {
    if (!e)
        return 0;
    let ret = 0;
    let hp = <HPComponent>e.getCompnentByType(HPComponent);
    if (hp) {
        ret = hp.curHP;
    }

    return ret;
}

/**
 * 获得并计算属性值
 * @param e 
 * @param index 
 */
export function getAttrValue(e: entity, index: number): number {
    if (!e)
        return 0;
    let ret = 0;
    //todo 暂时没有处理快速计算问题
    let attrInfo: AttrInfo = AttrManager.Instance.getAttrInfo(index);
    if (attrInfo) {
        let baseValue: number = 0;
        let baseComponent:BaseAttrComponent = <BaseAttrComponent>e.getCompnentByType(BaseAttrComponent);
        if (baseComponent) {
            baseValue = getBaseAttrValue(baseComponent, index);
        }

        /*
        let value1 = 0;
        if (attrInfo.baseAttr1 > 0) {
            value1 = getAttrValue(e, attrInfo.baseAttr1);

        }
        
        let value2 = 0;
        if (attrInfo.baseAttr2 > 0) {
            value2 = getAttrValue(e, attrInfo.baseAttr2);
        }
        */
        let impactValue = 0;
        impactValue = getImpactAttrRefix(e, index);

        let impactPerValue = 0;
        impactPerValue = getImpactAttrRefix(e, attrInfo.basePercent);


        let percent: number = 0;
        if (attrInfo.basePercent > 0) {
            percent = getAttrValue(e, attrInfo.basePercent);
        }

        let perTotal = (100 + percent + impactPerValue);
        if (perTotal <= 0) {
            perTotal = 0;
        }

        let totalValue = (baseValue + impactValue);
        if (totalValue <= 0) {
            totalValue = 0;
        }

        ret = totalValue * perTotal / 100;
    }

    return ret;
}


function getBaseAttrValue(base: BaseAttrComponent, index: number): number {
    let ret = 0;
    let t = PropManager.Instance.getProp(base.baseAttr);

    ret = t.attr[index];
    if (!ret)
        ret = 0;
    return ret;
}


export function getImpactAttrRefix(e: entity, index: number): number {
    if (!e)
        return 0;
    let ret = 0;
    let t: BuffAttrListComponent = <BuffAttrListComponent>e.getCompnentByType(BuffAttrListComponent);
    if (t) {
        for (let i = 0; i < t.buffAttrList.length; ++i) {
            let impact: ImpactData = t[i];
            let logic: ImpactLogicBase = SKillManger.Instance.getImpactLogic(impact.logicID);
            if ((impact.isFaseOut() == false) && (impact.isOverTime())) {
                ret += logic.getIntAttrRefix(impact, e, index);
            }
        }
    }

    return ret;
}

/**
 * 获得技能等级
 * @param e 
 * @param skill 
 */
export function getSkillLevel(e: entity, skill: number): number {
    if (!e)
        return 1;
    let ret = 0;
    let t: SkillComponent = <SkillComponent>e.getCompnentByType(SkillComponent);
    for (let i = 0; i < t.skillList.length; ++i) {
        if (t.skillList[i].skillID === skill) {
            ret = t.skillList[i].level;
            break;
        }
    }
    return ret;
}

/**
 * 获得技能实例id
 * @param e 
 * @param skill 
 */
export function getSkillInstanceID(e: entity, skill: number): number {
    if (!e)
        return 0;
    let ret = 0;
    let t: SkillComponent = <SkillComponent>e.getCompnentByType(SkillComponent);
    for (let i = 0; i < t.skillList.length; ++i) {
        if (t.skillList[i].skillID === skill) {
            ret = t.skillList[i].level;
            break;
        }
    }

    ret = skill * 100 + ret;
    return ret;
}

/**
 * 获得起始对象和目标对象的aabb距离
 * @param from 起始
 * @param to 目标
 */
export function getAABBDis(from: entity, to: entity): number {
    if (!from || !to) {
        return 99999;
    }
    let ret = 0;
    let sPos = <PostionComponent>from.getCompnentByType(PostionComponent);
    let tPos = <PostionComponent>to.getCompnentByType(PostionComponent);
    if (sPos && tPos) {
        let tx = sPos.x - tPos.x;
        let ty = sPos.y - tPos.y;

        let aabb = <AABBComponent>to.getCompnentByType(AABBComponent);
        if (aabb) {
            let halfX = aabb.w / 2;
            let halfY = aabb.h / 2;
            if (Math.abs(ty) < halfY) {
                ret = Math.abs(tx);
            }
            else {
                //不再y范围的话，需要调整到y范围,先简单处理
                ret = Math.sqrt(tx * tx + ty * ty);
            }
        }
        else {
            ret = Math.sqrt(tx * tx + ty * ty);
        }

    }


    return ret;
}

/**
 * 设置cd
 * @param e 
 * @param id 
 * @param time 
 */
export function setCD(e: entity, id: number, time: number) {
    let cd: CDListComponent = <CDListComponent>e.getCompnentByType(CDListComponent);
    if (!cd) {
        return;
    }

    for (let i = 0; i < cd.CDList.length; ++i) {
        let t = cd.CDList[i];
        if (t.cdID == id) {
            t.cdID = time;
            return;
        }
    }

    let n = new CDData();
    n.cdID = id;
    n.isOffline = false;
    n.LastTime = time;

    cd.CDList.push(n);
}

export function cdCheck(e: entity, id: number): boolean {
    let ret = true;

    let cd: CDListComponent = <CDListComponent>e.getCompnentByType(CDListComponent);
    if (!cd) {
        return true;
    }

    for (let i = 0; i < cd.CDList.length; ++i) {
        let t = cd.CDList[i];
        if (t.cdID == id) {
            if (t.LastTime > 0) {
                return false;
            }
        }
    }


    return ret;
}

export function checkCanUseSKill(e: entity, skillID: number, level: number): boolean {
    let ret = false;

    let skillInfo = SKillManger.Instance.getSkillInfo(skillID);
    //todo 暂时处理为距离判定，理论上，需要根据逻辑id，来进行重载，有些不需要目标
    let enemy = (<EnemyComponent>e.getCompnentByType(EnemyComponent));
    if (enemy && enemy.enemyID > 0) {
        let tar = Game.entityManager.getEntityByID(enemy.enemyID);
        if (tar) {
            let tarDead: IsDeadComponent = <IsDeadComponent>tar.getCompnentByType(IsDeadComponent);
            if (tarDead && tarDead.isDead) {
                return false;
            }

            let dis = getAABBDis(e, tar);
            if (dis < skillInfo.max_ranger) {
                if (!SKillManger.Instance.commonCheck(e)) {
                    return false;
                }


                let skillInstance = SKillManger.Instance.getSkillInstanceInfo(level, skillID);


                //cd判定
                if (!cdCheck(e, skillInstance.cdID)) {
                    return false;
                }

                return true;
            }
        }
    }
    return ret;
}


//友好 返回 1 敌对 返回2 中立 返回3
export function getCampRelation(camp1: number, camp2: number): number {
    if (camp1 == camp2)
        return 1;


    return 2;
}


export function getSpecialState(e: entity, index: SPECIAL_STATE): number {
    let ret = 0;
    let c = <SpecialStateListComponent>e.getCompnentByType(SpecialStateListComponent);
    if (c) {
        ret = c.list[index];
    }

    return ret;
}


export function getAttackTypeIsCan(attType: number, tarType: number): boolean {
    if (attType == 2) {
        if (tarType != Entity_Type.Entity_Type_Castle) {
            return false;
        }
    }
    return true;
}





export function getBagToolNum(bag: PlayerBag, id: number): number {
    let ret = 0;
    bag.pool.forEach((v, k, m) => {
        let item: ItemTool = <ItemTool>v;
        if (item.tool.toolID == id) {
            ret += item.num;
        }
    });

    return ret;
}


export function getSelfBagToolNum(id: number): number {
    let player = Game.playerManager.getSelfPlayer();
    let bag: PlayerBag = <PlayerBag>player.bag.pool.get(PLAYER_BAG_TYPE.ITEMTOOL);

    let ret = 0;
    ret = getBagToolNum(bag, id);
    return ret;
}

/** 道具ID类型 */
export enum IDType {
    INVALID = 0,
    CARD = 1,
    ITEM = 2,
    BOX = 3
}

/** 根据道具ID获取道具类型（表级别） */
export function getIDType(id: number): number {
    if (id < 30000) {
        return IDType.CARD;
    }
    if (Math.floor(id / 1000) == 32) {
        return IDType.BOX;
    }
    return IDType.ITEM;
}



