/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 异常处理
 */
export class BaseException extends Error {
	/**
         * 状态码
         */
	public code: number;
	/**
         * 提示信息
         */
	public msg: string;
}

/**
 * 数据验证异常
 * 自定义返回信息和code
 */
// tslint:disable-next-line:max-classes-per-file
export class VerifyException extends BaseException {
	constructor(msg: string, code: number) {
		super();
		this.msg = msg || '信息错误';
		this.code = code;
	}
}
