import { BaseController } from "../controller/BaseController";

/**
* name 
*/
export class BaseModel {
	private _ctrl: BaseController;
	constructor(ctrl: BaseController) {
		this._ctrl = ctrl;
		this._ctrl.setModel(this);
	}
}