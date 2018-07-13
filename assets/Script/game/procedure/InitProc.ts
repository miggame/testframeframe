import { ProcedureBase } from '../../framework/common/procedure/ProcedureBase';
import { FsmManager } from '../../framework/common/fsm/FsmManager';
import { SFsmManager } from '../../framework/common/fsm/SFsmManager';
import { Game } from '../Game';
import { AnsyLoadCfg } from '../ansyReq/ansy/AnsyLoadCfg';

import { LoadingScene } from '../scenes/LoadingScene';
import { LoginScene } from '../scenes/LoginScene';
import { LoadingController } from '../modules/login/LoadingController';
import { CtrlConst } from '../consts/CtrlConst';
import { SceneConst } from '../consts/SceneConst';

export class InitProc extends ProcedureBase {
    constructor() {
        super();
        this._groupName = "InitProc";
    }

    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {
        //初始化配置
        Game.configMgr.init();
        Game.ansyMgr.init();

        //初始化UI
        Game.CtrlMgr.register(CtrlConst.Loading, new LoadingController());

        //初始化场景
        Game.SceneMgr.register(SceneConst.Loading, new LoadingScene());
        Game.SceneMgr.register(SceneConst.Login, new LoginScene());

        let load = new AnsyLoadCfg(this, this.okLoadOK, null);
        Game.ansyMgr.startAnsy(load, null);

        Game.SceneMgr.runScene(SceneConst.Loading);

    }

    public OnUpdate(owner: FsmManager, dt: number, rdt: number) {
        let t: SFsmManager = <SFsmManager>owner;

    }

    public OnLeave(owner: FsmManager) {

    }

    public OnDestroy(owner: FsmManager) {

    }


    private okLoadOK() {
        Game.procFsmMgr.ChangeState("LoginProc");
    }

}
