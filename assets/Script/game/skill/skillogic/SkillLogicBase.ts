import { entity } from "../../../framework/entity/Entity";

export enum SKILLLOGICID {
    SKILLLOGICID_TARGET = 0, //对目标
    SKILLLOGICID_TARGETANDGROUND = 1,//对目标和目标周围
    SKILLLOGICID_SELFGROUND = 2,//对自己周围
    SKILLLOGICID_POINTGROUND = 3,//对点范围
    SKILLLOGICID_TOSELF = 4,//给自己释放

}

export class SkillLogicBase {


    public id: number;
    constructor() {
        this.id = -1;
    }

    public onInterrupt(e: entity): boolean {
        return false;
    }

    public start(e: entity): boolean {
        return false;
    }

    public effectOnOnce(e: entity): boolean {
        return false;
    }

}
