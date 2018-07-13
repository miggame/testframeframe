import { FsmBase } from "../../framework/common/fsm/FsmBase";
import { AIBase } from "./ai/AIBase";
import { AIFsmManager } from "./AIFsmManager";
import { Game } from "../Game";
import { AI_1 } from "./ai/AI_1";
import { AI_2 } from "./ai/AI_2";
import { AI_3 } from "./ai/AI_3";
import { IdleState } from "./idle/IdleState";
import { AtkState } from "./atk/AtkState";
import { DeadState } from "./dead/DeadState";
import { TraceState } from "./trace/TraceState";
import { PathState } from "./path/PathState";
import { IdleCastState } from "./idle/IdleCastState";
import { StunState } from "./stun/StunState";




export class AIManager {
    public static readonly Instance: AIManager = new AIManager;


    public init(): void {

        this.fsmPool = new Map<string, any>();
        this.aiPool = new Map<string, any>();

        this.register();

    }

    private register(): void {
        //需要註冊所有的FSM
        this.fsmPool.set("AtkState", new AtkState());
        this.fsmPool.set("DeadState", new DeadState());
        this.fsmPool.set("IdleState", new IdleState());
        this.fsmPool.set("PathState", new PathState());
        this.fsmPool.set("TraceState", new TraceState());
        this.fsmPool.set("IdleCastState", new IdleCastState());
        this.fsmPool.set("StunState", new StunState());

        //注册所有的ai
        this.aiPool.set("AI_1", AI_1);
        this.aiPool.set("AI_2", AI_2);
        this.aiPool.set("AI_3", AI_3);

    }


    public getAIFsmState(name: string): FsmBase {
        let ret = null;
        ret = this.fsmPool.get(name);
        return ret;
    }


    public createAIFSM(aiName: string): AIFsmManager {
        let ret = new AIFsmManager();
        let ai = this.createAI(aiName);
        ret.ai = ai;
        ret.Init(ai.pool);
        return ret;
    }


    public createAI(name: string): AIBase {
        let ret: AIBase = null;
        ret = this.aiPool.get(name);
        if (ret) {
            ret = Game.ComponentPoolMgr.getObject(ret);
            ret.reset();

        }
        return ret;
    }

    private fsmPool: Map<string, any>;
    private aiPool: Map<string, any>;
}



