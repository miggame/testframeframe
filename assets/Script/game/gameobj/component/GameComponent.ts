import { iGameComponent } from "./IGameComponent";


export class GameComponent implements iGameComponent {
    private _owner: any;
    public getName(): string {
        return "GameComponent";
    }

    public onInit(owner: any) {
        this._owner = owner;
    }


    public onUpdate(delta: number, realDelta: number) {

    }

    public onShutDown() {

    }
}