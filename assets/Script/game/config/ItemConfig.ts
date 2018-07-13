import { ConfigBase } from "./ConfigBase";

export class ItemConfig extends ConfigBase {
    public tool_id: number;
    public tool_name: string;
    public tool_desc: string;
    public tool_icon: string;
    public tool_icon_orign: string;
    public tool_icon_addr: string;
    public tool_sort: number;
    public tool_sort_name: string;
    public tool_color: number;
    public cooldown_time: number;

    constructor() {
        super();
    }

    public init(obj: any): void {
        this.tool_id = obj.tool_id;
        this.tool_name = obj.tool_name;
        this.tool_desc = obj.tool_desc;
        this.tool_icon_orign = obj.tool_icon;
        this.tool_icon_addr = obj.tool_icon_addr;
        this.tool_icon = obj.tool_icon_addr + obj.tool_icon + ".png";
        this.tool_sort = obj.tool_sort;
        this.tool_sort_name = obj.tool_sort_name;
        this.tool_color = obj.tool_color;
        this.cooldown_time = obj.cooldown_time;
    }
}
