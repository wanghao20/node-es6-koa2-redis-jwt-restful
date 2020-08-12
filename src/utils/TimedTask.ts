import { getRepository } from "typeorm";

import { KeyName } from "../config/RedisKeys";
import { User } from "../entity/mongo/User";

import { redisDb1 } from "./RedisTool";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 定时任务处理类
 */
export class TimedTask {
	/**
	 * 3:拿到所有未登录id从hash中持久化到数据库再从hash表中移除用户数据
	 * 在redis中过滤掉非活跃用户
	 * 将非活跃用户保存在数据库中
	 */
	public async redisDataLanding() {

                console.log("开始处理");
                const start2 = Date.now();
                // 调用lua 脚本平均13.5ms
                // 速度是node处理的3.1倍
                // 加了10w条随机key数据执行时间645ms
                // 设置判断时间为7天 执行时间624ms
		// 拿到非活跃用户
		const noActIds = await redisDb1.redisLuaScript("./public/handleUserAct.lua");
		const ms2 = Date.now() - start2;
 		// 从hash表获取对应id数据写入数据库
		noActIds.forEach(async (id: string) => {
			const user = await redisDb1.hgetall(KeyName.HASH_OBJ_GAME_USERS + id);
			const userDao = getRepository(User);
			await userDao.save(user);
			// 从hash表中移除用户数据
			await redisDb1.del(KeyName.HASH_OBJ_GAME_USERS + id);
		});
	}
}
