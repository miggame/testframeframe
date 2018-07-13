import { AttrArray } from "./AttrInfo";

export class PropManager {
    public static readonly Instance: PropManager = new PropManager();
    private propPool: Map<number, AttrArray>;
    constructor() {
        this.propPool = new Map<number, AttrArray>();
    }

    public init(): void {


    }

    public getProp(index: number): AttrArray {
        return this.propPool.get(index);
    }


    public addProp(index: number, attr: AttrArray): void {
        this.propPool.set(index, attr);

    }
}
