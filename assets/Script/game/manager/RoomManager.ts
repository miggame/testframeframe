import { BaseClass } from '../../framework/base/BaseClass';
import { Random } from '../util/Random';

export enum ROOM_STATE {

    ROOM_STATE_INIT = 1000,//房间默认状态，调用了适配

    ROOM_STATE_LOGIN_OK = 1010,//登陆成功
    ROOM_STATE_LOGIN_FAIL = 1020,//登陆失败


    ROOM_STATE_MATCHOK = 1030,//匹配成功


    ROOM_STATE_CREATEFAIL = 1100,//房间创建失败
    ROOM_STATE_JOINFAIL = 1110,//房间加入失败


    ROOM_STATE_CREATEOK = 3000,//房间创建成功
    ROOM_STATE_JOINOK = 3010,//房间加入成功
    ROOM_STATE_ALLREADY = 3020,//房间成员都已准备就绪

    ROOM_STATE_SYNC_OK = 4000,//开始数据同步完成

    ROOM_STATE_READY_START = 5000,//准备开始

    ROOM_STATE_START_OK = 6000,//开始游戏

    ROOM_STATE_END = 7000,//结束游戏，会和离开房间冲突

    ROOM_STATE_LEAVEROOM = 30000,//离开房间



    ROOM_STATE_NETDISCONNET = 50000,//房间掉线
}


export class RoomManager extends BaseClass {

    private roomState: ROOM_STATE;

    private roomID: number;

    private roomSyncInfo: Map<string, number>;

    private playerList: Array<string>;

    private towerList: Array<number>;
    public result: number; //0  没有结果  1 自己胜利  2 对方胜利 3 平局

    public testNum: number;
    public rand: Random;
    public init() {
        this.roomState = ROOM_STATE.ROOM_STATE_INIT;
        this.roomID = 0;


        this.roomSyncInfo = new Map<string, number>();
        this.playerList = new Array<string>();
        this.towerList = new Array<number>();
        this.testNum = 1;
        this.resetRoomInfo();
        this.rand = new Random();
    }


    public getPlayerList(): Array<string> {
        return this.playerList;
    }

    public getRoomState(): ROOM_STATE {
        return this.roomState;
    }
    public setRoomState(state: ROOM_STATE) {
        this.roomState = state;
    }

    public setTowerInfo(id: number) {
        this.towerList[id] = 1;

    }

    public onFrameUpdate(frame) {


        if (this.result === 0) {
            let s = this.towerList[1];
            let t = this.towerList[2];
            if (s == 1 && t == 0) {
                this.result = 2;
            }
            else if (s == 0 && t == 1) {
                this.result = 1;
            }
            else if (s == 1 && t == 1) {
                this.result = 3;
            }

            if (this.result != 0) {
                this.onEnd();
                return;
            }

            // if (frame >= app.cfg.MAX_TICK) {
            //     this.result = 3;
            //     this.onEnd();
            //     return;
            // }
            // else {
            //     if ((frame - 1) % 10 == 0) {
            //         let c = <BattleController>GlobalApp.CtrlMgr.getController(CtrlConst.Battle);
            //         if (c) {
            //             c.setTimeUpdate(frame);
            //         }
            //     }
            // }
        }



    }


    private onEnd() {
        //0  没有结果  1 自己胜利  2 对方胜利 3 平局
        //result = 2代表平局呀 1表示胜利，0表示失败           
        //     let battleResult = 1;
        //     if (this.result == 2) {
        //         battleResult = 0;
        //     }
        //     else if (this.result == 3) {
        //         battleResult = 2;
        //     }
        //     //向服务器发送战斗结果
        //     app.AppMain.Instance.netManager.sendMsg("connector.entryHandler.roomResulted", { roomId: this.roomID, result: battleResult }, this, this.onReceiveBattleReward);
    }

    private onReceiveBattleReward(data: any) {
        // if (data.tag == 0 || data.tag == 13) //当日战场结束有奖励 or //当日战场奖励已达上限
        // {
        //     GlobalApp.EventMgr.dispatchEvent(GameEventDef.GameEvent_Game_End, data);

        // }
        // else {
        //     Log.warn("onReceiveBattleReward--error- tag:" + data.tag);
        // }
        // this.returnHome();
    }

    private returnHome() {
        //没有考虑残留数据的问题 
        // adapter.AdapterManager.Instance.leaveRoom();
        // adapter.AdapterManager.Instance.closeGame();
        // app.AppMain.Instance.mapManager.closeCurMap();
        // app.AppMain.Instance.entityManager.reset();
        // app.AppMain.Instance.frameEventManager.reset();
        // app.AppMain.Instance.tickManager.reset();
        // app.AppMain.Instance.playerManager.reset();
        this.roomState = ROOM_STATE.ROOM_STATE_END;
    }


