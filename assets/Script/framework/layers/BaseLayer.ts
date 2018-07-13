import { ISpriteHelper } from "../mvc/ISpriteHelper";

/**
* name 
*/
export class BaseLayer {
	private _node: ISpriteHelper;
	constructor(node: ISpriteHelper) {
		this._node = node;
	}

	public get node(): ISpriteHelper {
		return this._node;
	}

	public removeChildren() {
		this._node.removeChildren();
	}

	public addChild(val: BaseLayer) {
		this._node.addChild(val._node);
	}

	public addChildAt(val: BaseLayer, index: number) {
		this._node.addChildAt(val._node, index);
	}

	public removeChild(val: BaseLayer) {
		this._node.removeChild(val._node);
	}


}