import { StaticStr } from "../config/StaticStr";

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
		this.msg = msg || StaticStr.DEFAULT;
		this.code = code;
	}
}
/**
 * 数据库事务开启异常
 * 自定义返回信息和code
 */
// tslint:disable-next-line:max-classes-per-file
export class TransactionNotStartedError extends BaseException {
	constructor() {
		super();
		this.msg = "数据库事务开启失败";
		this.code = 500;
	}
}
/**
 * 存在事务无法执行当前查询
 * 自定义返回信息和code
 */
// tslint:disable-next-line:max-classes-per-file
export class QueryRunnerAlreadyReleasedError extends BaseException {
	constructor() {
		super();
		this.msg = "存在事务无法执行当前查询";
		this.code = 500;
	}
}
/**
 * 查询数据库出错
 * 自定义返回信息和code
 */
// tslint:disable-next-line:max-classes-per-file
export class QueryFailedError extends BaseException {
	constructor() {
		super();
		this.msg = "查询数据库出错";
		this.code = 500;
	}
}
