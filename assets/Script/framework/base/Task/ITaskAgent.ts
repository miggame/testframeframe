import { ITask } from './ITask';

export interface ITaskAgent<T extends ITask> {
    getTask(): T;
    init(): void;
    update(delta: number, realDelta: number): void;
    shutdown(): void;
    start(T): void;
    reset(): void;

}


