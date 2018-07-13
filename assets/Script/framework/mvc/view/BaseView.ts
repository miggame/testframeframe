import { BaseController } from "../controller/BaseController";
import { IView } from "./IView";
import { ISpriteHelper } from '../ISpriteHelper';
import { Game } from "../../../game/Game";
import { LoadAssetCallBacks } from "../../resource/LoadAssetCallBacks";
import { SpriteNodeHelper } from "../../../game/base/SpriteNodeHelper";
import { GlobalApp } from '../../GlobleApp';
import { LoadAssetTask } from "../../resource/LoadAssetTask";

/**
* 界面基础视图
* 原本考虑不继承Sprite，以包装类的形式持有具体ui窗口的显示对象，但考虑到针对显示对象 的api接口都要重写，暂时采用继承，后续有时间再优化
*/
export class BaseView implements IView {
	protected _content: ISpriteHelper;
	private _controller: BaseController;
	private _resources: any[] = null;
	protected _isInit: boolean;
	private _myParent: ISpriteHelper;
	private _resName: string;
	private _loadTask: LoadAssetTask;
	private _isDestory: boolean;
	private _resSrc: any;
	constructor(ctrl: BaseController, parent: ISpriteHelper, resName: string) {
		this._content = null;
		this._controller = ctrl;
		this._myParent = parent;
		this._resName = resName;
		this._isInit = false;
		this._isDestory = false;
		this._resSrc = null;
	}

	/**
 * 获取我的父级
 * @returns {DisplayNode}
 */
	public get myParent(): ISpriteHelper {
		return this._myParent;
	}
	
	


	/**
	 * 设置初始加载资源
	 * @param resources
	 */
	public setResources(resources: any[]): void {
		this._resources = resources;
	}

	/**
	 * 是否已经初始化
	 * @returns {boolean}
	 */
	public isInit(): boolean {
		return this._isInit;
	}

	/**
	 * 触发本模块消息
	 * @param key 唯一标识
	 * @param param 参数
	 *
	 */
	public applyFunc(key: any, ...param: any[]): any {
		return this._controller.applyFunc.apply(this._controller, arguments);
	}

	/**
	 * 触发其他模块消息
	 * @param controllerKey 模块标识
	 * @param key 唯一标识
	 * @param param 所需参数
	 *
	 */
	public applyControllerFunc(controllerKey: number, key: any, ...param: any[]): any {
		return this._controller.applyControllerFunc.apply(this._controller, arguments);
	}

	/**
	 * 面板是否显示
	 * @return
	 *
	 */
	public isShow(): boolean {
		return this.myParent != null;
	}

	/**
	 * 添加到父级
	 */
	public addToParent(posCenter: boolean = true): void {
		// this._myParent.addChild(this.content);
		this._myParent.addChild(this._content);
		if (posCenter) {
			//todo
			//this.x = this.stage.designWidth - this.content.width >> 1;
			//this.y = this.stage.designHeight - this.content.height >> 1;
		}
	}

	/**
	 * 从父级移除
	 */
	public removeFromParent(): void {
		// if (this.content.parent != null) {
		// 	this.content.parent.removeChild(this.content);
		// }
		if (this._myParent != null) {
			this._myParent.removeChild(this._content);
		}
	}

	/**
	 *对面板进行显示初始化，用于子类继承
	 *
	 */
	public initUI(): void {
		this._isInit = true;
	}

	/**
	 *对面板数据的初始化，用于子类继承
	 *
	 */
	public initData(): void {

	}

	/**
	 * 销毁
	 */
	public destroy() {
		this._content = null;

		if (this._resSrc) {
			Game.ResourceMgr.unLoadAssetTarget(this._resSrc);
		}

		this._isDestory = true;
		this._loadTask = null;
		this._controller = null;
		this._myParent = null;
		this._resources = null;


	}

	/**
	 * 面板开启执行函数，用于子类继承
	 * @param param 参数
	 */
	public open(...param: any[]): void {
		if (!this._isInit) {
			//处理加载问题
			this._loadTask = Game.ResourceMgr.loadAsset(this._resName, new LoadAssetCallBacks(this, this.onLoad, this.onLoadErr), null);
		}
		else {
			this.onOpen();
			this.addToParent();
		}
	}

	public onOpen(): void {

	}

	/**
	 * 面板关闭执行函数，用于子类继承
	 * @param param 参数
	 */
	public close(...param: any[]): void {
		this.removeFromParent();
	}

	/**
	 /**
	 * 加载面板所需资源 由于采用内嵌模式，当资源加载完成后即可实例化ui视图
	 */
	public loadResource(loadComplete: Function, initComplete: Function): void {
		if (this._resources && this._resources.length > 0) {
			// todo 加载ui资源，监听ui初始完成之后调用回调方法
		}
		else {
			loadComplete();
			initComplete();
		}
	}

	/**
	 * 设置是否隐藏
	 * @param value
	 */
	public setVisible(value: boolean): void {
		this._content.setInVisible(value);
	}

	/**
	 * 视图包含的显示内容
	 */
	public get content(): ISpriteHelper {
		if (this._content == null) {
			console.error("视图显示对象content未初始化！请检查代码");
		}
		return this._content;
	}
	private onLoad(e: any) {
		this._resSrc = e[1];
		if (this._isDestory) {
			this.destroy();
			return;
		}

		let t = new SpriteNodeHelper(e[0]);
		t.setNode(cc.instantiate(e[1]))
		this._content = t;
		this.addToParent();
		this.initUI();
		this.onOpen();
	}

	private onLoadErr(e: any) {
		GlobalApp.LogMgr.error("load ui error:" + this._resName);
	}


	// /**
	//  * 视图的宽度
	//  */
	// public get width(): number {
	// 	return this.content.width;
	// }

	// /**
	//  * 视图的高度
	//  */
	// public get height(): number {
	// 	return this.content.height;
	// }

	// public get x():number{
	// 	return this.content.x;
	// }

	// public set x(value:number)
	// {
	// 	this.content.x = value;
	// }

}