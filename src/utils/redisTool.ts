import * as ioredis from "ioredis";

import { BaseConfig } from "../config/Base";
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
	delString(key: string): Promise<number | null>;

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
 * 定义接口
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
	// password: BaseConfig.REDIS_PASSWORD,
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
	 * config
	 */
	public config: RedisConfig;
	constructor(opt?: any) {
		this.redis = null;
		opt ? (this.config = Object.assign(redisConfig, opt)) : (this.config = redisConfig);

		// this.connToRedis()
		this.connToRedis()
			.then((res) => {
				if (res) {
					// tslint:disable-next-line:no-console
					console.log("redis connet success");
				}
			})
			.catch((e) => {
				// tslint:disable-next-line:no-console
				console.error("The Redis Can not Connect:" + e);
			});
	}

	/**
	 * 连接redis
	 */
	public connToRedis() {
		return new Promise((resolve, reject) => {
			if (this.redis) {
				resolve(true); // 已创建
			} else {
				redisConnect(redisConfig)
					.then((resp: ioredis.Redis) => {
						this.redis = resp;
						resolve(true);
					})
					.catch((err) => {
						reject(err);
					});
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
			const res = await this.redis.set(key, val);

			return res;
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
	 * 删除string类型的key-value
	 * @param key key
	 */
	public async delString(key: string) {
		const id: string = typeof key !== "string" ? JSON.stringify(key) : key;
		try {
			const res = await this.redis.del(id);

			return res;
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
			const res = await this.redis.sadd(key, value);

			return res;
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
			const res = await this.redis.hset(key, field, value);

			return res;
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
}

/*
需要用到多少个数据库，就定义多少个实例常量，这样的好处是:
每次个模块调用redis的时候，始终是取第一次生成的实例，避免了多次连接redis的尴尬
*/
export const redisDb1 = new RedisTool({ "db": 1 });
// export const redis_db2 = new RedisTool({db:2})
// export const redis_db3 = new RedisTool({db:3})
// export const redis_db4 = new RedisTool({db:4})
