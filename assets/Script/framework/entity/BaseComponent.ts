import { iComponet } from "./iComponet";

export class BaseComponent implements iComponet {
    constructor() {
        this.mark = true;
    }
    public mark: boolean;


}
