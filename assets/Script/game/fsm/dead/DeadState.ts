import { FsmManager } from "../../../framework/common/fsm/FsmManager";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";


export class DeadState extends FsmBase {
    constructor() {
        super();
        this._groupName = "DeadState";
    }

    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {
        super.OnEntry(owner);
    }

    public OnUpdate(owner: FsmManager, dt: number, rdt: number) {

    }

    public OnLeave(owner: FsmManager) {
        super.OnLeave(owner);
    }

    public OnDestroy(owner: FsmManager) {

    }

}
