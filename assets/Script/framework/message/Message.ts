/**
* name 
*/
export class Message {
	public type: string;
	public param: any[];

	constructor() {
	}

	public dispose() {
		this.type = null;
		this.param = null;
	}
}