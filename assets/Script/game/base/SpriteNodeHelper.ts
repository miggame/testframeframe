import { ISpriteHelper } from '../../framework/mvc/ISpriteHelper';

export class SpriteNodeHelper implements ISpriteHelper {
    private _node: cc.Node;
    constructor(name: string) {
        this._node = new cc.Node(name);
    }

    public getNode() {
        return this._node;
    }

    public setNode(val: any) {
        this._node = val;
    }

    public addChild(node: ISpriteHelper) {
        this._node.addChild(node.getNode());
    }

    public removeChild(node: ISpriteHelper) {
        this._node.removeChild(node.getNode());
    }

    public setInVisible(show: boolean) {
        this._node.active = show;
    }

    public removeChildren() {
        this._node.removeAllChildren();
    }

    public addChildAt(val: ISpriteHelper, index: number) {
        this._node.addChild(val.getNode(), index);
    }



}