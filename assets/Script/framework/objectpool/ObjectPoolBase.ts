
export class ObjectPoolBase {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public name(): string {
        return this._name;
    }



    public update(delta: number, realDelta: number): void {

    }

    public shutDown(): void {

    }
}
