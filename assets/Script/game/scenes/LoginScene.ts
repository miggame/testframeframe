import { BaseScene } from "../../framework/scene/BaseScene";
import { LayerManager } from "../../framework/layers/LayerManager";
import { GlobalApp } from "../../framework/GlobleApp";
import { ViewConst } from "../consts/ViewConst";

export class LoginScene extends BaseScene {
    constructor() {
        super();
    }

    onEnter() {
        super.onEnter();
        this.addLayer(LayerManager.UIMain);

        GlobalApp.ViewMgr.open(ViewConst.Login);

        //触发登录操作
        //game.adapter.AdapterManager.Instance.sendLoginMessage(null);

    }

    onExit() {
        super.onExit();
    }
}