import argon2 = require('argon2');
import { v4 as uuidv4 } from 'uuid';
import { KeyName } from '../config/RedisKeys';
import { VerifyException } from '../utils/Exceptions';
import { redisDb1 } from '../utils/RedisTool';
import { StaticStr } from '../config/StaticStr';

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：authService
 */
export class AccountService {
	/**
	 * 登录验证接口Service
	 * @param userName 用户名
	 * @param passWord 密码
	 */
	public async verifyPassword(userName: string, passWord: any) {
		const name = await redisDb1.hget(KeyName.HASH_AUTH_USER + userName, 'name');
		const pwd = await redisDb1.hget(KeyName.HASH_AUTH_USER + userName, 'passWord');
		const uid = await redisDb1.hget(KeyName.HASH_AUTH_USER + userName, 'id');
		if (name !== userName) {
			throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
		}
		if (!(await argon2.verify(pwd, passWord))) {
			throw new VerifyException(StaticStr.USERNAME_ERR_MSG,  StaticStr.ERR_CODE_DEFAULT);
		}

		return { "id": uid, "name": userName };
	}

	/**
	 * 注册用户接口Service
	 * @param userName 用户名
	 * @param passWord 密码
	 */
	public async insert(userName: string, passWord: string) {
		const name = await redisDb1.hget(KeyName.HASH_AUTH_USER + userName, 'name');
		if (name === userName) {
			throw new VerifyException(StaticStr.INSERT_ERR_MSG,  StaticStr.ERR_CODE_DEFAULT);
		} else {
			const uid = uuidv4();
			// 保存到数据库
			redisDb1.hset(KeyName.HASH_AUTH_USER + userName, 'id', uid);
			redisDb1.hset(KeyName.HASH_AUTH_USER + userName, 'name', userName);
			redisDb1.hset(KeyName.HASH_AUTH_USER + userName, 'passWord', await argon2.hash(passWord));

			return { "id": uid, "name": userName };
		}
	}
}
