import { BaseView } from "../../../framework/mvc/view/BaseView";
import { BaseController } from "../../../framework/mvc/controller/BaseController";
import { BaseLayer } from "../../../framework/layers/BaseLayer";

export class LoadingView extends BaseView {

	private loadingBar: cc.ProgressBar;
	private node: cc.Node;
	constructor(ctrl: BaseController, layer: BaseLayer, resName: string) {
		super(ctrl, layer.node, resName);

	}



	public onOpen(): void {
		this.initData();

	}



	public close(...param: any[]): void {
		super.close();

	}

	private iStart: number;
	//初始化ui对象
	public initUI() {
		super.initUI();
		this.iStart = 0;
		this.node = this._content.getNode();
		this.loadingBar = this.node.getComponentInChildren(cc.ProgressBar);
		let self = this;
		setInterval(() => {
			self.iStart += 0.1;
			self.loadingBar.progress = self.iStart;
		}, 1000);
	}

	public onStartHandler() {

	}

	public destroy() {
		super.destroy();
	}


}