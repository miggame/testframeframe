import { FsmBase } from "../../../framework/common/fsm/FsmBase";

export class AIBase {

    public cfgpool: Array<string>;
    public pool: Array<FsmBase>;
    constructor() {
        this.cfgpool = new Array<string>();
        this.pool = new Array<FsmBase>();
    }

    public init() {

    }

    public getState(): Array<FsmBase> {
        return this.pool;
    }

    public reset() {

    }

    public frameUpdate(frame: number) {

    }

    public onEntryState(name: FsmBase) {

    }

    public onLeaveState(name: FsmBase) {

    }

    public clear() {

    }
}
