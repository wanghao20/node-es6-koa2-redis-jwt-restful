// app.ts
import cors = require("@koa/cors");

import Router = require("@koa/router");

import Koa = require("koa");

import bodyParser = require("koa-bodyparser");

import xmlParser = require("koa-xml-body");

import { CronJob } from "cron";

import "reflect-metadata";

import { createConnections } from "typeorm";

import { Context } from "koa";

import { BaseConfig } from "./config/Base";
import { mysqlConfig, mongodbConfig } from "./config/Environments";
import { getLimiterConfig } from "./config/LimiterConfig";
import { MongoDbLogger } from "./dataBase/MongoDatabase";
import { MysqlDbLogger } from "./dataBase/MysqlDatabase";
import { addRouter } from "./routes/Routes";
import { logError, logHttp } from "./utils/Logger";
import { redisDb1, limiterRedis } from "./utils/RedisTool";
import { Filter } from "./utils/Reqfilter";
import { TimedTask } from "./utils/TimedTask";
const ratelimit = require("koa-ratelimit");
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：启动类,初始化数据
 */

export class App {
	/**
	 * Koa对象
	 */
    private readonly app: Koa;
	/**
	 * 过滤器
	 */
    private readonly filter: Filter;
	/**
	 * Router对象
	 */
    private readonly router: Router;
	/**
	 * 定时任务对象
	 */
    private readonly timedTask: TimedTask;
    constructor() {
        this.app = new Koa();
        this.router = new Router();
        this.filter = new Filter();
        this.timedTask = new TimedTask();
        this.init().catch((error) => {
            // tslint:disable-next-line:no-console
            console.log(error);
            logError("init error:" + error);
        });
        // 启动定时任务
        // this.startTimedTask();
    }
	/**
	 * 启动定时任务
	 */
    public startTimedTask() {
        // # 每天的凌晨 0点0分0秒触发  （每天触发一次）
        // const task = new CronJob("00 00 00 * * *",async ()=> {
        const task = new CronJob("* * * * * *", async () => {
            // 过滤非活跃用户(每天只能执行一次,第二次数据不准确)
            await this.timedTask.redisDataLanding();
            console.log("定时任务处理完成");
        });
        console.log("定时任务初始化完成");
        task.start();
    }

	/**
	 * 装配各种中间件
	 */
    private async init() {
        // 解决微信支付通知回调数据
        this.app.use(
            xmlParser({
                "limit": 128, // 最大值默认1mb
                "encoding": "utf8", // lib将从`content-type`中检测到它
                "xmlOptions": {
                    "normalize": true, // 在文本节点内修剪空格
                    "normalizeTags": true, // 将标签转换为小写
                    "explicitArray": false, // 如果> 1，则仅将节点放入数组
                },
                // "key": "xmlBody", // lib将检查ctx.request.xmlBody并将解析的数据设置为它。
                "onerror": (err, ctx) => {
                    logError("xmlParser 解析 error:" + err);
                },
            })
        );
        // 解析json格式
        this.app.use(bodyParser());
        // http请求次数限制(当前使用ip可切换为用户id)
        this.app.use(ratelimit((getLimiterConfig((ctx: Context) => ctx.ip, limiterRedis))));
        // http请求记录
        this.app.use(logHttp());
        // 接收到数据过滤无效请求
        this.app.use(this.filter.reqfilter());
        // koa
        this.app.use(cors());
        // add route
        addRouter(this.router);
        this.app.use(this.router.routes()).use(this.router.allowedMethods());
    }

	/**
	 * 服务器需要启动的服务
	 */
    public start() {
        // 接管数据库logger
        Object.assign(mysqlConfig, { "logger": new MysqlDbLogger() });
        Object.assign(mongodbConfig, { "logger": new MongoDbLogger() });
        // 数据库连接列表
        const cxn = [mysqlConfig, mongodbConfig];
        // 创建数据库连接
        createConnections(cxn)
            .then(async (connection) => {
                console.log("数据库连接成功!");

            })
            .catch((err) => {
                if (err.name === "MongoServerSelectionError") {
                    console.error("MongoDb连接出错!");
                } else {
                    console.error("Mysql连接出错!");
                }
                logError("TypeORM 连接数据库 error:" + err);
            });
        // 设置监听端口
        this.app.listen(BaseConfig.PORT, () => {
            console.log("服务器开启成功!" + BaseConfig.PORT);
        });
    }
    // import sslify from 'koa-sslify'
    // https配置
    // 启动监听
    //    if (config.app.https.enabled) {
    //     this.app.use(sslify());
    //     const options = {
    //         key: fs.readFileSync('./ssl/server.key'),
    //         cert: fs.readFileSync('./ssl/server.cert')
    //     };
    //     https.createServer(options, this.app.callback()).listen(config.app.https.port, () => {
    //         logger.info('=== this.app server with htpps listen on ', config.app.https.port);
    //     });
    // } else {
    //     const port = config.app.port;
    //     this.app.listen(port);
    //     logger.info(`=== this.app server with htpp listen on ${port}===`);
    // }
}
