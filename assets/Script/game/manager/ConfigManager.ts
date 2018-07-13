import { SkillInfo, EffectInfo } from "../skill/SkillInfo";
import { SkillInstanceInfo } from "../skill/SkillInstanceInfo";
import { SKillManger } from "../skill/SkillManager";
import { ImpactInfo } from "../skill/ImpactInfo";
import { AttrInfo, AttrArray } from "../attr/AttrInfo";
import { AttrManager, ATTR_DEF } from "../attr/AttrManager";
import { PropManager } from "../attr/PropManager";
import { NpcInfo } from "../npc/NpcInfo";
import { NpcManager } from "../npc/NpcManager";
import { CardInfo } from "../card/CardInfo";
import { CardManager } from "../card/CardManager";
import { CardUpdateInfo } from "../card/CardUpdateInfo";
import { ToolInfo } from "../tool/ToolInfo";
import { ToolManager } from "../tool/ToolManager";
import { ExpConfig } from "../config/ExpConfig";
import { ItemConfig } from "../config/ItemConfig";
import { AchieveConfig } from "../config/AchieveConfig";
import { DropConfig } from "../config/DropConfig";
import { cfg } from "../Cfg";
import { Game } from "../Game";

import { LoadAssetCallBacks } from '../../framework/resource/LoadAssetCallBacks';
import { BaseClass } from '../../framework/base/BaseClass';


export class ConfigManager extends BaseClass {

    public root: string;
    public isOk: number;
    private l: Map<string, any>;
    private assets = [];

    /** 经验表 */
    private m_tb_exp: Array<ExpConfig>;
    /** 物品表 */
    private m_tb_item: Map<number, ItemConfig>;
    /** 成就表 */
    private m_tb_achieve: Map<number, AchieveConfig>;
    /** 掉落表 */
    private m_tb_drop: Map<number, Array<DropConfig>>;
    /** 掉落物品表 */
    private m_tb_dropItem: Map<number, Array<DropConfig>>;


    constructor() {
        super();
        this.l = new Map<string, any>();
        this.isOk = 1;
        this.root = cfg.CONFIGROOT;
        this.assets.push(
            {
                url: "pub_Skill",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_Skill_Data",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_Skill_Impact",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_Attr_Relation",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_npc",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_tools",
                type: JSON
            });


        this.assets.push(
            {
                url: "pub_npc_property",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_card",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_card_update",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_exp",
                type: JSON
            }

        );

        this.assets.push(
            {
                url: "pub_tools",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_achievement",
                type: JSON
            });

        this.assets.push(
            {
                url: "pub_drop",
                type: JSON
            }
        );

    }

    private count: number = 0;
    private hasLoadCount: number = 0;

    public get isLoadOK(): boolean {
        return this.count == this.hasLoadCount;
    }

    public init(): void {
        this.count == this.assets.length;
        let t = [];
        for (this.count = 0; this.count < this.assets.length; ++this.count) {
            t.push({
                url: this.root + this.assets[this.count].url,
                type: this.assets[this.count],
            })
            Game.ResourceMgr.loadAsset(t[this.count].url, new LoadAssetCallBacks(this, this.onAssetsLoaded, null), null)
        }
    }

    private onAssetsLoaded(e: any): void {
        this.l.set(e[0], e[1]);
        this.hasLoadCount += 1;
    }

    public onUpdate(t: number, delta: number): void {

    }

