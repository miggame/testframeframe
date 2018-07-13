
export class EffectInfo {
    constructor() {
        this.fullPath = "";
        this.x = 0;
        this.y = 0;
        this.type;
    }

    public fullPath: string;

    public x: number;
    public y: number;
    public type: number;
    public time: number;
    public speed: number;//可能为undefine
    public floor: number;//特效层级 1上 2下
    public delay: number;//延时 可能为undefine


}

export class SkillInfo {
    public max_ranger: number;
    public skillID: number;
    public skill_animate: string;
    public skillName: string;
    public skillIcon: string;
    public skillDesc: string;
    public skillDelay: number;
    public actionName: string;
    public skillFullPath: string;
    public skillBuffFullPath: string;
    public effect: Array<EffectInfo>;
}
