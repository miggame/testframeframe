import { BaseController } from "../../../framework/mvc/controller/BaseController";
import { LayerManager } from "../../../framework/layers/LayerManager";
import { GlobalApp } from "../../../framework/GlobleApp";
import { LoadingView } from "./LoadingView";
import { CmdConst } from "../../consts/CmdConst";
import { ViewConst } from "../../consts/ViewConst";

/**
* name 
*/
export class LoadingController extends BaseController {
	private m_view: LoadingView;
	constructor() {
		super();
		this.m_view = new LoadingView(this, LayerManager.UIMain, "UI/loadingUI");
		GlobalApp.ViewMgr.register(ViewConst.Loading, this.m_view);

		this.registerFunc(CmdConst.Loading_Close, this.onClose, this);

	}

	onClose() {

	}
}