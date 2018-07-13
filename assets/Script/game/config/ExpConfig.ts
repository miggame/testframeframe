import { ConfigBase } from "./ConfigBase";

/**
* name 
*/

export class ExpConfig extends ConfigBase {

	public id: number;
	public lv: number;
	public exp: number;

	constructor() {
		super()
	}

	public init(obj: any): void {
		this.id = obj.id;
		this.lv = obj.lv;
		this.exp = Number(obj.king);
	}
}
