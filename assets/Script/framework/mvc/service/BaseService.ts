import { BaseController } from "../controller/BaseController";
import { GlobalApp } from "../../GlobleApp";

/**
* 提供与服务器之间的协议通信服务，并将协议返回数据交由对应的controller来处理 
*/
export class BaseService {
	private _ctrl: BaseController;

	/**
	 * 构造函数
	 * @param controller 所属模块
	 */
	public constructor(controller: BaseController) {
		this._ctrl = controller;
	}

	/**
	 * 触发本模块消息
	 * @param key 唯一标识
	 * @param param 参数
	 *
	 */
	public applyFunc(key: any, ...param: any[]): any {
		return this._ctrl.applyFunc.apply(this._ctrl, arguments);
	}

	/**
	 * 触发其他模块消息
	 * @param controllerKey 模块标识
	 * @param key 唯一标识
	 * @param param 所需参数
	 *
	 */
	public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
		return this._ctrl.applyControllerFunc.apply(this._ctrl, arguments);
	}

	/**
	 * 注册从服务器返回消息的监听
	 * @param key 消息标识
	 * @param callbackFunc 处理函数
	 * @param callbackObj 处理函数所属对象
	 */
	public receiveServerMsg(key: any, callbackFunc: Function, callbackObj: any): void {
		GlobalApp.MessageCenter.register(key, callbackFunc, callbackObj);
	}

	/**
	 * 注册从服务器返回消息的监听，仅一次，执行完成后删除
	 * @param key 消息标识
	 * @param callbackFunc 处理函数
	 * @param callbackObj 处理函数所属对象
	 */
	public receiveServerMsgOnce(key: any, callbackFunc: Function, callbackObj: any): void {
		var callback: Function = function (param: any): void {
			this.removeServerMsg(key, callback, this);
			callbackFunc.apply(callbackObj, param);
		}
		this.receiveServerMsg(key, callback, this);
	}

	/**
	 * 注册从Http服务端返回的Update消息
	 * @param key 消息标识
	 * @param callbackFunc 处理函数
	 * @param callbackObj 处理函数所属对象
	 */
	public receiveServerHttpUpdateMsg(key: any, callbackFunc: Function, callbackObj: any): void {
		this.receiveServerMsg(key + "_HttpUpdate", callbackFunc, callbackObj);
	}

	/**
	 * 注册从Http服务端返回的Update消息，仅一次，执行完成后删除
	 * @param key 消息标识
	 * @param callbackFunc 处理函数
	 * @param callbackObj 处理函数所属对象
	 */
	public receiveServerHttpUpdateMsgOnce(key: any, callbackFunc: Function, callbackObj: any): void {
		this.receiveServerMsgOnce(key + "_HttpUpdate", callbackFunc, callbackObj);
	}

	/**
	 * 移除服务端返回消息的监听
	 * @param key 消息标识
	 * @param callbackFunc 处理函数
	 * @param callbackObj 处理函数所属对象
	 */
	public removeServerMsg(key: any, callbackFunc: Function, callbackObj: any): void {
		GlobalApp.MessageCenter.unregister(key, callbackFunc, callbackObj);
	}

	/**
	 * 移除从Http服务端返回的Update消息
	 * @param key 消息标识
	 * @param callbackFunc 处理函数
	 * @param callbackObj 处理函数所属对象
	 */
	public removeServerHttpUpdateMsg(key: any, callbackFunc: Function, callbackObj: any): void {
		this.removeServerMsg(key + "_HttpUpdate", callbackFunc, callbackObj);
	}

	/**
	 * 向服务器发送消息
	 */
	public sendMessage(): void {

	}
}