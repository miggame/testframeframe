
export interface ISpriteHelper {
    getNode();
    setNode(val:any);
    addChild(node: ISpriteHelper);
    removeChild(node: ISpriteHelper);
    removeChildren();
    setInVisible(show: boolean);
    addChildAt(val:ISpriteHelper,index:number);
}