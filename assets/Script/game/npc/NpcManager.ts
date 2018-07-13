import { NpcInfo } from "./NpcInfo";

export class NpcManager {
    public static readonly Instance: NpcManager = new NpcManager();

    private npcPool: Map<number, NpcInfo>;

    public init(): void {
        this.npcPool = new Map<number, NpcInfo>();
    }


    public addNpcInfo(index: number, info: NpcInfo): void {
        this.npcPool.set(index, info);
    }

    public getNpcInfo(index: number): NpcInfo {
        return this.npcPool.get(index);
    }


}
