import { SkillLogicBase } from "./skillogic/SkillLogicBase";


export class SkillInstanceInfo {
    constructor() {
        // this.param = new Array<number>(12);
    }

    public skillID: number;
    public instanceID: number;
    public logicID: number;
    public logic: SkillLogicBase;
    public skillLevel: number;
    public param: Array<number>;
    public cdID: number;
    public cdTime: number;
    public maxRad; //攻击半径
    public maxNum; //攻击最大数量

    public getValue(index: number) {
        return this.param[index];
    }

}
