import { ResData } from "../config/Type";
import { StaticStr } from "../config/StaticStr";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 返回结果处理
 */

/**
 * 请求成功返回结果
 * @param _data 返回数据体
 */
const successData = (data?: any) => {
	const obj: ResData = { "code": 200, "msg": "操作成功!", "data": data || "" };

	return obj;
};

/**
 * 失败返回结果
 * @param _msg 返回的消息
 * @param _code code
 */
const errorMsg = (msg?: string, code?: any) => {
	const obj: ResData = { "code": code || StaticStr.ERR_CODE_DEFAULT, "msg": msg || "服务器错误!" };

	return obj;
};

// tslint:disable-next-line:no-unused-expression
export { successData, errorMsg };
