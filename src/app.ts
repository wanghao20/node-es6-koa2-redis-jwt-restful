// app.ts
import Koa = require('koa');
import cors = require('@koa/cors');
import bodyParser = require('koa-bodyparser');
import 'reflect-metadata';
import { BaseConfig } from './config/base';
import { addRouter } from "./routes/Routes";
import { logError, logHttp } from './utils/logger';
import { reqfilter } from './utils/reqfilter';
import Router = require('@koa/router');
import { InitRedisData } from './utils/InitRedisData';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：启动类,初始化数据
 */

export class App {
    private app: Koa;
    private router: Router;
    constructor() {
        this.app = new Koa();
        this.router = new Router();
        this.init().catch(error => {
            // tslint:disable-next-line:no-console
            console.log(error);
            logError('TypeORM init error:' + error)
        });

    }

    // 装配各种中间件
    private async init() {

        // http请求记录
        this.app.use(logHttp());
        // 接收到数据过滤无效请求
        this.app.use(reqfilter());
        // koa
        this.app.use(cors());
        // 解析json格式
        this.app.use(bodyParser());
        // add route
        addRouter(this.router);
        this.app.use(this.router.routes()).use(this.router.allowedMethods());

    }

    /**
     * 服务器启动方法
     */
    start() {
        // 运行服务器
        // 设置监听端口
        this.app.listen(BaseConfig.PORT, () => {
            // tslint:disable-next-line:no-console
            console.log("服务器开启 127.0.0.1:" + BaseConfig.PORT);
            // tslint:disable-next-line:only-arrow-functions
            const t1 = setTimeout(function () {
                // 初始化数据
                // tslint:disable-next-line:no-unused-expression
                new InitRedisData();
                clearTimeout(t1);// 去掉定时器

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