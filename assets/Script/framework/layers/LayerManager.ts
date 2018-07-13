import { BaseLayer } from './BaseLayer';
import { ISpriteHelper } from '../mvc/ISpriteHelper';
/**
* name 
* 游戏层级管理，也可理解为Group管理，每一层其实管理的是归类为同一组的对象
*/

export class LayerManager {
	/**
	 * 游戏背景层
	 * 负责处理跟游戏地图相关的逻辑
	 */
	public static Background: BaseLayer = null;
	/**
	 * 游戏逻辑层
	 * 负责游戏场景中各个实体（角色、NPC、装饰物、特效）等管理
	 */
	public static Game: BaseLayer = null;
	/**
	 * 游戏UI显示基本层
	 * UI默认显示在Main层，有特殊弹窗需求的分别放置到对应PopUp,Message和Tip层
	 */
	public static UIMain: BaseLayer = null;
	/**
	 * 游戏UI弹窗
	 */
	public static UIPopUp: BaseLayer = null;
	/**
	 * 游戏消息提示类UI层
	 */
	public static UIMessage: BaseLayer = null;
	/**
	 * 游戏道具提示或者帮助提示层
	 */
	public static UITip: BaseLayer = null;
	/**
	 * 游戏引导层
	 * 负责新手引导相关的UI显示管理
	 */
	public static UIGuide: BaseLayer = null;

	public static init(t: any) {
		LayerManager.Background = new BaseLayer(new t("Background"));
		LayerManager.Game = new BaseLayer(new t("Game"));
		LayerManager.UIMain = new BaseLayer(new t("UIMain"));
		LayerManager.UIPopUp = new BaseLayer(new t("UIPopUp"));
		LayerManager.UIMessage = new BaseLayer(new t("UIMessage"));
		LayerManager.UITip = new BaseLayer(new t("UITip"));
		LayerManager.UIGuide = new BaseLayer(new t("UIGuide"));
	}
}