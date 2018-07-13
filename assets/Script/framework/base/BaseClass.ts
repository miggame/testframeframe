/**
* 基类 
*/
export class BaseClass {
	constructor() {

	}

	/**
	 * 获取类对象的singleton
	 * @param args 类构成函数中需要传递的参数
	 */
	public static getInstance(...args: any[]): any {
		var clazz: any = this;
		if (clazz._instance == null) {
			var argsLen = args.length;
			if (argsLen == 0) {
				clazz._instance = new clazz();
			}
			else if (argsLen == 1) {
				clazz._instance = new clazz(args[0]);
			}
			else if (argsLen == 2) {
				clazz._instance = new clazz(args[0], args[1]);
			}
			else if (argsLen == 3) {
				clazz._instance = new clazz(args[0], args[1], args[2]);
			}
			else if (argsLen == 4) {
				clazz._instance = new clazz(args[0], args[1], args[2], args[3]);
			}
			else if (argsLen == 5) {
				clazz._instance = new clazz(args[0], args[1], args[2], args[3], args[4]);
			}
		}
		return clazz._instance;
	}
}