    public initAllConfig(): void {
        let t = this.l.get("pub_Skill");

        for (let i = 0; i < t.length; ++i) {
            let info = new SkillInfo();
            info.skillID = t[i].skill_id;
            info.skillName = t[i].skill_name;
            info.skillIcon = t[i].icon_addr + t[i].icon + ".png";
            info.max_ranger = t[i].max_range;
            info.skillDelay = t[i].action_time;
            info.skill_animate = t[i].skill_animate;
            info.actionName = t[i].skill_action_id;
            info.skillDesc = t[i].description;
            info.skillFullPath = t[i].icon_addr + t[i].icon + ".png";
            info.skillBuffFullPath = t[i].bufficon_addr + t[i].bufficon + ".png";

            info.effect = new Array<EffectInfo>();

            for (let j = 0; j < 4; ++j) {
                let effect = new EffectInfo();
                effect.fullPath = t[i]["effect" + (j + 1) + "_addr"] + t[i]["effect" + (j + 1)];
                let x = 0;
                let y = 0;
                let pos: string = t[i]["effect" + (j + 1) + "_pos"];
                if (pos && pos != "") {
                    let sp: string[] = pos.split(",");
                    x = parseInt(sp[0]);
                    y = parseInt(sp[0]);
                }
                effect.x = x;
                effect.y = y;
                effect.floor = t[i]["effect" + (j + 1) + "_floor"];
                effect.delay = t[i]["effect" + (j + 1) + "_delay"];
                effect.speed = t[i]["speed"];
                effect.type = j + 1;

                effect.time = t[i]["effect_time" + (j + 1)];
                info.effect.push(effect);
            }

            SKillManger.Instance.addSkillInfo(info.skillID, info);
        }


        t = this.l.get("pub_Skill_Data");
        for (let i = 0; i < t.length; ++i) {
            let info = new SkillInstanceInfo();
            info.skillID = t[i].skill_id;
            info.instanceID = t[i].instance_id;
            info.logicID = t[i].logic_id;
            info.logic = Game.skillManager.getSkillLogic(info.logicID);
            info.skillLevel = t[i].skill_level;
            info.cdID = t[i].cooldown_timeid;
            info.cdTime = t[i].cooldown_time;
            info.maxNum = t[i].target_num;
            info.maxRad = t[i].target_range;

            info.param = new Array<number>(5);
            for (let j = 0; j < 4; ++j) {
                info.param[j] = t[i]["para" + (j + 1)];
            }
            SKillManger.Instance.addSkillInstanceInfo(info.instanceID, info);
        }

        t = this.l.get("pub_Skill_Impact");
        for (let i = 0; i < t.length; ++i) {
            let info = new ImpactInfo();
            info.impactID = t[i].impact_id;
            info.totalTime = t[i].continuance;
            info.logicID = t[i].logic_id;
            info.overTimeFlag = t[i].overtime_flag;
            info.groupID = t[i].mutex_id;
            info.priority = t[i].priority;
            info.standFlag = t[i].stand_flag;
            info.maxNum = t[i].stack_layer;

            info.value = new Array<number>(25);
            for (let j = 0; j < 24; ++j) {
                info.value[j] = t[i]["para" + (j + 1)];
            }


            SKillManger.Instance.addImpactInfo(info.impactID, info);
        }


        t = this.l.get("pub_Attr_Relation");
        for (let i = 0; i < t.length; ++i) {
            let info = new AttrInfo();
            info.attrNum = t[i].attr;
            info.basePercent = t[i].percent_attr;

            AttrManager.Instance.addAttrInfo(info.attrNum, info);

        }


        t = this.l.get("pub_npc_property");
        for (let i = 0; i < t.length; ++i) {
            let info = new AttrArray();
            info.attr = new Array<number>();
            for (let j = 1; j < ATTR_DEF.ATTR_MAX; ++j) {
                info.attr[j] = t[i]["attr_" + j];
            }

            PropManager.Instance.addProp(t[i].id, info);
        }


        t = this.l.get("pub_npc");
        for (let i = 0; i < t.length; ++i) {
            let info = new NpcInfo();
            info.attrID = t[i].attr_id;
            info.attType = t[i].attack_type;
            info.npcID = t[i].npc_id;
            info.resID = t[i].res_id;
            info.watchRad = t[i].watchrad;
            info.resFullPath = t[i].res_id_addr + info.resID;
            info.skillID = t[i].skill_id;
            info.AIID = t[i].ai_id;

            NpcManager.Instance.addNpcInfo(info.npcID, info);
        }


        t = this.l.get("pub_card");
        for (let i = 0; i < t.length; ++i) {
            let info = new CardInfo();
            info.cardID = t[i].card_id;
            info.cardName = t[i].card_name;
            info.cardDecs = t[i].card_desc;
            info.cardSort = t[i].card_sort;
            info.cardSortDecs = t[i].sort_desc;
            info.cardCost = t[i].card_cost;
            info.deployTime = t[i].deploy_time;
            info.cardNpcID = t[i].npc_id;
            info.cardIcon = t[i].ui_icon;
            info.iconFull = t[i].ui_icon_addr + info.cardIcon + ".png";
            info.drawIcon = t[i].ui_draw;
            info.drawIconPath = t[i].ui_draw_addr;
            info.drawFull = info.drawIconPath + info.drawIcon + ".png";
            info.drawShadowFull = info.drawIconPath + info.drawIcon + "y.png";
            info.skillID = t[i].skill_id;
            info.updateID = t[i].update_id;
            info.color = t[i].card_rare;
            info.skill_id1 = t[i].skill_id1;
            info.skillId1Desc = t[i].skill_desc1;
            info.skill_id2 = t[i].skill_id2;
            info.skillId2Desc = t[i].skill_desc2;


            info.passiveSkill = new Array<number>();
            for (let j = 0; j < 2; ++j) {
                info.passiveSkill.push(t[i]["skill_id" + (j + 1)]);
            }
            CardManager.Instance.addCardInfo(info.cardID, info);
        }

        t = this.l.get("pub_card_update");
        for (let i = 0; i < t.length; ++i) {
            let info = new CardUpdateInfo();
            info.cardLevel = t[i].card_level;
            info.cardUpdateID = t[i].update_id;
            info.id = info.cardUpdateID * 100 + info.cardLevel;
            info.cardCostItem = t[i].item_id;
            info.cardCostItemNum = t[i].cost_item;
            info.cardCostMoney = t[i].cost_money;
            info.getItemNum = t[i].add_item;
            info.getCoin = t[i].add_money;


            CardManager.Instance.addCardUpdateInfo(info.id, info);
        }

        t = this.l.get("pub_tools");
        for (let i = 0; i < t.length; ++i) {
            let info = new ToolInfo();
            info.toolID = t[i].tool_id;
            info.toolName = t[i].tool_name;
            info.toolDecs = t[i].tool_desc;
            info.icon = t[i].tool_icon;
            info.iconPath = t[i].tool_icon_addr;
            info.iconFull = info.iconPath + info.icon;
            info.sort = t[i].tool_sort;
            info.color = t[i].tool_color;

            ToolManager.Instance.addToolInfo(info.toolID, info);
        }

        this.initExpConfig();
        this.initItemConfig();
        this.initAchieveConfig();
        this.initDropConfig();

    }


