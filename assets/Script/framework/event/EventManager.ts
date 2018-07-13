import { CustomerEvent } from './CustomEvent';
import { BaseClass } from '../base/BaseClass';


//所有消息只能用于通知，不能用于帧同步逻辑使用
export class GameEventDef {

	public static GameEventDef_System_ResLoadOK = "GameEventDef_System_ResLoadOK";
	public static GameEventDef_System_ResLoadFail = "GameEventDef_System_ResLoadFail";


	
}


/**
* name 
* 自定义事件管理器
*/
export class EventManager extends BaseClass {
	private m_eventPool: Array<CustomerEvent>;
	private m_observerDict: any;
	private m_eventList: Array<CustomerEvent>;
	private m_lastRunTime: number;
	private m_tArray: Array<any>;
	constructor() {
		super();
		this.m_eventPool = new Array<CustomerEvent>();
		this.m_observerDict = {};
		this.m_eventList = new Array<CustomerEvent>();
		this.m_lastRunTime = 0;
		this.m_tArray = new Array<any>();
	}

	public clear() {
		this.m_observerDict = {};
		this.m_eventList.splice(0);
	}

	/**
	 * 
	 * @param type 事件类型
	 * @param observer 观察者（监听函数）
	 * @param bindObj 观察者所属对象
	 */
	public addEvent(type: string, observer: Function, bindObj: any): void {
		var arr: Array<any> = this.m_observerDict[type];
		if (arr == null) {
			arr = new Array<any>();
			this.m_observerDict[type] = arr;
		}

		var index: number = 0;
		var len: number = arr.length;
		for (index; index < len; index++) {
			var element = arr[index];
			if (element[0] === observer && element[1] === bindObj) {
				console.log("repeat bind")
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
	public removeEvent(type: string, observer: Function, bindObj: any): void {
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
	 * 移除绑定对象的所有事件监听
	 * @param bindObj 
	 */
	public removeAllEvents(bindObj: any): void {
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
	 * 派发事件
	 * @param type 
	 * @param params 
	 */
	public dispatchEvent(type: string, ...params: any[]): void {
		if (this.m_observerDict[type] == null) {
			return;
		}

		var e: CustomerEvent = this.popEvent();
		e.type = type;
		e.param = params;
		this.processEvent(e);
	}


	private getPos(t: any, arr: Array<any>): number {
		let ret = -1;
		for (let i = 0; i < arr.length; ++i) {
			if (arr[i] === t) {
				ret = i;
				return ret;
			}
		}

		return ret;
	}
	/**
	 * 处理事件回调
	 * @param event 
	 */
	private processEvent(event: CustomerEvent): void {
		this.m_tArray.splice(0);
		var observers: Array<any> = this.m_observerDict[event.type];
		var i: number = 0;
		var len: number = observers.length;
		var observer: Array<any> = null;
		while (i < len) {
			observer = observers[i];
			this.m_tArray.push(observer);
			observer[0].apply(observer[1], event.param);
			if (observers.length != len) {
				//需要重新计算位置
				len = observers.length;
				i = len;
				for (let tPos = this.m_tArray.length - 1; tPos >= 0; --tPos) {
					let nPos = this.getPos(this.m_tArray[tPos], observers);
					if (nPos != -1) {
						i = nPos + 1;
						break;
					}
				}
			}
			else {
				i++;
			}

		}
		event.dispose();
		this.m_eventPool.push(event);
	}

	private popEvent(): CustomerEvent {
		if (this.m_eventPool.length > 0) {
			return this.m_eventPool.pop();
		}
		return new CustomerEvent();
	}
}