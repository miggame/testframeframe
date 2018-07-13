import { ToolInfo } from "./ToolInfo";

export class ToolManager {
    public static readonly Instance: ToolManager = new ToolManager();

    private toolPool: Map<number, ToolInfo>;

    public init(): void {
        this.toolPool = new Map<number, ToolInfo>();

    }

    public addToolInfo(index: number, info: ToolInfo): void {
        this.toolPool.set(index, info);


    }

    public getToolInfo(index: number): ToolInfo {
        return this.toolPool.get(index);
    }





}
