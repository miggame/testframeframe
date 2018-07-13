import { ProcedureBase } from "../../framework/common/procedure/ProcedureBase";
import { FsmManager } from "../../framework/common/fsm/FsmManager";

export class LoginProc extends ProcedureBase {
    constructor() {
        super();
        this._groupName = "LoginProc";
    }

    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {

        // GlobalApp.SceneMgr.runScene(SceneConst.Login);
    }

    public OnUpdate(owner: FsmManager, dt: number, rdt: number) {

    }

    public OnLeave(owner: FsmManager) {

    }

    public OnDestroy(owner: FsmManager) {

    }
}
