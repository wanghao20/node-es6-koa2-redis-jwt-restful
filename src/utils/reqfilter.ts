import { Context } from "koa";

import { verify } from "jsonwebtoken";

import { BaseConfig } from "../config/Base";
import { JWT_SECRET } from "../config/Constants";
import { StaticStr } from "../config/StaticStr";
import { TbLog } from "../format/Type";

import { BullMQ } from "./BullMQ";
import { logError } from "./Logger";
import { ReturnResult } from "./ReturnResult";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：请求验证/过滤
 */
export class Filter {
	/**
	 * 消息中间件
	 */
    public bull: BullMQ;
    constructor() {
        this.bull = new BullMQ();
    }
	/**
	 * reqfilter
	 * @desc：请求验证/过滤
	 */
    public reqfilter() {
        return async (ctx: Context, next: () => Promise<void>) => {
            // 参数设置
            ctx.params = {
                ...ctx.request.body,
                ...ctx.query
            };
            try {
                let url = ctx.originalUrl.substring(0, ctx.originalUrl.indexOf("?"));
                if (url === "") {
                    url = ctx.originalUrl;
                }
                if (BaseConfig.OPEN_URL.indexOf(url) !== -1) {
                    // 白名单接口直接通过
                    await next();
                } else {
                    const decodedToken: any = verify(ctx.headers.authentication, JWT_SECRET);
                    // 解析token保存到中间
                    ctx.user = decodedToken.data; // 这里的key = 'user'
                    await next();
                    // 保存用户操作日志
                    this.operateLog(ctx);
                }
            } catch (error) {
                this.catchError(ctx, error);
            }

            // 判断404
            if (ctx.status === 404 || ctx.status === 405) {
                // 设置浏览器状态码
                ctx.status = 200;

                return (ctx.body = ReturnResult.errorMsg("未找到当前路径", 404));
            }
        };
    }

	/**
	 * 捕捉错误处理后记录日志
	 * @param ctx koa
	 * @param error 错误信息
	 */
    public async catchError(ctx: Context, error: any) {
        // 判断是否是参数错误
        if (error.msg) {
            // 设置浏览器状态码
            ctx.status = 200;

            return (ctx.body = ReturnResult.errorMsg(error.msg, StaticStr.ERR_CODE_DEFAULT));
        } else if (error.message === "invalid token" || error.message === "jwt must be provided" || error.message === "jwt expired") {
            // 设置浏览器状态码
            ctx.status = 200;
            // token验证错误

            return (ctx.body = ReturnResult.errorMsg("当前token失效", 401));
        } else {
            // 系统错误
            logError(error.message, ctx.ip);
            // 设置浏览器状态码
            ctx.status = 200;

            return (ctx.body = ReturnResult.errorMsg("服务器错误", 500));
        }
    }
	/**
	 * 用户操作记录
	 * @param ctx koa
	 */
    public operateLog(ctx: Context) {
        // 记录日志
        // 过滤日志白名单
        if (BaseConfig.NO_LOG_URL.indexOf(ctx.routerPath) === -1) {
            // 添加到队列中处理
            const remoteAddress = ctx.headers["x-forwarded-for"] || ctx.ip || ctx.ips || (ctx.socket && ctx.socket.remoteAddress);
            const tbLog: TbLog = {};
            tbLog.userId = ctx.user.id;
            tbLog.operationUrl = ctx.operationUrl||ctx.originalUrl;
            tbLog.operationType = ctx.request.method;
            tbLog.ip = remoteAddress;
            this.bull.saveObj(tbLog, "tbLog");
        }
        // 记录用户活跃统计
        // 暂时写在这里
        // const start2 = Date.now();
        // for(let i=0;i<100000;i++){
        // this.bull.saveActive("123456");
        // }
        // const ms2 = Date.now() - start2;

        // console.log("");

    }
}
