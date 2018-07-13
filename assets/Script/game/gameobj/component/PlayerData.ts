import { GameComponent } from './GameComponent';
export class PlayerData extends GameComponent {

    public openID: string;
    public joinTs: number;
    public status: number;


    public cServerID: number;

    public isSelf: boolean;//是否是自己
    public isMain: boolean;//是否主机，不是主机是需要翻转逻辑的
    public isReady: boolean; //是否已准备

    public coin: number;  //金币
    public rmb: number;   //元宝
    public exp: number;

    public roleName: string;
    public roleHead: string;
    public roleHeadBufferInfo: any;
    public roleLevel: number;   //需要同步



    public getName(): string {
        return "PlayerData";
    }



    public onUpdate(delta: number, realDelta: number) {

    }

    public onShutDown() {

    }
}