import { IResourceHelper } from "./IResourceHelpr";
import { ObjectBase } from "../objectpool/ObjectBase";

    /**
     * 暂时不使用此类，此对象保存的是资源的原始加载对象
     */
    export class ResourceObject extends ObjectBase {

        private _resourceHelp: IResourceHelper;
        constructor(name: string, target: any, resourceHelp: IResourceHelper) {
            super(name, target);
            this._resourceHelp = resourceHelp;
        }


        public onRelease() {
            this._resourceHelp.release(this.target);
        }

    }
