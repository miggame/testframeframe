
export interface ILoadResourceAgentHelper {
    readFile(fullPath: string): void;
    loadAsset(obj: any, name: string): void;
    reset(): void;
}
