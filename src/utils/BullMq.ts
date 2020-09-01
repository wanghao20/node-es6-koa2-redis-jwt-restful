import Queue = require("bull");

import Bull = require("bull");

import { v4 as uuidv4 } from "uuid";

import { getRepository } from "typeorm";

import { bullConfig, QUEUE_USER_ACTIVE, QUEUE_OBJ_NAME } from "../config/BullConfig";
import { TbLog } from "../format/Type";
import { BaseTpLog } from "../entity/mysql/log/BaseTpLog";
import { CltLog } from "../entity/mysql/log/CleLog";

import { DateFormat } from "./DateFormat";
import { redisDb1 } from "./RedisTool";

/**
 * Created by wh on 2020/7/28
 * author: wanghao
 * @desc：消息队列工具类
 * 文档:https://github.com/OptimalBits/bull#uis
 */
export class BullMQ {
	/**
	 * Queue对象
	 */
    public myFirstQueue: Bull.Queue<any>;

    constructor() {
        this.init();
        try {
            this.process();
        } catch (error) {
            console.log("任务处理出错");
        }
    }

	/**
	 * 初始化
	 */
    public async init() {
        this.myFirstQueue = new Queue(QUEUE_OBJ_NAME, bullConfig);
        this.myFirstQueue = new Queue(QUEUE_USER_ACTIVE, bullConfig);
    }

	/**
	 * 拿到队列队形
	 */
    public async getQueue() {
        return this.myFirstQueue;
    }

	/**
	 * 绑定任务处理函数
	 */
    public process() {
        // 2. 绑定任务处理函数
        this.myFirstQueue.process(QUEUE_OBJ_NAME, async (job, data) => {
            console.log("队列:QUEUE_OBJ_NAME:任务开始处理");
            // 执行保存对象操作
            await this.objImpl(job);
            data();
        });
        this.myFirstQueue.process(QUEUE_USER_ACTIVE, async (job, data) => {
            console.log("队列:QUEUE_USER_ACTIVE:任务开始处理");
            // 执行保存对象操作
            await this.activeImpl(job);
            data();
        });
    }
	/**
	 * 执行保存对象操作
	 * @param obj 对象json
	 */
    public async objImpl(obj: any) {
        // 玩家操作日志
        if (obj.data.objName === "tbLog") {
            const tbLogObj :TbLog = obj.data.tbLog;
            const type: any = { "GET": "查询", "POST": "新增", "PUT": "更新", "DELETE": "删除" };
            const tbLog: BaseTpLog = {
                "id": uuidv4(),
                "userId": tbLogObj.userId, // 操作用户id
                "creationTime": new Date(), // 操作时间
                "operationType": type[tbLogObj.operationType], // 查询、新增、删除、更新
                "operationUrl": tbLogObj.operationUrl, // 操作地址
                "ip": tbLogObj.ip, // 操作ip
            };
            const tpLogDao = getRepository(BaseTpLog);
            await tpLogDao.save(tbLog);
        }
        // 客户端操作日志
        if (obj.data.objName === "cltParam") {
            const cltParam: CltLog = obj.data.cltParam;
            cltParam.id = uuidv4();
            // const cltLogDao = getRepository(CltLog);
            // cltLogDao.save(cltParam);
        }
    }

	/**
	 * 用户活跃记录队列
	 * @param obj 对象
	 */
    public async activeImpl(obj: any) {
        // 测试分布式锁
        const lock = await redisDb1.lock(obj.data.userId);
        if (lock) {
            // 多线程运行正常
            let num = Number(await redisDb1.getString("num"));
            if (num >= 1) {
                num = num - 1;
                await redisDb1.setString("num", num);
                console.log(num);
                redisDb1.unlockLock(lock);
            }
        } else {
            // 其他线程在处理中
            console.log("其他线程在处理中");
        }

        // // 判断用户是否是活跃用户
        // const exists = await redisDb1.exists(KeyName.HASH_OBJ_GAME_USERS + obj.data.userId);
        // // key 存在返回 1 ,否则返回 0 ,
        // if (exists===0) {
        // 	// 从数据库中加载用户数据添加到redis
        // 	// const userDao = getRepository(User);
        //         // const user = await userDao.findOne(obj.data.userId);
        //         redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS +  obj.data.userId, "id",  obj.data.userId);
        //         redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + obj.data.userId, "name",  obj.data.userId);
        //         redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + obj.data.userId, "passWord", obj.data.userId);
        // }
        // const date = DateFormat.dateFormat(Date.now(), QUEUE_DATE_FORMAT);
        // // 日活跃度记录
        // await redisDb1.pfadd(KeyName.HLL_USER_ACT + date, obj.data.userId);
        // // 添加到HyperLogLog统计
        // // 用于判断非活跃因为pfadd以后记录数据就会发生改变所以需要创建和天数相同的记录
        // // 防止数据污染影响下一次判断,
        // for (let i = 0; i < BaseConfig.DT_TIME; i++) {
        // 	await redisDb1.pfadd(KeyName.HLL_USER_STATS(i + 1) + date, obj.data.userId);
        // }
    }

	/**
	 * 用消息队列保存对象
	 * 接口访问量较高时调用中间件保存对象,
	 * 经过测试直接调用数据库保存平均4ms左右,
	 * 使用中间件保存平均2.2ms左右
	 * @param obj 需要保存的对象
	 * @param objName json对象名称,在执行消息队列方法中判断对象使用
	 */
    public async saveObj(obj: any, objName: string) {
        try {
            // 添加到对象保存队列中处理
            // tslint:disable-next-line:object-literal-key-quotes
            (await this.getQueue()).add(QUEUE_OBJ_NAME, { [objName]: obj, objName: objName });
        } catch (error) {
            console.log("添加到队列中处理错误");
        }
    }
	/**
	 * 用消息队列用户活跃量
	 * @param obj 需要保存的对象
	 * @param objName json对象名称,在执行消息队列方法中判断对象使用
	 */
    public async saveActive(userId: string) {
        try {
            // 添加到对象保存队列中处理
            // tslint:disable-next-line:object-literal-key-quotes
            (await this.getQueue()).add(QUEUE_USER_ACTIVE, { userId: userId });
        } catch (error) {
            console.log("添加到队列中处理错误");
        }
    }
}
