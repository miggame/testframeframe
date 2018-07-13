import { FlagSet } from "../extensions/FlagSet";
import { ImpactInfo } from "./ImpactInfo";
import { ImpactLogicBase } from "./impactlogic/ImpactLogicBase";


export enum ImpactDataFlag {
    FADE_OUT = 0,
    FADE_CRI = 1,
    FADE_BLOCK = 2,

}

export class ImpactData {

    constructor() {
        this.reset()
    }

    public reset() {
        this.param = new Array<number>(10);
        this.flag = new FlagSet(10);
        this.castID = 0;
        this.runTime = 0;
        this.skillID = 0;
    }

    public initFromInfo() {

    }

    public getInfo(): ImpactInfo {
        return this.impactInfo;
    }

    public setInfo(info: ImpactInfo) {
        this.impactInfo = info;
    }

    public setParamByIndex(index: number, value: number) {
        this.param[index] = value;
    }

    public getParamByIndex(index: number): number {
        return this.param[index];
    }


    /**
     * 是否消失
     */
    public isFaseOut(): boolean {
        return this.flag.getFlag(ImpactDataFlag.FADE_OUT);
    }

    /**
     * 是否是持续效果
     */
    public isOverTime(): boolean {
        if (this.impactInfo.overTimeFlag > 0)
            return true;
        return false;
    }

    public skillID: number;//有可能没有
    public impactInfo: ImpactInfo;
    public impactID: number;
    public logicID: number;
    public logic: ImpactLogicBase;
    public sn: number;
    public castID: number;
    public totalTime: number;
    public runTime: number;
    public intervalTime: number;
    public cdID: number;
    public cdTime: number;
    public param: Array<number>;
    public flag: FlagSet;
}
