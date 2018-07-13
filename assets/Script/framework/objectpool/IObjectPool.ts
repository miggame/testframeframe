import { ObjectBase } from './ObjectBase';

export interface IObjectPool<T extends ObjectBase> {
    name(): string;


    count();
    allowMultiSpawn();
    expireTime();
    register(obj: T, isSpawn: boolean);

    canSpawn(obj: any): boolean;

    spawn(obj: any): T;
    unSpawn(obj: T);
    unSpawnByName(name: string);
    unSpawnTarget(target: any);
    release();

}
