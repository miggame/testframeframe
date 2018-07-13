import { GlobalApp } from '../framework/GlobleApp';
import { LogHelper } from './base/LogHelper';
import { LayerManager } from '../framework/layers/LayerManager';
import { SpriteNodeHelper } from './base/SpriteNodeHelper';
import { LoadResourceAgentHelper } from './base/LoadResourceAgentHelper';
import { ResourceHelper } from './base/ResourceHelper';
import { TickManager } from './manager/TickManager';
import { BaseLayer } from '../framework/layers/BaseLayer';
import { SFsmManager } from '../framework/common/fsm/SFsmManager';
import { FsmBase } from '../framework/common/fsm/FsmBase';
import { InitProc } from './procedure/InitProc';
import { LoginProc } from './procedure/LoginProc';

import { SKillManger } from './skill/SkillManager';
import { PlayerManager } from './gameobj/PlayerManager';
import { RoomManager } from './manager/RoomManager';
import { CardManager } from './card/CardManager';
import { ToolManager } from './tool/ToolManager';
import { ComponentPoolManager } from './manager/ComponentPoolManager';
import { ConfigManager } from './manager/ConfigManager';
import { AnsyManager } from './ansyReq/AnsyManager';



export class Game extends GlobalApp {

    public _uiRoot: cc.Node;
    public _sceneRoot: cc.Node;

    private static _procFsmManager: SFsmManager;

    public static get TickMgr(): TickManager {
        return TickManager.getInstance();
    }

    public static get skillManager(): SKillManger {
        return SKillManger.Instance;
    }


    public static get toolManager(): ToolManager {
        return ToolManager.Instance;
    }



    public static get cardManager(): CardManager {
        return CardManager.Instance;
    }

    public static get ComponentPoolMgr(): ComponentPoolManager {
        return ComponentPoolManager.getInstance();
    }



    public static get playerManager(): PlayerManager {
        return PlayerManager.getInstance();
    }

    public static get ansyMgr(): AnsyManager {
        return AnsyManager.getInstance();
    }

    public static get roomManager(): RoomManager {
        return RoomManager.getInstance();
    }

    public static get configMgr(): ConfigManager {
        return ConfigManager.getInstance();
    }



    public static get procFsmMgr(): SFsmManager {
        return this._procFsmManager;
    }
    public static set procFsmMgr(val: SFsmManager) {
        this._procFsmManager = val;
    }



    public init(): void {
        super.init();
        GlobalApp.LogMgr.addHelp(new LogHelper());
        LayerManager.init(SpriteNodeHelper);
        Game.skillManager.init();
        Game.ResourceMgr.setObjectPoolManager(GlobalApp.ObjPoolMgr);
        Game.ResourceMgr.setResourceHelper(new ResourceHelper());
        Game.ResourceMgr.addLoadResourceAgentHelper(new LoadResourceAgentHelper());

        let uiRoot = new SpriteNodeHelper("uiRoot");
        uiRoot.setNode(this._uiRoot);
        Game.SceneMgr.scenesRoot = new BaseLayer(uiRoot);


        Game.TickMgr.addUpdateObserver(Game.ResourceMgr);
        Game.TickMgr.addUpdateObserver(Game.ObjPoolMgr);
        Game.TickMgr.addUpdateObserver(Game.ansyMgr);



        Game.procFsmMgr = new SFsmManager();
        let fsmMgr = Game.procFsmMgr;

        let v: Array<FsmBase> = new Array<FsmBase>();
        v.push(new LoginProc());
        v.push(new InitProc());


        fsmMgr.Init(v);
        Game.TickMgr.addUpdateObserver(fsmMgr);
    }

    public start(): void {
        Game.TickMgr.start();
        Game.procFsmMgr.Start("InitProc");
    }

}