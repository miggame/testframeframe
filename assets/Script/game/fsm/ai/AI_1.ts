import { AIBase } from "./AIBase";
import { FsmBase } from "../../../framework/common/fsm/FsmBase";



/**
 * 普通卡ai
 */
export class AI_1 extends AIBase {

    constructor() {
        super();

        // this.pool.push(app.AppMain.Instance.aiManager.getAIFsmState("AtkState"));
        // this.pool.push(app.AppMain.Instance.aiManager.getAIFsmState("DeadState"));
        // this.pool.push(app.AppMain.Instance.aiManager.getAIFsmState("IdleState"));
        // this.pool.push(app.AppMain.Instance.aiManager.getAIFsmState("PathState"));
        // this.pool.push(app.AppMain.Instance.aiManager.getAIFsmState("TraceState"));
        // this.pool.push(app.AppMain.Instance.aiManager.getAIFsmState("StunState"));

    }


    public init() {

    }


    public reset() {

    }

    public clear() {

    }

    public frameUpdate(frame: number) {

    }

    public onEntryState(name: FsmBase) {

    }

    public onLeaveState(name: FsmBase) {

    }
}
