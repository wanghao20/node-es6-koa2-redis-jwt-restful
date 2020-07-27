import { verify } from 'jsonwebtoken';

import { Context } from 'koa';

import { JWT_SECRET } from '../config/Constants';
import { BaseConfig } from '../config/Base';

import { logError } from './Logger';
import { errorMsg, successData } from './returnResult';
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
			ctx.res.setHeader('Access-Control-Allow-Origin', '*');
			ctx.res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
			ctx.res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authentication');
			ctx.res.setHeader('Content-Type', 'application/json; charset=utf-8');
			if (ctx.req.method === 'OPTIONS') {
				return (ctx.body = successData());
			}
			// 判断Url是否不用验证token
			let isOpenUrl = false;
			// tslint:disable-next-line:only-arrow-functions
			await BaseConfig.OPEN_URL.find(function (value) {
				if (value === ctx.originalUrl) {
					isOpenUrl = true;
				}
			});
			// 需要验证token
			if (!isOpenUrl) {
				// 需要验证token的接口
				try {
					const decodedToken = await verify(ctx.headers.authentication, JWT_SECRET);
					// 解析token保存到中间间
					ctx.user = decodedToken; // 这里的key = 'user'
					try {
						// try {
						// 	console.log('解密' + ctx.request.body.key);
						// 	const dkey = ctx.request.body.key;
						// 	// 客户端私钥解密数据
						// 	const key = await Encryption.privateDecrypt(dkey);
						// 	// 对称解密
						// 	ctx.request.body.uid = await Encryption.aesDecrypt(ctx.request.body.uid, key);
						// 	console.log('解密后' + ctx.request.body.uid);
						// 	console.log(ctx.request.body.uid);
						// } catch (error) {
						// 	console.log('数据解密错误');
						// }

						await next();
						// // 服务器公钥加密数据
						// const key = Encryption.publicEncrypt(symmetryKey);
						// // 对称加密
						// ctx.body.key = key;
						// ctx.body.data = Encryption.aesEncrypt(JSON.stringify(ctx.body.data), symmetryKey);
						// console.log(ctx.body.data);
					} catch (error) {
						// 判断是否是系统错误
						if (error.msg) {
							ctx.status = error.code;

							return (ctx.body = errorMsg(error.msg, error.code));
						} else {
							logError(error.message, ctx.ip);
							ctx.status = 500;

							return (ctx.body = errorMsg('服务器错误', 500));
						}
					}
				} catch (error) {
					ctx.status = 401;

					return (ctx.body = errorMsg('当前token失效', 401));
				}
			} else {
				// 白名单接口直接通过
				try {
					await next();
				} catch (error) {
					ctx.status = error.code || 500;

					return (ctx.body = errorMsg(error.msg || error.message, error.code || 500));
				}
			}
			// 判断404
			if (ctx.status === 404) {
				ctx.status = 404;

				return (ctx.body = errorMsg('未找到当前路径', 404));
			}
			// // 验证请求数据是否添加时间戳
			// if (!isUndefined(ctx.req.headers.now_date)) {
			//   // 通过
			// } else {
			//   // 不通过
			//   // 快速返回
			//   ctx.status = 401; // 让options请求快速返回
			//   ctx.body = { status: 401, message: "请求参数无效" };
			//   // 记录日志
			//   // tslint:disable-next-line:no-console
			//   console.log(`${ctx.method} ${ctx.ip}:${ctx.url} ${ctx.status} - date:${Date.now()}`);
			// }
		};
	}
}
