import { Message } from "./Message";
import { BaseClass } from "../base/BaseClass";

/**
* name 
*/
export class MessageCenter extends BaseClass {
	private m_msgPool: Array<Message>;
	private m_observerDict: any;
	private m_msgList: Array<Message>;
	private m_lastRunTime: number;
	private m_type: number;

	/**
	 * 
	 * @param type 0:使用分帧处理 1:及时执行
	 */
	constructor(type: number) {
		super();
		this.m_type = type;
		this.m_msgPool = new Array<Message>();
		this.m_observerDict = {};
		this.m_msgList = new Array<Message>();
		this.m_lastRunTime = 0;
		if (this.m_type == 0) {
			//todo 使用帧更新处理事件回调
		}
	}

	public clear() {
		this.m_observerDict = {};
		this.m_msgList.splice(0);
	}

	/**
	 * 
	 * @param type 消息类型
	 * @param observer 观察者（监听函数）
	 * @param bindObj 观察者所属对象
	 */
	public register(type: string, observer: Function, bindObj: any): void {
		var arr: Array<any> = this.m_msgList[type];
		if (arr == null) {
			arr = new Array<any>();
			this.m_observerDict[type] = arr;
		}

		var index: number = 0;
		var len: number = arr.length;
		for (index; index < len; index++) {
			var element = arr[index];
			if (element[0] == observer && element[1] == bindObj) {
				return;
			}
		}

		arr.push([observer, bindObj]);
	}

	/**
	 * 
	 * @param type 
	 * @param observer 
	 * @param bindObj 
	 */
	public unregister(type: string, observer: Function, bindObj: any): void {
		var arr: Array<any> = this.m_observerDict[type];
		if (arr == null) {
			return;
		}

		var index: number = 0;
		var len: number = arr.length;
		for (index; index < len; index++) {
			var element = arr[index];
			if (element[0] == observer && element[1] == bindObj) {
				arr.splice(index, 1);
				break;
			}
		}

		if (arr.length == 0) {
			this.m_observerDict[type] = null;
			delete this.m_observerDict[type];
		}
	}

	/**
	 * 移除绑定对象的所有消息监听
	 * @param bindObj 
	 */
	public unregisterAll(bindObj: any): void {
		var keys = Object.keys(this.m_observerDict);
		for (var index = 0; index < keys.length; index++) {
			var type = keys[index];
			var arr: Array<any> = this.m_observerDict[type];
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][1] == bindObj) {
					arr.splice(i, 1);
					i--;
				}
			}

			if (arr.length == 0) {
				this.m_observerDict[type] == null;
				delete this.m_observerDict[type];
			}
		}
	}

	/**
	 * 广播消息
	 * @param type 
	 * @param params 
	 */
	public boardcast(type: string, ...params: any[]): void {
		if (this.m_observerDict[type] == null) {
			return;
		}

		var e: Message = this.popEvent();
		e.type = type;
		e.param = params;
		if (this.m_type == 0) {
			this.m_msgList.push(e);
		}
		else if (this.m_type == 1) {
			this.processMsg(e);
		}
	}

	/**
	 * 处理服务器消息回调
	 * @param event 
	 */
	private processMsg(event: Message): void {
		var observers: Array<any> = this.m_observerDict[event.type];
		var i: number = 0;
		var len: number = observers.length;
		var observer: Array<any> = null;
		while (i < len) {
			observer = observers[i];
			observer[0].apply(observers[1], event.param);
			if (observers.length != len) {
				len = observers.length;
				i--;
			}
			i++;
		}
		event.dispose();
		this.m_msgPool.push(event);
	}

	private popEvent(): Message {
		if (this.m_msgPool.length > 0) {
			return this.m_msgPool.pop();
		}
		return new Message();
	}

	/**
	 * 配合帧更新，来实现消息队列的事件处理
	 */
	private run() {

	}
}