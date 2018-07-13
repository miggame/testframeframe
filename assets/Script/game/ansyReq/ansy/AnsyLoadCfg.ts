import { AnsyBase, AnsyState } from '../AnsyBase';
import { Game } from '../../Game';

export class AnsyLoadCfg extends AnsyBase {

    public onUpdate(delta: number, realDelta: number) {
        if (Game.configMgr.isLoadOK) {
            this._state = AnsyState.AnsyState_OK;
        }
    }

}