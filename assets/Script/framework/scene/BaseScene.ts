import { GlobalApp } from "../GlobleApp";
import { BaseLayer } from "../layers/BaseLayer";

export class BaseScene {
	private _layers: Array<BaseLayer>;
	constructor() {
		this._layers = new Array<BaseLayer>();
	}

	/**
	 * 当进入场景
	 */
	public onEnter(): void {

	}

	/**
	 * 当离开场景
	 */
	public onExit(): void {
		GlobalApp.ViewMgr.closeAll();
		this.removeAllLayers();
	}

	public addLayer(layer: BaseLayer): void {
		GlobalApp.SceneMgr.scenesRoot.addChild(layer);
		this._layers.push(layer);
	}

	public addLayerAt(layer: BaseLayer, index: number): void {
		GlobalApp.SceneMgr.scenesRoot.addChildAt(layer, index);
		this._layers.push(layer);
	}

	public removeLayer(layer: BaseLayer): void {
		GlobalApp.SceneMgr.scenesRoot.removeChild(layer);
		this._layers.splice(this._layers.indexOf(layer), 1)
	}

	public removeAllChildrenInLayer(layer: BaseLayer): void {
		layer.removeChildren();
	}

	public removeAllLayers(): void {
		while (this._layers.length) {
			var layer: BaseLayer = this._layers[0];
			this.removeAllChildrenInLayer(layer);
			this.removeLayer(layer);
		}
	}
}