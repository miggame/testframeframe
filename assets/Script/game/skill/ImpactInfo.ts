
export class ImpactInfo {
    public impactID: number;
    public logicID: number;
    public buffID: number;
    public totalTime: number;
    public tickTime: number;
    public overTimeFlag: number;//是否时间效果
    public groupID: number;
    public priority: number;
    public standFlag: number;
    public maxNum: number;//最大叠加次数
    public value: Array<number>;



    public getValueByIndex(index: number): number {
        return this.value[index];
    }

    public setValueByIndex(index: number, value: number) {
        this.value[index] = value;
    }

}
