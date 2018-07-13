
export class ObjectBase {
    private _target: any;
    private _lastTime: number;
    private _name: string;

    constructor(name: string, target: any) {
        this._name = name;
        this._target = target;
    }

    public get target(): any {
        return this._target;
    }

    public set target(value: any) {
        this._target = value;
    }

    public get lastTime(): number {
        return this._lastTime;
    }

    public set lastTime(value: number) {
        this._lastTime = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public onSpawn(): void {

    }


    public onUnSpawn(): void {

    }

    public onRelease(): void {

    }

}

