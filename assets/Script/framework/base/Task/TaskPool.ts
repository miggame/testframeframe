import { ITask } from './ITask';
import { ITaskAgent } from './ITaskAgent';
import { DobuleList } from '../../utils/DoubleList';

export class TaskPool<T extends ITask>
{
    private _freePool: Array<ITaskAgent<T>>;
    private _workPool: DobuleList<ITaskAgent<T>>;
    private _waitPool: Array<T>;

    constructor() {
        this._freePool = new Array<ITaskAgent<T>>();
        this._workPool = new DobuleList<ITaskAgent<T>>();
        this._waitPool = new Array<T>();
    }

    public get totalCount(): number {
        return this._freePool.length + this._workPool.size();
    }


    public get freeCount(): number {
        return this._freePool.length;
    }

    public get workCount(): number {
        return this._workPool.size();
    }

    public get waitCount(): number {
        return this._waitPool.length;
    }

    public update(delta: number, realDelta: number) {
        let agentItem = this._workPool.getHeaderItem().next;
        while (agentItem.value) {
            let next = agentItem.next;
            if (agentItem.value.getTask().isDone()) {
                agentItem.value.reset();
                this._freePool.push(agentItem.value);
                this._workPool.remove(agentItem.value);
                agentItem = next;
                continue;
            }

            agentItem.value.update(delta, realDelta);
            agentItem = next;
        }

        while (this.freeCount > 0 && this.waitCount > 0) {
            let agent = this._freePool.shift();
            this._workPool.add(agent);
            let run = this._waitPool.shift();
            agent.start(run);
            if (run.isDone()) {
                agent.reset();
                this._freePool.push(agent);
                this._workPool.remove(agent);
            }
        }
    }

    public shutdown(): void {
        while (this.freeCount) {
            this._freePool.pop().shutdown();
        }

        let agentItem = this._workPool.getHeaderItem().next;
        while (agentItem.value) {
            agentItem.value.shutdown();
            agentItem = agentItem.next;
        }

        this._workPool.clear();
        this._waitPool.splice(0);
    }


    public addAgent(agent: ITaskAgent<T>): void {
        agent.init();
        this._freePool.push(agent);
    }

    public addTask(task: T) {
        this._waitPool.push(task);
    }


    public removeTask(id: number): T {
        let ret = null;
        for (let i = 0; i < this._waitPool.length; ++i) {
            if (this._waitPool[i].getTaskID() == id) {
                ret = this._waitPool[i];
                this._waitPool.splice(i, 1);
                return ret;
            }
        }

        let agentItem = this._workPool.getHeaderItem().next;
        while (agentItem.value) {
            if (agentItem.value.getTask().getTaskID() == id) {
                agentItem.value.reset();
                this._freePool.push(agentItem.value);
                ret = agentItem.value.getTask();
                this._workPool.remove(agentItem.value);
                return ret;
            }
            agentItem = agentItem.next;
        }

        return ret;
    }

    public removeTaskByName(name: string): T {
        let ret = null;
        for (let i = 0; i < this._waitPool.length; ++i) {
            if (this._waitPool[i].getTaskName() == name) {
                ret = this._waitPool[i];
                return ret;
            }
        }

        let agentItem = this._workPool.getHeaderItem().next;
        while (agentItem.value) {
            if (agentItem.value.getTask().getTaskName() == name) {
                agentItem.value.reset();
                this._freePool.push(agentItem.value);
                ret = agentItem.value.getTask();
                this._workPool.remove(agentItem.value);
                return ret;
            }
            agentItem = agentItem.next;
        }

        return ret;
    }

    public removeAllTask(): void {
        let agentItem = this._workPool.getHeaderItem().next;
        while (agentItem.value) {
            agentItem.value.reset();
            let next = agentItem.next;
            this._freePool.push(agentItem.value);
            this._workPool.remove(agentItem.value);
            agentItem = next;
        }
        this._waitPool.splice(0);

    }


}

