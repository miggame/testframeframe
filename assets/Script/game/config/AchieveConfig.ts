/**
* name 
*/

export class AchieveConfig {
	public ar_id: number;
	public need_lv: number;
	public type: number;
	public ar_desc: string;
	public target_desc: string;
	public max_count: number;
	public achieve_value: number;
	public coin1: number;
	public coin2: number;
	public reward: number;
	public reward_num: number;
	public drop_id: number;
	constructor() {

	}

	public init(obj: any) {
		this.ar_id = obj.ar_id;
		this.need_lv = obj.need_lv;
		this.type = obj.type;
		this.ar_desc = obj.ar_desc;
		this.target_desc = obj.target_desc;
		this.max_count = obj.max_count;
		this.achieve_value = obj.achievement_value;
		this.coin1 = obj.prize_coin1;
		this.coin2 = obj.prize_coin2;
		this.reward = obj.reward;
		this.reward_num = obj.reward_num;
		this.drop_id = obj.drop_id;
	}
}
