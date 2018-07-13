/**
* name 
*/

export class DropConfig {
	public drop_id: number;
	/** 
	 * 掉落数据类型
	 * 1：物品
	 * 2：掉落id
	 * 3：游戏币
	 * 4：元宝
	 * 5：经验
	 */
	public drop_data_type: number;
	public drop_item_id: number;
	public drop_num: number;
	constructor() {

	}

	public init(obj: any) {
		this.drop_id = obj.drop_id;
		this.drop_data_type = obj.drop_data_type;
		this.drop_item_id = obj.drop_item_id;
		this.drop_num = obj.drop_num;
	}
}
