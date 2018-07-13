/**
* name 
*/
export class CustomerEvent {
	public type: string;
	public param: any[];

	constructor() {
	}

	public dispose() {
		this.type = null;
		this.param = null;
	}
}