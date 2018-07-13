import { ToolInfo } from "./ToolInfo";

export class ToolDataInfo {
    public toolID: number;

    public toolInfo: ToolInfo;
    constructor() {
        this.toolID = 0;
    }



    public deserialize(info: any) {
        this.toolID = info["toolID"];

    }

    public serialize(): any {
        let t = {};
        t["toolID"] = this.toolID;

        return t;
    }

}
