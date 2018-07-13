import { BaseClass } from "../../framework/base/BaseClass";
import { TaskPool } from '../../framework/base/Task/TaskPool';
import { AnsyTask } from './AnsyTask';
import { AnsyAgent } from './AnsyAgent';
import { AnsyBase } from './AnsyBase';

export class AnsyManager extends BaseClass {
    private pool: TaskPool<AnsyTask>;
    public init() {
        this.pool = new TaskPool<AnsyTask>();
        this.pool.addAgent(new AnsyAgent());
        this.pool.addAgent(new AnsyAgent());
        this.pool.addAgent(new AnsyAgent());
    }

    public startAnsy(ansy: AnsyBase, data: any) {
        let t = new AnsyTask(ansy, data);
        this.pool.addTask(t);
    }

    public onUpdate(delta: number, realDelta: number): void {
        this.pool.update(delta, realDelta);
    }

}

