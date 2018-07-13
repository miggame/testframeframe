import { FsmBase } from "../../../framework/common/fsm/FsmBase";
import { AIBase } from "./AIBase";

/**
 * 固定点技能ai 简单的逻辑，进入后，开始释放技能
 */
export class AI_3 extends AIBase {

    constructor() {
        super();

        //this.pool.push(app.AppMain.Instance.aiManager.getAIFsmState("IdleCastState"));
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
