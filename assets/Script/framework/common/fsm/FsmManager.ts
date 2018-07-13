import { FsmBase } from './FsmBase';

export interface FsmManager {

    CurrentProcedure(): FsmBase;

    FsmCount(): number

    IsRun(): boolean

    HasState(st: string): boolean

    GetState(st: string): FsmBase;

    Start(first: string): void;

    onUpdate(dt: number, rdt: number): void;

    onEntry(st: FsmBase): void;
    onLeave(st: FsmBase): void;

}

