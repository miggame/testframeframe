import { FsmManager } from './FsmManager';
import { FsmBase } from './FsmBase';

export class SFsmManager implements FsmManager {
    constructor() {
        //this.fsmPool = new [string,FsmBase]();
        this.count = 0;
        this.cur = null;
    }

    public Init(l: Array<FsmBase>): void {
        this.fsmPool = {};
        this.count = 0;
        for (var i = 0; i < l.length; i++) {
            let t: FsmBase = l[i];
            this.fsmPool[t.GroupName] = t;
            t.OnInit(this);
            this.count += 1;
        }

        this.cur = null;
        this.isRun = false;

    }

    private cur: FsmBase;
    public CurrentProcedure(): FsmBase {
        return this.cur;
    }

    private fsmPool: { [key: string]: FsmBase; }
    private count: number;
    public FsmCount(): number {
        return this.count;
    }


    private isRun: boolean;
    public IsRun(): boolean {
        return this.isRun;
    }


    public GetState(st: string): FsmBase {
        let ret: FsmBase = null;
        if (this.fsmPool[st] != null)
            ret = this.fsmPool[st];
        return ret;
    }

    public HasState(st: string): boolean {
        let ret: boolean = false;
        if (this.fsmPool[st] != null)
            ret = true;

        return ret;
    }




    public Start(first: string): void {
        if (this.HasState(first) == false) {
            console.log("start fsm error");
            return;
        }

        this.isRun = true;
        let startState = this.GetState(first);
        if (startState == null) {
            console.log("no this error");
            return;
        }


        startState.OnEntry(this);
        this.cur = startState;
        this.isRun = true;

    }

    public onUpdate(dt: number, rdt: number): void {
        if (this.cur == null)
            return;

        this.cur.OnUpdate(this, dt, rdt);
    }

    public onEntry(st: FsmBase): void {

    }

    public onLeave(st: FsmBase): void {

    }


    public ChangeState(toStateName: string): void {
        let toState: FsmBase = this.GetState(toStateName);
        if (toState == null) {
            console.log("change fsm error" + toStateName);
            return;
        }

        if (this.cur == toState) {
            return;
        }
        console.log("state to:" + toStateName);
        this.cur.OnLeave(this);

        this.cur = toState;
        this.isRun = true;
        toState.OnEntry(this);
    }

    public Shutdown(): void {
        let ret: FsmBase = null;
        for (const key in this.fsmPool) {
            if (this.fsmPool.hasOwnProperty(key)) {
                ret = this.fsmPool[key];
                ret.OnDestroy(this);
            }
        }
        this.fsmPool = null;
        delete this.fsmPool;
    }


}
