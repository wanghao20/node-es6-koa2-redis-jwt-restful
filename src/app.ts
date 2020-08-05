// app.ts
import cors = require("@koa/cors");

import Router = require("@koa/router");

import Koa = require("koa");

import bodyParser = require("koa-bodyparser");

import xmlParser = require("koa-xml-body");

import { CronJob } from "cron";

import "reflect-metadata";

import { createConnection } from "typeorm";

import { BaseConfig } from "./config/Base";
import { mysqlConfig } from "./config/Environments";
import { DbLogger } from "./dataBase/Database";
import { addRouter } from "./routes/Routes";
import { InitRedisData } from "./utils/InitRedisData";
import { logError, logHttp } from "./utils/Logger";
import { redisDb1 } from "./utils/RedisTool";
import { Filter } from "./utils/Reqfilter";
import { TimedTask } from "./utils/TimedTask";
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
			logError("TypeORM init error:" + error);
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
			// 过滤非活跃用户
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
	 * 服务器启动方法
	 */
	public start() {
		// 接管数据库logger
		Object.assign(mysqlConfig, { "logger": new DbLogger() });
		// 创建数据库连接
		createConnection(mysqlConfig)
			.then(async (connection) => {
				console.log("数据库连接成功!");
				// 设置监听端口
				this.app.listen(BaseConfig.PORT, () => {
					console.log("服务器开启成功!" + BaseConfig.PORT);
					// 初始化Redis数据
					new InitRedisData();
					this.timedTask.redisDataLanding();
				});
			})
			.catch((err) => {
				console.log("TypeORM connection error:" + err);
				logError("TypeORM connection error:" + err);
			});
	}
}
