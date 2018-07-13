import { entity } from "../../framework/entity/Entity";
import { SFsmManager } from "../../framework/common/fsm/SFsmManager";
import { AIComponent } from "../entity/component/AIComponent";
import { FsmBase } from "../../framework/common/fsm/FsmBase";
import { Game } from "../Game";
import { AIBase } from "./ai/AIBase";

export class AIFsmManager extends SFsmManager {
    public e: entity;
    public ai: AIBase;

    public ChangeState(toStateName: string): void {
        super.ChangeState(toStateName);

        let t: AIComponent = <AIComponent>this.e.getCompnentByType(AIComponent);
        t.curState = this.CurrentProcedure().GroupName;


    }

    public onEntry(st: FsmBase): void {
        if (this.ai) {
            this.ai.onEntryState(st);
        }
    }

    public onLeave(st: FsmBase): void {
        if (this.ai) {
            this.ai.onLeaveState(st);
        }
    }


    public onUpdate(dt: number, rdt: number): void {
        super.onUpdate(dt, rdt);
        if (this.ai) {
            this.ai.frameUpdate(Game.TickMgr.lastSyncFrame);
        }
    }

    public Shutdown(): void {
        super.Shutdown();

        if (this.ai) {
            this.ai.clear();
        }
    }

}
