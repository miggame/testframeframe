import { entity } from "./Entity";


export interface iSystem {

    onInit(e: entity): void;
    onFrameUpdate(e: entity, frame: number): void;
    onClear(e: entity): void;

}

