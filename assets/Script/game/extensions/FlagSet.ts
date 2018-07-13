
export class FlagSet {
    private setPool: Array<number>;
    constructor(l: number = 10) {
        this.setPool = new Array<number>(l);
        for (let i: number = 0; i < l; ++i) {
            this.setPool[i] = 0;
        }
    }

    public getFlag(i: number): boolean {
        if (i >= this.setPool.length || i < 0)
            return false;
        if (this.setPool[i] === 0)
            return false;
        return true;
    }
    public clearFlag(i: number): void {
        if (i >= this.setPool.length || i < 0)
            return;
        this.setPool[i] = 0;
    }
    public setFlag(i: number): void {
        if (i >= this.setPool.length || i < 0)
            return;
        this.setPool[i] = 1;
    }

}
