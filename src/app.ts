// app.ts
import cors = require('@koa/cors');
import Router = require('@koa/router');
import Koa = require('koa');
import bodyParser = require('koa-bodyparser');
import 'reflect-metadata';
import { BaseConfig } from './config/Base';
import { addRouter } from './routes/Routes';
import { InitRedisData } from './utils/InitRedisData';
import { logError, logHttp } from './utils/Logger';
import { Filter } from './utils/Reqfilter';
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
	 * Router对象
	 */
	private readonly router: Router;
	constructor() {
		this.app = new Koa();
		this.router = new Router();
		this.init().catch((error) => {
			// tslint:disable-next-line:no-console
			console.log(error);
			logError('TypeORM init error:' + error);
		});
	}

	/**
	 * 装配各种中间件
	 */
	private async init() {
		// 解析json格式
		this.app.use(bodyParser());
		// http请求记录
		this.app.use(logHttp());
		// 接收到数据过滤无效请求
		this.app.use(Filter.reqfilter());
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
		// 运行服务器
		// 设置监听端口
		this.app.listen(BaseConfig.PORT, () => {
			// tslint:disable-next-line:no-console
			console.log('服务器开启 127.0.0.1:' + BaseConfig.PORT);
			// tslint:disable-next-line:only-arrow-functions
			const t1 = setTimeout(function () {
				// 初始化数据
				// tslint:disable-next-line:no-unused-expression
				new InitRedisData();
				clearTimeout(t1); // 去掉定时器
			}, 1000);
			// 初始化Redis数据
			// tslint:disable-next-line:no-unused-expression
			// new InitRedisData();
		});
		// // 创建数据库连接
		// const config: ConnectionOptions = mongodbConfig as any;
		// createConnection(config)
		//     .then(() => {
		//         // 运行服务器
		//         // 设置监听端口
		//         this.app.listen(BaseConfig.PORT, () => {
		//             // tslint:disable-next-line:no-console
		//             console.log("服务器开启 127.0.0.1:" + BaseConfig.PORT);
		//             // 初始化Redis数据
		//             // tslint:disable-next-line:no-unused-expression
		//             new InitRedisData();
		//         });

		//     })
		//     .catch((error) => {
		//         // tslint:disable-next-line:no-console
		//         console.log('TypeORM connection error:' + error)
		//         logError('TypeORM connection error:' + error)
		//     }
		//     );
	}
}
