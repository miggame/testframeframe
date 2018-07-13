import { BaseController } from "../controller/BaseController";
import { BaseModel } from "../model/BaseModel";
import { BaseClass } from "../../base/BaseClass";

/**
* name 
*/
export class CtrlManager extends BaseClass {
	private _modules: any;

	/**
	 * 构造函数
	 */
	public constructor() {
		super();
		this._modules = {};
	}

	/**
	 * 清空处理
	 */
	public clear(): void {
		this._modules = {};
	}

	/**
	 * 动态添加的Controller
	 * @param key 唯一标识
	 * @param manager Manager
	 *
	 */
	public register(key: number, control: BaseController): void {
		if (this.isExists(key))
			return;

		this._modules[key] = control;
	}

	/**
	 * 动态移除Controller
	 * @param key 唯一标识
	 *
	 */
	public unregister(key: number): void {
		if (!this.isExists(key))
			return;

		this._modules[key] = null;
		delete this._modules[key];
	}

	/**
	 * 是否已经存在Controller
	 * @param key 唯一标识
	 * @return Boolean
	 *
	 */
	public isExists(key: number): boolean {
		return this._modules[key] != null;
	}

	/**
	 * 跨模块消息传递
	 * @param controllerD Controller唯一标识
	 * @param key 消息唯一标识
	 *
	 */
	public applyFunc(controllerD: number, key: number, ...param: any[]): any {
		var manager: BaseController = this._modules[controllerD];
		if (manager) {
			var params = [];
			for (var i = 1; i < arguments.length; i++) {
				params[i - 1] = arguments[i];
			}
			return manager.applyFunc.apply(manager, params);
		} else {
			console.log("模块" + controllerD + "不存在");
			return null;
		}
	}

	/**
	 * 获取指定Controller的Model对象
	 * @param controllerD Controller唯一标识
	 * @returns {BaseModel}
	 */
	public getControllerModel(controllerD: number): BaseModel {
		var manager: BaseController = this._modules[controllerD];
		if (manager) {
			return manager.getModel();
		}
		return null;
	}

	/**
 * 获取指定Controller的Model对象
 * @param controllerD Controller唯一标识
 * @returns {BaseModel}
 */
	public getController(controllerD: number): BaseController {
		var manager: BaseController = this._modules[controllerD];
		if (manager) {
			return manager;
		}
		return null;
	}

}