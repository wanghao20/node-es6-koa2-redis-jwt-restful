import * as ioredis from "ioredis";

import Redlock = require("redlock");

import fs = require("fs");

import { BaseConfig } from "../config/Base";
import { KeyName } from "../config/RedisKeys";

import { DateFormat } from "./DateFormat";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：redis链接
 */

// tslint:disable-next-line:class-name
export interface redisTool {
	/**
	 * 存储string类型的key-value
	 * @param key key
	 * @param value value
	 */
    setString(key: string, value: any): Promise<string | void>;
	/**
	 * 获取string类型的key-value
	 * @param key string
	 * @return value
	 */
    getString(key: any): Promise<string>;
	/**
	 * 删除string类型的key-value
	 * @param key key
	 */
    del(key: string): Promise<number | null>;

	/**
	 * 获取当前数据库key的数量
	 * @return keySize
	 */
    getDbSize(): Promise<number>;

	/**
	 * 连接redis
	 */
    connToRedis(): Promise<unknown>;
}
/**
 * 定义配置参数
 */
interface RedisConfig {
	/**
	 * 端口
	 */
    port: number;
	/**
	 * 地址
	 */
    host: string;
	/**
	 * 密码
	 */
    password?: string;
	/**
	 * 数据库
	 */
    db?: number;
	/**
	 * family
	 */
    family?: number;
}
/**
 * 创建连接
 */
const clientCreate = (config: RedisConfig, callback: any) => {
    const redis: ioredis.Redis = new ioredis(config);
    redis.on("connect", () => {
        // 根据 connect 事件判断连接成功
        callback(null, redis); // 链接成功， 返回 redis 连接对象
    });
    redis.on("error", (err: any) => {
        // 根据 error 事件判断连接失败
        callback(err, null); // 捕捉异常， 返回 error
    });
};
/**
 * 创建连接返回 promise
 * @param options 配置
 */
const redisConnect = (options?: RedisConfig) => {
    const config = options;

    return new Promise((resolve, reject) => {
        // 返回API调用方 一个 promise 对象
        clientCreate(config, (err: any, conn: ioredis.Redis) => {
            if (err) {
                reject(err);
            }
            resolve(conn); // 返回连接的redis对象
        });
    });
};
/**
 * 初始化配置
 */
const redisConfig: RedisConfig = {
	/**
	 * 端口
	 */
    "port": BaseConfig.REDIS_PORT,
    "password": BaseConfig.REDIS_PASSWORD,
    "host": BaseConfig.REDIS_HOST,
};

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：redis封装方法
 */
class RedisTool implements redisTool {
	/**
	 * redis
	 */
    public redis: ioredis.Redis;
	/**
	 * redis  分布式锁
	 * https://github.com/mike-marcacci/node-redlock
	 */
    public redlock: Redlock;
	/**
	 * config
	 */
    public config: RedisConfig;
    constructor(opt?: any) {
        this.redis = null;
        opt ? (this.config = Object.assign(redisConfig, opt)) : (this.config = redisConfig);
        this.connToRedis()
            .then((res) => {
                if (res) {
                    console.log("redis连接成功!");
                }
            })
            .catch((e) => {
                console.error("Redis连接错误:" + e);
            });
    }

