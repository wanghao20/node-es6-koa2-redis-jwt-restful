import { v4 as uuidv4 } from "uuid";
import { KeyName } from "../config/RedisKeys";
import { VerifyException } from "../utils/Exceptions";
import { redisDb1 } from "../utils/RedisTool";
import { StaticStr } from "../config/StaticStr";

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
		//
		const name = await redisDb1.hget(KeyName.HASH_OBJ_GAME_USERS + userName, "name");
		const pwd = await redisDb1.hget(KeyName.HASH_OBJ_GAME_USERS + userName, "passWord");
		const uid = await redisDb1.hget(KeyName.HASH_OBJ_GAME_USERS + userName, "id");
		if (name !== userName) {
			throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
		}
		// if (!(await argon2.verify(pwd, passWord))) { // todo argon2模块有问题,后面选择其他模块
		if (pwd===passWord) {
			throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
		}

		return { "id": uid, "name": userName };
	}

	/**
	 * 注册用户接口Service
	 * @param userName 用户名
	 * @param passWord 密码
	 */
	public async insert(userName: string, passWord: string) {
		const uid = uuidv4();
		// 保存到数据库
		redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + uid, "id", uid);
		redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + uid, "name", userName);
		redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + uid, "passWord", passWord);// todo 暂未加密,后面处理

		return { "id": uid, "name": userName };
	}
}
