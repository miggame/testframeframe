import { ITaskAgent } from '../../framework/base/Task/ITaskAgent';
import { AnsyTask } from './AnsyTask';

import { AnsyState } from './AnsyBase';
export class AnsyAgent implements ITaskAgent<AnsyTask>
{

    private _task: AnsyTask;


    public init(): void {

    }

    public getTask(): AnsyTask {
        return this._task;
    }


    public update(delta: number, realDelta: number): void {
        if (!this._task) {
            return;
        }

        this._task.AnsyReq.onUpdate(delta, realDelta)
        if (this._task.AnsyReq.getState() == AnsyState.AnsyState_Run) {
            return;
        }

        if (this._task.AnsyReq.getState() == AnsyState.AnsyState_OK) {
            this._task.onAnsyCallOK();
            this._task.done = true;
        }

        if (this._task.AnsyReq.getState() == AnsyState.AnsyState_Fail) {
            this._task.onAnsyCallFail();
            this._task.done = true;
        }
    }

    public shutdown(): void {
        this.reset();
    }

    public start(task: AnsyTask): void {
        this._task = task;
        this._task.startTime = Date.now();
        this._task.AnsyReq.start();
    }

    public reset(): void {
        this._task = null;
    }

}