	/**
	 * 连接redis
	 */
    public async connToRedis() {
        return new Promise((resolve, reject) => {
            if (this.redis) {
                resolve(true); // 已创建
            } else {
                redisConnect(redisConfig)
                    .then((resp: ioredis.Redis) => {
                        this.redis = resp;
                        // 初始化锁
                        this.redlock = new Redlock([this.redis], {
                            "retryDelay": 200, // 两次尝试之间的时间间隔ms
                            "retryCount": 1, // 最大次数Redlock将尝试
                        });
                        resolve(true);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        });
    }

	/**
	 * 基于redis分布式锁实现
	 * @param ressourceId 要锁定的资源的字符串标识符
	 */
    public async lock(ressourceId: string) {
        try {
            return await this.redlock.lock(ressourceId, 1000,);
            // lock.unlock();
        } catch (err) {
            return false;
        }
    }
    /**
     * 解锁方法
     * @param lock 锁对象
     */
    public async unlockLock(lock: any) {
        lock.unlock(function (err: any) {
            if (err) {
                console.log("解锁失败" + err);
            } else {
                console.log("解锁成功");
            }
        });
    }
	/**
	 * 存储string类型的key-value
	 * @param key key
	 * @param value value
	 */
    public async setString(key: string, value: any) {
        const val: string = typeof value !== "string" ? JSON.stringify(value) : value;
        try {
            const lock = await this.lock(key);
            if (lock) {
                const res = await this.redis.set(key, val);
                // 处理完成后解锁
                redisDb1.unlockLock(lock);

                return res;
            } else {
                // 其他线程在处理中
                console.log("其他线程在处理中");
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    }

	/**
	 * 获取string类型的key-value
	 * @param key string
	 * @return value
	 */
    public async getString(key: string) {
        try {
            const res = await this.redis.get(key);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e.stack);

            return null;
        }
    }
	/**
	 * 批量获取
	 * @param keys keys
	 */
    public async mget(keys: Array<string>) {
        try {
            const res = await this.redis.mget(keys);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e.stack);

            return null;
        }
    }
	/**
	 * 批量获取key
	 * @param keys 支持部分正则表达式
	 */
    public async keys(keys: string) {
        try {
            const res = await this.redis.keys(keys);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e.stack);

            return null;
        }
    }
	/**
	 * 删除string类型的key-value
	 * @param key key
	 */
    public async del(key: string) {
        try {
            const lock = await this.lock(key);
            if (lock) {
                const res = await this.redis.del(key);
                // 处理完成后解锁
                redisDb1.unlockLock(lock);

                return res;
            } else {
                // 其他线程在处理中
                console.log("其他线程在处理中");
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 *  sadd 将给定元素添加到集合 插入元素数量 sadd('key', 'value1'[, 'value2', ...]) (不支持数组赋值)(元素不允许重复)
	 * @param key key
	 * @param value value
	 */
    public async sadd(key: string, value: any) {
        try {
            const lock = await this.lock(key);
            if (lock) {
                const res = await this.redis.sadd(key, value);
                // 处理完成后解锁
                redisDb1.unlockLock(lock);

                return res;
            } else {
                // 其他线程在处理中
                console.log("其他线程在处理中");
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }

	/**
	 *  获取集合内所有成员
	 * @param key key
	 */
    public async smembers(key: string) {
        try {
            const res = await this.redis.smembers(key);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 *  判断是否存在这个成员
	 * @param key key
	 * @param member string
	 */
    public async sismember(key: string, member: string) {
        try {
            const res = await this.redis.sismember(key, member);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 散列hash：类似Java中的Map
	 * @param key key
	 * @param field fieldKey
	 * @param value value
	 */
    public async hset(key: string, field: string, value: any) {
        try {
            const lock = await this.lock(key);
            if (lock) {
                const res = await this.redis.hset(key, field, value);
                // 处理完成后解锁
                redisDb1.unlockLock(lock);

                return res;
            } else {
                // 其他线程在处理中
                console.log("其他线程在处理中");
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 获取指定的key中field字段的值
	 * @param key key
	 * @param field 字段
	 */
    public async hget(key: string, field: string) {
        try {
            const res = await this.redis.hget(key, field);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 向list中压入元素
	 * @param key key
	 * @param values values
	 */
    public async lpush(key: string, values: Array<string>) {
        try {
            const lock = await this.lock(key);
            if (lock) {
                const res = await this.redis.lpush(key, values);
                // 处理完成后解锁
                redisDb1.unlockLock(lock);

                return res;
            } else {
                // 其他线程在处理中
                console.log("其他线程在处理中");
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 获取指定的key中所有键值对
	 * @param key key
	 */
    public async hgetall(key: string) {
        try {
            const res = await this.redis.hgetall(key);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 同时设置对个键值对数据
	 * @param key key
	 * @param value field,value,field,value,field,value
	 */
    public async hmset(key: string, value: []) {
        try {
            const lock = await this.lock(key);
            if (lock) {
                const res = await this.redis.hmset(key, value);
                // 处理完成后解锁
                redisDb1.unlockLock(lock);

                return res;
            } else {
                // 其他线程在处理中
                console.log("其他线程在处理中");
            }
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 有序集合添加成员
	 * @param key key
	 * @param score 分数(按照此对象排名)
	 * @param value value
	 */
    public async zadd(key: string, score: number, value: string) {
        try {
            const lock = await this.lock(key);
            if (lock) {
                const res = await this.redis.zadd(key, score, value);
                // 处理完成后解锁
                redisDb1.unlockLock(lock);

                return res;
            } else {
                // 其他线程在处理中
                console.log("其他线程在处理中");
            }

        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * HyperLogLog是一种概率性数据结构，在标准误差0.81%的前提下，能够统计2^64个数据。
	 * 参考资料:https://juejin.im/post/6844904097666039816
	 *         https://juejin.im/post/6844903940585160718
	 */
	/**
	 * HyperLogLog
	 *  添加一个元素，如果重复，只算作一个
	 * @param key key
	 * @param score 分数(按照此对象排名)
	 * @param value value
	 */
    public async pfadd(key: string, value: string) {
        try {
            const res = await this.redis.pfadd(key, value);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * HyperLogLog
	 * 返回元素数量的近似值
	 * @param key key
	 */
    public async pfcount(key: string) {
        try {
            const res = await this.redis.pfcount(key);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * HyperLogLog
	 * 将多个 HyperLogLog 合并为一个 HyperLogLog
	 * return OK.
	 * @param key key
	 */
    public async pfmerge(key: string, sourcekey: any[]) {
        try {
            const res = await this.redis.pfmerge(key, sourcekey);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 在redis 2.2.0版本之后，新增了一个位图数据，其实它不是一种数据结构。实际上它就是一个一个字符串结构，
	 * 只不过value是一个二进制数据， 每一位只能是0或者1。redis单独对bitmap提供了一套命令。可以对任意一位进行设置和读取,
	 * https://blog.csdn.net/u011957758/article/details/74783347。
	 * bitmap
	 * @param key key
	 * @param offset 第offset位(：给一个指定key的值得第offset位 赋值为value。)
	 * @param value 值:0-1
	 */
    public async setbit(key: string, offset: number, value: string) {
        try {
            const res = await this.redis.setbit(key, offset, value);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 判断是否存在指定key
	 * @param key key
	 */
    public async exists(key: string) {
        try {
            const res = await this.redis.exists(key);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 获取当前数据库key的数量
	 * @return keySize
	 */
    public async getDbSize() {
        try {
            const res = await this.redis.dbsize();

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 设置key过期时间
	 * @param key key
	 * @param expiration 单位长度:秒
	 */
    public async expire(key: string, expiration: number) {
        try {
            const res = await this.redis.expire(key, expiration);

            return res;
        } catch (e) {
            // tslint:disable-next-line:no-console
            console.error(e);

            return null;
        }
    }
	/**
	 * 活跃用户和非活跃用户数据处理
	 * 执行lua脚本
	 * @param key key
	 * @param expiration 单位长度:秒
	 */
    public async redisLuaScript(path: string) {
        try {
            // 活跃用户和非活跃用户内存数据处理
            // 设计思路:
            // 每天凌晨0:00(具体时间可调整)时node调用redis执行lua脚本拿到不活跃用户保存数据库提出hash表
            // lua脚本内容:
            // 1:获取到redis中用户hash表里所有的活跃用户id
            // 2:通过pfadd(key:前面两天的日期:value:用户id)判断用户前两天天是否登录过
            // (HyperLogLog类型: 一亿条记录占用不到12k内存  set集合100w条数据占用111.12M,1000w条占用1.08G
            // pfadd添加记录时已经存在会返回0,未存在返回1,在每日活跃用户接口处创建了对应的记录用来判断用户两天内是否登录过系统)
            // 3:拿到所有未登录id从hash中持久化到数据库再从hash表中移除用户数据

            // 测试执行脚本
            // 所有玩家hash: HASH_OBJ_GAME_USERS *
            const keys = [];
            for (let i = 0; i < BaseConfig.DT_TIME; i++) {
                const num = i + 1;
                // 模拟从日期前一天开始的日期到需要判断的天数
                const day = DateFormat.today(num);
                keys.push(KeyName.HLL_USER_STATS(num) + day);
            }
            // Script
            const redisLuaScript: any = fs.readFileSync(path);

            // eval(redisLuaScript:脚本   2:keys数量 key [key ...] arg [arg ...])
            // 计算keys数量:用户Hash表+天数keys长度+需要判断的天数keys
            // 2=>用户keyName+keysLen
            const argLen = keys.length + 2;

            const result = await this.redis.eval(
                redisLuaScript,
                argLen,
                KeyName.HASH_OBJ_GAME_USERS,
                "keysLen",
                keys,
                KeyName.HASH_OBJ_GAME_USERS,
                keys.length,
                keys
            );

            return result;
        } catch (e) {
            console.error(e);

            return null;
        }
    }
}

/**
 * 需要用到多少个数据库，就定义多少个实例常量，这样的好处是:
 * 每次个模块调用redis的时候，始终是取第一次生成的实例，避免了多次连接redis的尴尬
 */
export const redisDb1 = new RedisTool({ "db": BaseConfig.SYSTEM_DB });
export const limiterRedis = new ioredis(redisConfig);
// export const redis_db2 = new RedisTool({db:2})
