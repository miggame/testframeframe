import { Player } from "./Player";
import { BaseClass } from '../../framework/base/BaseClass';


export class PlayerManager extends BaseClass {

    private players: Array<Player>;

    public init(): void {
        this.players = new Array<Player>();
        // app.AppMain.Instance.netManager.onMsg("NotifyPlayerBag", this, this.onPlayerBagChange);
        // app.AppMain.Instance.netManager.onMsg("NotifyPlayerCard", this, this.onPlayerCardChange);
        // app.AppMain.Instance.netManager.onMsg("NotifyPlayerData", this, this.onPlayerInfoChange);
        // app.AppMain.Instance.netManager.onMsg("NotifyPlayerBox", this, this.onUpdatePlayerBoxData);
        // app.AppMain.Instance.netManager.onMsg("NotifyPlayerAchieve", this, this.onUpdatePlayerAchievementData);
        // app.AppMain.Instance.netManager.onMsg("NotifyPlayerAchieveRefresh", this, this.onRefreshPlayerAchievementData);

    }



    public onPlayerBagChange(e: any) {
        console.log("bag change:" + JSON.stringify(e));

        // let player = app.AppMain.Instance.playerManager.getSelfPlayer();
        // let bag: PlayerBag = <PlayerBag>player.bag.pool.get(PLAYER_BAG_TYPE.ITEMTOOL);
        // for (let i = 0; i < e.deleted.length; ++i) {
        //     let t = e.deleted[i];

        //     bag.delItemById(parseInt(t));
        // }


        // for (let i = 0; i < e.bag.length; ++i) {
        //     let t = e.bag[i];
        //     let item = new ItemTool;
        //     item.itemID = t.Id;
        //     item.num = t.Num;
        //     item.tool = new ToolDataInfo;
        //     item.tool.toolID = t.Id;
        //     item.tool.toolInfo = app.AppMain.Instance.toolManager.getToolInfo(t.Id);
        //     bag.addAutoItem(item);
        // }


        // GlobalApp.EventMgr.dispatchEvent(GameEventDef.GameEvent_Game_Bag_Change);

    }


    public onPlayerCardChange(e: any) {
        console.log("card change:" + JSON.stringify(e));
        // let player = app.AppMain.Instance.playerManager.getSelfPlayer();
        // let bag: PlayerBag = <PlayerBag>player.bag.pool.get(PLAYER_BAG_TYPE.CARD);
        // let bagHero: PlayerBag = <PlayerBag>player.bag.pool.get(PLAYER_BAG_TYPE.HERO);
        // for (let i = 0; i < e.deleted.length; ++i) {
        //     let t = e.deleted[i];
        //     bag.delItemById(parseInt(t));
        //     bagHero.delItemById(parseInt(t));
        // }

        // for (let i = 0; i < e.card.length; ++i) {
        //     let t = e.card[i];
        //     let item = new ItemCard;
        //     item.itemID = t.Id;
        //     item.num = 1;
        //     item.card = new card.CardDataInfo;
        //     item.card.cardID = t.Id;
        //     item.card.cardInfo = app.AppMain.Instance.cardManager.getCardInfo(t.Id);
        //     item.card.level = t.Level;
        //     if (item.card.cardInfo.cardSort == 2) {
        //         bagHero.addAutoItem(item);
        //     }
        //     else if (item.card.cardInfo.cardSort == 1) {
        //         bag.addAutoItem(item);
        //     }

        // }

        // GlobalApp.EventMgr.dispatchEvent(GameEventDef.GameEvent_Game_Card_Change, [e]);
    }

    public onPlayerInfoChange(e: any) {
        console.log("info change:" + JSON.stringify(e));
        // let player = app.AppMain.Instance.playerManager.getSelfPlayer();
        // if (e.Exp) {
        //     player.exp = parseInt(e.Exp);
        // }

        // if (e.Level) {
        //     player.roleLevel = parseInt(e.Level);
        // }

        // if (e.Coin) {
        //     player.coin = parseInt(e.Coin);
        // }

        // if (e.Treasure) {
        //     player.rmb = parseInt(e.Treasure);
        // }

        // if (e.ArenaPoint) {
        //     player.arenaPoint = parseInt(e.ArenaPoint);
        // }

        // if (e.ArenaLevel) {
        //     player.arenaLevel = parseInt(e.ArenaLevel);
        // }

        // GlobalApp.EventMgr.dispatchEvent(GameEventDef.GameEvent_PlayerDataChange);
    }

    public onUpdatePlayerBoxData(data: any) {
        Log.info("onUpdatePlayerBoxData:" + JSON.stringify(data));
        // this.getSelfPlayer().updateBoxData(data);

        // GlobalApp.EventMgr.dispatchEvent(GameEventDef.GameEvent_PlayerBoxDataChange);
    }

    public onUpdatePlayerAchievementData(data: any) {
        Log.info("onUpdatePlayerAchievementData: " + JSON.stringify(data));
        // app.AppMain.Instance.playerManager.getSelfPlayer().updateAchievementData(data);

        // GlobalApp.EventMgr.dispatchEvent(GameEventDef.GameEvent_PlayerAchieveDataChange);
    }

    public onRefreshPlayerAchievementData(data: any) {
        // this.getSelfPlayer().setNextAchievementRefreshTime(data.data);
    }

    public getPlayer(openID: string): Player {
        let ret = null;
        // for (let i = 0; i < this.players.length; ++i) {
        //     if (openID == this.players[i].openID) {
        //         ret = this.players[i];
        //         break;
        //     }
        // }
        return ret;
    }



    public reset() {
        let player = this.getSelfPlayer();
        player.reset();
        this.players.splice(0);
        if (player) {
            this.addPlayer(player);
        }
    }



    public getSelfPlayer(): Player {
        let ret = null;
        // for (let i = 0; i < this.players.length; ++i) {
        //     if (this.players[i].isSelf) {
        //         ret = this.players[i];
        //         break;
        //     }
        // }
        return ret;
    }

    public getOtherPlayer(): Player {
        let ret = null;
        // for (let i = 0; i < this.players.length; ++i) {
        //     if (!this.players[i].isSelf) {
        //         ret = this.players[i];
        //         break;
        //     }
        // }
        return ret;
    }


    public addPlayer(player: Player): void {
        //todo 没有判定
        this.players.push(player);
    }

    public onFrameUpdate(frame: number) {
        // if (frame % 20 == 0) {
        //     for (let i = 0; i < this.players.length; ++i) {
        //         this.players[i].addCost(1);
        //     }

        // }
    }

}



