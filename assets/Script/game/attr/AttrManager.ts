import { AttrInfo } from "./AttrInfo";

export enum ATTR_DEF {
    ATTR_DEF_MAXHP = 1,
    ATTR_DEF_ATK = 2,
    ATTR_DEF_DEF = 3,
    ATTR_MOVE_SPEED = 4,
    ATTR_DEF_MAX_PER = 5,
    ATTR_DEF_ATK_PER = 6,
    ATTR_DEF_DEF_PER = 7,
    ATTR_DEF_SPEED_PER = 8,
    ATTR_ATK_SPEED = 100,
    ATTR_ATK_RAD = 101,
    ATTR_MAX
}

export class AttrManager {
    public static readonly Instance: AttrManager = new AttrManager();

    private attrInfoPool: Map<number, AttrInfo>;

    constructor() {
        this.attrInfoPool = new Map<number, AttrInfo>();
    }

    public init(): void {

    }

    public getAttrInfo(id: number): AttrInfo {
        let t = this.attrInfoPool.get(id);
        return t;
    }

    public addAttrInfo(id: number, attr: AttrInfo): void {
        this.attrInfoPool.set(id, attr);
    }

}
