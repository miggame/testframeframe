/**
* name 
*/

export class BattleBoxData {
	/** 宝箱ID 对应物品表 */
	public id: number;
	/** 
	 * 当前宝箱cd时间 
	 * -1代表未激活
	 * 大于0则代表已开启（passedTime)
	 * 等于0则代表已领取
	 */
	public getTime: number;
	/** 宝箱剩余时间 */
	public leftTime: number;
	public tick: number;

	public getPassedTime(): number {
		let passTime = Date.now() - this.tick - this.getTime
		// Log.info("passTime = "+passTime);
		if (passTime < 0) {
			passTime = 0;
		}
		return passTime;
	}
}
