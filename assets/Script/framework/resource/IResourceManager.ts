
export interface IResourceManager {

    loadAsset(name: string, bind: any, cb: Function, userData: any);
    //unLoadAsset(obj: any);
    unLoadAssetTarget(obj: any);
}
