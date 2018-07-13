import { ItemCard, MaxNumContainer, PlayerBag, Container, ItemTool } from "./Bag";
import { CardDataInfo } from "../card/CardDataInfo";
import { cfg } from "../Cfg";
import { ToolDataInfo } from "../tool/ToolDataInfo";
import { AchievementData } from "./AchievementData";
import { BattleBoxData } from "./BattleBoxData";
import { Game } from "../Game";
import { iGameComponent } from './component/IGameComponent';
import { PlayerData } from './component/PlayerData';




export enum PLAYERROOMSTATE {
    PLAYERROOMSTATE_IDLE = 1,
    PLAYERROOMSTATE_INROOM = 5,
    PLAYERROOMSTATE_LEFT = 10,
}


/** 玩家背包類型 */
export enum PLAYER_BAG_TYPE {
    HERO = 1, //英雄庫
    CARD = 2, //卡牌庫
    ITEMTOOL = 3,//合成碎片库
}

export class Player {
    public uID: number;//用户id

    private componentInfo: Map<string, iGameComponent>;
    public addComponent(c: iGameComponent) {
        c.onInit(this);
        this.componentInfo.set(c.getName(), c);
    }

    public getComponent(name: string): iGameComponent {
        return this.componentInfo.get(name);
    }




    public onUpdate(delta: number, realDelta: number) {
        this.componentInfo.forEach((v, k, m) => {
            v.onUpdate(delta, realDelta);
        });
    }


    public onShutDown() {
        this.componentInfo.forEach((v, k, m) => {
            v.onShutDown();
        });
    }


    //辅助方法

    public getPlayerData(): PlayerData {
        let t: PlayerData = <PlayerData>this.getComponent("PlayerData");
        return t;
    }




    public bag: PlayerBag; //玩家背包
    public cardConfig: MaxNumContainer; //1开始的 3个卡组  出战卡组配置

    public boxData: BattleBoxData[];
    public achieveData: AchievementData[];
    public achieveRefreshTime: number = 0;
    public achieveRefreshLeftTimes: number = 0;

    public curHeroCardID: number;//当前英雄卡ID 需要同步
    public curGroup: number;//当前组

    public curFight: MaxNumContainer; //当前战斗卡组,需同步
    public curDisplayCards: Array<Container>;//显示卡组 需要同步
    public curCost: number;//当前费用 需要同步

    public ServerTickOffset: number = 0;


    constructor() {

    }

    public init() {
        //todo 注意index，也需要设置
        // this.bag = new PlayerBag;
        // this.bag.index = 1;
        // this.curCost = 10;
        // this.curHeroCardID = 0; //初始英雄卡牌ID
        // this.curGroup = 0; //当前组
        // this.curCost = cfg.START_COST;

        // this.isMain = false;
        // this.playerRoomState = PLAYERROOMSTATE.PLAYERROOMSTATE_IDLE;
        // this.isReady = false;

        // this.cardConfig = new MaxNumContainer;
        // this.cardConfig.maxNum = cfg.cardConfigMaxNum;
        // this.curDisplayCards = new Array<Container>();


        // this.curFight = new MaxNumContainer();
        // this.curFight.maxNum = cfg.cardConfigMaxNum;

        // this.boxData = new Array<BattleBoxData>();
        // this.achieveData = new Array<AchievementData>();
    }

