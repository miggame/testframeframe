import { GlobalApp } from "../../framework/GlobleApp";

/**
* name 
*/

export class UIUtil {
	/** 数字超过指定大小则显示具体单位 */
	public static formatNum(num: number): string {
		if (num < 100000) {
			return num.toString();
		}
		else if (num < 1000000) {
			return Math.floor(num / 1000 / 10).toString() + "万";
		}
		else {
			return Math.floor(num / 10000).toString() + "万";
		}
	}

	/** 显示msg提示 */
	public static showMsg(content) {
		//GlobalApp.CtrlMgr.getController(CtrlConst.Tip).applyFunc(CmdConst.ShowMsg, content);
	}
}