    public onUpdate(time: number, delta: number): void {

    }

    public addPlayer(openID: string) {
        let isFind: boolean = false;
        for (let i = 0; i < this.playerList.length; ++i) {
            if (this.playerList[i] == openID) {
                isFind = true;
                break;
            }
        }

        if (!isFind) {

            this.playerList.push(openID);
        }
    }

    public syncPlayerGameInfo() {
        // //生成对应的同步关系表

        // this.calcSyncTable();
        // game.adapter.AdapterManager.Instance.roomBroadMessage(game.adapter.Method.ReadSyncMsg, "");
    }

    public setSyncMsg(info) {
        let key = info.openID + "|" + info.syncOpenID;
        console.log("synckey:" + key);
        this.roomSyncInfo.set(key, 1);
        if (this.isSyncOK()) {
            this.roomState = ROOM_STATE.ROOM_STATE_SYNC_OK;
        }
    }

    private isSyncOK() {
        let isSync = true;
        this.roomSyncInfo.forEach((v, k, m) => {
            if (v == 0) {
                isSync = false;
            }
        })
        return isSync;
    }

    private calcSyncTable() {
        for (let i = 0; i < this.playerList.length; ++i) {
            for (let j = 0; j < this.playerList.length; ++j) {
                let key = this.playerList[i] + "|" + this.playerList[j];
                this.roomSyncInfo.set(key, 0);
            }
        }
    }

    public resetRoomInfo() {
        this.playerList.splice(0);
        this.roomSyncInfo.clear();
        this.towerList[1] = 0;
        this.towerList[2] = 0;
        this.result = 0;

    }

    public reqMatch(gameType: number = 1) {
  //      app.AppMain.Instance.netManager.sendMsg("connector.entryHandler.match", { type: gameType }, this, this.onMatch);
    }

    private onMatch(data: any) {
        // if (data.tag === 0) {
        //     this.roomState = ROOM_STATE.ROOM_STATE_MATCHOK;
        //     app.AppMain.Instance.procFsm.ChangeState("MatchProc");
        //     GlobalApp.EventMgr.dispatchEvent(GameEventDef.GameEvent_Match_Ok);
        //     //害怕有残留的数据
        //     app.AppMain.Instance.frameEventManager.reset();
        // }
        // else {
        //     //todo 失败处理
        //     console.log("connect to match fail tag:" + data.tag);
        //     app.AppMain.Instance.adapterManager.leaveRoom();
        //     app.AppMain.Instance.procFsm.ChangeState("MainProc");
        // }
    }

    /** 房间玩家准备就绪 */
    public roomReady() {
        // let info: any = {};
        // info["openID"] = app.AppMain.Instance.adapterManager.getSelfOpenID();
        // info["isReady"] = true;
        // game.adapter.AdapterManager.Instance.roomBroadMessage(game.adapter.Method.SyncPlayerReadyStatus, JSON.stringify(info));
    }

    /** 房主发起开始游戏 */
    public reqStartGame() {
        // //如果房间的玩家列表中有成员未准备，则提示
        // if (this.isAllReady()) {
        //     this.roomState = ROOM_STATE.ROOM_STATE_ALLREADY;
        //     return true;
        // }
        return false;
    }

    //强制开启
    public forceStartGame() {
        this.roomState = ROOM_STATE.ROOM_STATE_ALLREADY;
    }

    public reqCreateRoomOK(roomID: number) {
        // console.log("send create room ok:" + roomID);
        // app.AppMain.Instance.netManager.sendMsg("connector.entryHandler.roomCreated", { roomId: this.roomID, platformRoomId: roomID }, null, null);
    }

    private onNeedCreateRoom(data: any) {
        // this.roomID = data.roomId;
        // //需要开始创建平台房间,自己是主机才需要创建房间
        // adapter.AdapterManager.Instance.setCurMaster(1);
        // app.AppMain.Instance.procFsm.ChangeState("CreateRoomProc");
        // console.log("need create room");
    }

    //广播
    private onCreateRoomOK(data: any) {
        // console.log("on create room ok");
        // //
        // if (!adapter.AdapterManager.Instance.isMaster()) {
        //     if (data.platformRoomId) {
        //         this.roomID = data.roomId;
        //         adapter.AdapterManager.Instance.setRoomID(data.platformRoomId);
        //         app.AppMain.Instance.procFsm.ChangeState("JoinRoomProc");

        //     }
        // }
    }

}