    public initFromInfo(data: any) {
        // console.log("initFromInfo");
        // this.uID = data.player.Uid;
        // this.coin = data.player.Coin == null ? 0 : data.player.Coin;
        // this.rmb = data.player.Treasure == null ? 0 : data.player.Treasure;
        // this.exp = data.player.Exp == null ? 0 : data.player.Exp;
        // this.roleLevel = data.player.Level == null ? 0 : data.player.Level;
        // this.arenaPoint = data.player.ArenaPoint == null ? 0 : data.player.ArenaPoint;
        // this.arenaLevel = data.player.ArenaLevel == null ? 0 : data.player.ArenaLevel;
        // this.openID = data.player.OpenId;

        // // adapter.AdapterManager.Instance.getNick(this.openID, (nick: string) => {
        // //     Log.info("[Player.ts]my nick name is " + nick);
        // //     this.roleName = nick;
        // // }, this);

        // // adapter.AdapterManager.Instance.getHead(this.openID, (head: any) => {
        // //     // this.roleHeadBufferInfo = head;
        // //     this.roleHead = head;
        // // }, this);


        // this.bag.pool.clear();
        // let hero: PlayerBag = new PlayerBag();
        // hero.index = PLAYER_BAG_TYPE.HERO;

        // let card: PlayerBag = new PlayerBag();
        // card.index = PLAYER_BAG_TYPE.CARD;
        // this.bag.addItem(hero.index, hero);
        // this.bag.addItem(card.index, card);

        // let itemTool: PlayerBag = new PlayerBag();
        // itemTool.index = PLAYER_BAG_TYPE.ITEMTOOL;
        // this.bag.addItem(itemTool.index, itemTool);

        // let heroStart = 1;
        // let cardStart = 1;
        // let cards = data.player.Cards;
        // for (let i = 0; i < cards.length; ++i) {
        //     let c = cards[i];
        //     let id = c.Id;
        //     let cardInfo = Game.cardManager.getCardInfo(id);
        //     let t = new ItemCard();
        //     if (cardInfo.cardSort == 1) {
        //         t.card = new CardDataInfo();
        //         t.itemID = id;
        //         t.card.cardID = id;
        //         t.card.exp = 0;
        //         t.card.level = c.Level;
        //         t.card.cardInfo = Game.cardManager.getCardInfo(id);
        //         t.index = cardStart;
        //         t.num = 1;
        //         cardStart += 1;
        //         card.addItem(t.index, t);
        //     }
        //     else if (cardInfo.cardSort == 2) {
        //         t.card = new CardDataInfo();
        //         t.itemID = id;
        //         t.card.cardID = id;
        //         t.card.exp = 0;
        //         t.card.level = c.Level;
        //         t.card.cardInfo = Game.cardManager.getCardInfo(id);
        //         t.index = heroStart;
        //         t.num = 1;
        //         heroStart += 1;
        //         hero.addItem(t.index, t);
        //     }
        // }


        // let getItemTools = data.player.Bag;
        // for (let i = 0; i < getItemTools.length; ++i) {
        //     let c = getItemTools[i];
        //     let id = c.Id;

        //     let t = new ItemTool();

        //     t.tool = new ToolDataInfo;
        //     t.tool.toolID = id;
        //     t.tool.toolInfo = Game.toolManager.getToolInfo(id);
        //     t.itemID = id;
        //     t.num = c.Num;
        //     t.itemID = id;
        //     itemTool.addAutoItem(t);
        // }




        // this.curHeroCardID = data.player.CardCfg.HeroCardId;

        // //card config
        // for (let i = 0; i < data.player.CardCfg.Groups.length; ++i) {
        //     let config = new MaxNumContainer();
        //     config.index = i + 1;
        //     config.maxNum = cfg.cardConfigMaxNum;
        //     this.cardConfig.addItem(config.index, config);
        //     let configCards = data.player.CardCfg.Groups[i].Cards;
        //     for (let j = 0; j < configCards.length; ++j) {
        //         let id = configCards[j];
        //         let cardInfo = Game.cardManager.getCardInfo(id);
        //         let t = new ItemCard();

        //         t.card = new CardDataInfo();
        //         t.itemID = id;
        //         t.card.cardID = id;
        //         t.card.exp = 0;
        //         t.card.level = 1;
        //         t.card.cardInfo = cardInfo;
        //         t.index = j + 1;
        //         t.num = 1;

        //         config.addItem(t.index, t);

        //     }
        // }

        // (<MaxNumContainer>this.cardConfig.pool.get(this.curSelectCardGroup)).pool.forEach((v, k, m) => {
        //     this.curDisplayCards.push(v);
        // }
        // );

        // this.ServerTickOffset = Date.now() - data.player.ServerTick;
        // if (this.ServerTickOffset < 0) {
        //     this.ServerTickOffset = 0;
        // }

        // this.boxData.length = 0;
        // for (let i = 0; i < data.player.Box.length; i++) {
        //     let obj = data.player.Box[i];
        //     let boxObj = new BattleBoxData();
        //     boxObj.id = obj.Id;
        //     boxObj.tick = this.ServerTickOffset;
        //     // boxObj.getTime = obj.GetTime > 0 ? (this.getCurrServerTick() - obj.GetTime) : obj.GetTime;
        //     boxObj.getTime = obj.GetTime;
        //     this.boxData.push(boxObj);
        // }

        // this.achieveData.length = 0;
        // for (let i = 0; i < data.player.Achievements.length; i++) {
        //     let obj = data.player.Achievements[i];
        //     let achieveObj = new AchievementData();
        //     achieveObj.ar_id = obj.ArId;
        //     achieveObj.current = obj.Current;
        //     achieveObj.finished = obj.Finished;
        //     this.achieveData.push(achieveObj);
        // }

        // this.achieveRefreshTime = data.player.NextAchievementTime;
        // this.achieveRefreshLeftTimes = data.player.AchievementRefreshTimes;
    }


    public reset() {

    }






}
