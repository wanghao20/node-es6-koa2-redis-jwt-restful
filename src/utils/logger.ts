import { Context } from "koa";

import { configure, getLogger } from "log4js";

import { resolve } from "path";
import { BaseConfig } from "../config/Base";
const logPath = resolve(__dirname, "../../logs"); // log存放路径，确保该路径存在
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：日志记录工具
 */
configure({
    "appenders": {
        // 设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
        "out": {
            "type": "console",
        },

        // 所有日志记录，文件类型file   文件最大值maxLogSize 单位byte (B->KB->M) backups:备份的文件个数最大值,最新数据覆盖旧数据
        // allLog: { type: 'file', filename: logPath + '/all.log', keepFileExt: true, maxLogSize: 10485760, backups: 3 },

        // http请求日志  http请求日志需要app.use引用一下， 这样才会自动记录每次的请求信息
        "httpLog": {
            "type": "dateFile",
            "layout": {
                "type": "pattern",
                "pattern": "[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] - %m",
            },
            "filename": logPath + "/httpAccess.log",
            "pattern": ".yyyy-MM-dd",
            "keepFileExt": true,
        },
        // 数据库操作日志
        "mysqlLog": {
            "type": "dateFile",
            "layout": {
                "type": "pattern",
                "pattern": "[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] - %m",
            },
            "filename": logPath + "/mysqlLog.log",
            "pattern": ".yyyy-MM-dd",
            "keepFileExt": true,
        },
        // 数据库操作日志
        "mongoLog": {
            "type": "dateFile",
            "layout": {
                "type": "pattern",
                "pattern": "[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] - %m",
            },
            "filename": logPath + "/mongoLog.log",
            "pattern": ".yyyy-MM-dd",
            "keepFileExt": true,
        },

        // 错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
        "errorLog": {
            "type": "dateFile",
            "filename": logPath + "/error.log",
            "layout": {
                "type": "pattern",
                "pattern": "[%d{yyyy-MM-dd hh:mm:ss}] [%p] [%c] - %m",
            },
            "pattern": ".yyyy-MM-dd",
            "keepFileExt": true,
            "malwaysIncludePattern": true,
        },
    },
    "categories": {
        // level不传，默认使用default
        "default": { "appenders": ["out", "errorLog"], "level": "trace" },
        // appenders:采用的appender,取上面appenders项,level:设置级别
        "http": { "appenders": ["out", "httpLog"], "level": "debug" },
        "mysql": { "appenders": ["out", "mysqlLog"], "level": "debug" },
        "mongo": { "appenders": ["out", "mongoLog"], "level": "debug" },
        "error": { "appenders": ["out", "errorLog"], "level": "error" },
    },
});

/**
 * 记录http请求,写入日志文件
 */
export function logHttp() {
    return async (ctx: Context, next: () => Promise<void>) => {
        const remoteAddress = ctx.headers["x-forwarded-for"] || ctx.ip || ctx.ips || (ctx.socket && ctx.socket.remoteAddress);
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        // 不同类型记录
        if (ctx.body.code === 200) {
            getLogger("http").info(`${ctx.method} ${ctx.url} ${ctx.body.code} ${remoteAddress}- ${ms}ms`);
        } else if (ctx.body.code === 500) {
            getLogger("http").error(`${ctx.method} ${ctx.url} ${ctx.body.code} ${remoteAddress}- ${ms}ms`);
        } else if (ctx.url.indexOf(BaseConfig.OPEN_LOG_URL) !== -1) {
            getLogger("http").info(`${ctx.method} ${ctx.url} ${200} ${remoteAddress}- ${ms}ms`);
        } else if (ctx.url.indexOf(BaseConfig.OPEN_LOG_URL1) !== -1) {
            getLogger("http").info(`${ctx.method} ${ctx.url} ${200} ${remoteAddress}- ${ms}ms`);
        } else {
            getLogger("http").warn(`${ctx.method} ${ctx.url} ${ctx.body.code} ${remoteAddress}- ${ms}ms`);
        }
    };
}
/**
 * 记录sql执行,写入日志文件
 */
export const mysqlLogger = getLogger("mysql");
/**
 * 记录数据库操作,写入日志文件
 */
export const mongoLogger = getLogger("mongo");
/**
 * 记录error,写入日志文件
 * @param str 待写入的错误信息
 * @param ip 请求IP
 */
export function logError(msg: string, ip?: string) {
    getLogger("error").error(msg + ":ip" + ip);
}
