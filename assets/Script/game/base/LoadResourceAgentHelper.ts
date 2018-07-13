import { ILoadResourceAgentHelper } from '../../framework/resource/ILoadResourceAgentHelper';
import { Game } from '../Game';
export class LoadResourceAgentHelper implements ILoadResourceAgentHelper {
    public readFile(fullPath: string): void {
        //todo 暂时不要调用
        Game.LogMgr.error("dont call this func");

    }
    public loadAsset(obj: any, name: string): void {

    }

    public reset(): void {

    }
}