import { verify } from "jsonwebtoken";

import { Context } from "koa";

import { BaseConfig } from "../config/Base";
import { JWT_SECRET } from "../config/Constants";
import { StaticStr } from "../config/StaticStr";

import { logError } from "./Logger";
import { errorMsg, successData } from "./returnResult";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：请求验证/过滤
 */
export class Filter {
	/**
	 * reqfilter
	 * @desc：请求验证/过滤
	 */
	public static reqfilter() {
		return async (ctx: Context, next: () => Promise<void>) => {
			// 跨域请求设置
			ctx.res.setHeader("Access-Control-Allow-Origin", "*");
			ctx.res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
			ctx.res.setHeader("Access-Control-Allow-Headers", "Content-Type,Accept,Authentication");
			ctx.res.setHeader("Content-Type", "application/json; charset=utf-8");
			if (ctx.req.method === "OPTIONS") {
				return (ctx.body = successData());
			}
			// 判断Url是否不用验证token
			let isOpenUrl = false;
			BaseConfig.OPEN_URL.find(function (value) {
				if (value === ctx.originalUrl) {
					isOpenUrl = true;
				}
			});
			try {
				// 需要验证token
				if (isOpenUrl) {
					// 白名单接口直接通过
					await next();
				} else {
					const decodedToken = verify(ctx.headers.authentication, JWT_SECRET);
					// 解析token保存到中间间
					ctx.user = decodedToken; // 这里的key = 'user'
					await next();
				}
			} catch (error) {
				Filter.catchError(ctx, error);
			}

			// 判断404
			if (ctx.status === 404) {
				ctx.status = 404;

				return (ctx.body = errorMsg("未找到当前路径", 404));
			}
		};
	}

	/**
	 * 捕捉错误处理后记录日志
	 * @param ctx koa
	 * @param error 错误信息
	 */
	public static async catchError(ctx: Context, error: any) {
		// 判断是否是参数错误
		if (error.msg) {
			ctx.status = StaticStr.ERR_CODE_DEFAULT;
			// logError(error.msg, ctx.ip);

			return (ctx.body = errorMsg(error.msg, StaticStr.ERR_CODE_DEFAULT));
		} else if (error.message === "invalid token" || error.message === "jwt must be provided") {
			// token验证错误
			ctx.status = 401;

			return (ctx.body = errorMsg("当前token失效", 401));
		} else {
			// 系统错误
			logError(error.message, ctx.ip);
			ctx.status = 500;

			return (ctx.body = errorMsg("服务器错误", 500));
		}
	}
}
