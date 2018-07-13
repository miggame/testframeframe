import { FsmManager } from './FsmManager';

export class FsmBase {

    protected _groupName: string;

    constructor() {
        this._groupName = "FsmBase";
    }

    get GroupName() {
        return this._groupName;
    }


    public OnInit(owner: FsmManager) {

    }

    public OnEntry(owner: FsmManager) {
        owner.onEntry(this);
    }

    public OnUpdate(owner: FsmManager, dt: number, rdt: number) {

    }

    public OnLeave(owner: FsmManager) {
        owner.onLeave(this);
    }

    public OnDestroy(owner: FsmManager) {

    }
}

