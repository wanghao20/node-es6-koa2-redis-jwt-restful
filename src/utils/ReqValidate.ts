import Joi = require("@hapi/joi");

import { StaticStr } from "../config/StaticStr";

import { VerifyException } from "./Exceptions";
/**
 * Created by wh on 2020/7/18
 * author: wanghao
 * @desc：请求参数验证(Joi:https://hapi.dev/module/joi/:https://github.com/hapijs/joi/blob/v8.0.5/API.md)
 * https://www.cnblogs.com/zzbo/p/5906101.html
 */
export class Validate {
	/**
	 * 判断参数是否是字符串
	 * @param val 需要验证的字符
	 */
	public static isId(val: string) {
		const schema = Joi.object({
			"str": Joi.string().min(1).max(40).required(),
		});
		const { error, value } = schema.validate({ "str": val });
		if (error) {
			throw new VerifyException(StaticStr.ERR_MSG_VERIFY_DEFAULT,  StaticStr.ERR_CODE_DEFAULT);
		}
	}

	/**
	 * 判断参数是否是指定对象
	 * @param val 传入判断的对象
	 */
	public static isObj(val: object) {
		// 暂时判断是否为空
		const schema = Joi.object({
			"str": Joi.object().required(),
		});
		const { error, value } = schema.validate({ "str": val });
		if (error) {
			throw new VerifyException(StaticStr.ERR_MSG_VERIFY_DEFAULT,  StaticStr.ERR_CODE_DEFAULT);
		}
	}

	/**
	 * 判断参数是否是array
	 * @param val 判断是否是list
	 */
	public static isArray(val: Array<any>) {
		// 暂时判断是否为空
		const schema = Joi.object({
			"str": Joi.array().min(1).max(500).required(),
		});
		const { error, value } = schema.validate({ "str": val });
		if (error) {
			throw new VerifyException(StaticStr.ERR_MSG_VERIFY_DEFAULT,  StaticStr.ERR_CODE_DEFAULT);
		}
	}
	/**
	 * 判断数据是否是有效数字
	 * @param val number
	 */
	public static isNumber(val: number) {
		// 暂时判断是否为空
		const schema = Joi.object({
			"str": Joi.required(),
		});
		const { error, value } = schema.validate({ "str": val });
		if (error) {
			throw new VerifyException(StaticStr.ERR_MSG_VERIFY_DEFAULT,  StaticStr.ERR_CODE_DEFAULT);
		}
	}

	/**
	 * 判断数据是否有效
	 * @param val any
	 */
	public static isValid(val: number) {
		// 暂时判断是否为空
		const schema = Joi.object({
			"str": Joi.required(),
		});
		const { error, value } = schema.validate({ "str": val });
		if (error) {
			throw new VerifyException(StaticStr.ERR_MSG_VERIFY_DEFAULT,  StaticStr.ERR_CODE_DEFAULT);
		}
	}

	/**
	 * 判断字符串是否符合规格
	 * @param name 用户名称
	 * @param pwd 用户密码
	 */
	public static user(name: string, pwd: string) {
		// 暂时判断是否为空
		const schema = Joi.object({
			"str1": Joi.string().min(3).max(10).required(),
			"str2": Joi.string().min(6).max(15).required(),
		});
		const { error, value } = schema.validate({ "str1": name, "str2": pwd });
		if (error) {
			throw new VerifyException("参数验证未成功",  StaticStr.ERR_CODE_DEFAULT);
		}
	}
}