    private initExpConfig() {
        this.m_tb_exp = new Array<ExpConfig>();
        let t = this.l.get("pub_exp");
        for (let i = 0; i < t.length; i++) {
            let info = new ExpConfig();
            info.init(t[i]);
            this.m_tb_exp.push(info);
        }
    }

    private initItemConfig() {
        this.m_tb_item = new Map<number, ItemConfig>();
        let t = this.l.get("pub_tools");
        for (let i = 0; i < t.length; i++) {
            let info = new ItemConfig();
            info.init(t[i]);
            this.m_tb_item.set(info.tool_id, info);
        }
    }


    /** 根据玩家经验获取对应的经验配置信息（登记+经验上限） */
    public getExpCfgByExp(exp: number): ExpConfig {
        let cfg: ExpConfig;
        for (let index = 0; index < this.m_tb_exp.length; index++) {
            let element = this.m_tb_exp[index];
            if (element.exp > exp) {
                if (index > 0) {
                    cfg = this.m_tb_exp[index - 1];
                }
                else {
                    cfg = this.m_tb_exp[0];
                }
                break;
            }
        }
        if (cfg == null && this.m_tb_exp.length > 0) {
            cfg = this.m_tb_exp[this.m_tb_exp.length - 1];
        }
        return cfg;
    }

    /** 根据物品ID获取物品配置信息 */
    public getItem(tool_id: number): ItemConfig {
        return this.m_tb_item.get(tool_id);
    }

    /** 初始化掉落配置表 */
    private initDropConfig() {
        this.m_tb_drop = new Map<number, Array<DropConfig>>();
        let t = this.l.get("pub_drop");
        for (let i = 0; i < t.length; i++) {
            let info = new DropConfig();
            info.init(t[i]);

            let dropList: Array<DropConfig> = this.m_tb_drop.get(info.drop_id);
            if (dropList == null) {
                dropList = new Array<DropConfig>();
                this.m_tb_drop.set(info.drop_id, dropList);
            }
            dropList.push(info);
        }
    }

    /**
     * 根据掉落ID获取对应的掉落物品列表
     * @param dropId 
     */
    public getDropListById(dropId: number): Array<DropConfig> {
        if (this.m_tb_dropItem == null) {
            this.m_tb_dropItem = new Map<number, Array<DropConfig>>();
        }
        let result = this.m_tb_dropItem[dropId];
        if (result == null) {
            result = new Array<DropConfig>();
            this.m_tb_dropItem[dropId] = result;

            (<Array<DropConfig>>this.m_tb_drop[dropId]).forEach((v, k, s) => {
                if (v.drop_data_type == 2) {
                    this.getDropItemById(v.drop_item_id, result);
                }
                else if (v.drop_data_type == 3) {
                    v.drop_item_id = cfg.CommonCoinID;
                    result.push(v);
                }
                else if (v.drop_data_type == 4) {
                    v.drop_item_id = cfg.GoldID;
                    result.push(v);
                }
                else if (v.drop_data_type == 5) //经验
                {

                }
                else {
                    result.push(v);
                }
            });
        }

        return result;
    }

    private getDropItemById(dropId: number, source: Array<DropConfig>): void {
        let list = this.getDropListById(dropId);
        list.forEach((v, k, s) => {
            source.push(v);
        })
    }

    /** 初始化成就配置表 */
    private initAchieveConfig() {
        this.m_tb_achieve = new Map<number, AchieveConfig>();
        let t = this.l.get("pub_achievement");
        for (let i = 0; i < t.length; i++) {
            let info = new AchieveConfig();
            info.init(t[i]);
            this.m_tb_achieve.set(info.ar_id, info);
        }
    }

    /**
     * 获取成就配置信息
     * @param ar_id 
     */
    public getAchievementById(ar_id: number): AchieveConfig {
        return this.m_tb_achieve.get(ar_id);
    }

    public getAchievementListBySort(): Array<AchieveConfig> {
        return null;
    }
}