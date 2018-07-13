export interface iGameComponent {
    getName(): string;
    onInit(owner:any): void;
    onUpdate(delta: number, realDelta: number): void;
    onShutDown(): void;
}