import { getRepository } from "typeorm";

import { KeyName } from "../config/RedisKeys";
import { User } from "../entity/User";

import { redisDb1 } from "./RedisTool";
import { BaseConfig } from "../config/Base";
import { DateFormat } from "./DateFormat";

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
		// const start = Date.now();
		// // 2ms
		// const keys:string[] = [];
		// const allIds:string[] = [];
		// const noActIds:string[] = [];
		// for (let i = 0; i < BaseConfig.DT_TIME; i++) {
		//         const num = i + 1;
		//         const day = DateFormat.today(num);
		//         keys.push(KeyName.HLL_USER_STATS(num) + day);
		// }
		// const alluKeys=await redisDb1.keys(KeyName.HASH_OBJ_GAME_USERS+"*");
		// alluKeys.forEach((element) => {
		//         allIds.push(element.substring(20,element.length));
		// });
		// allIds.forEach(async (val) => {
		//         let isSgn=1;
		//         keys.forEach(async (v) => {
		//         const state=await redisDb1.pfadd(v, val);
		//                 if(state===0){
		//                         // -- 登录过
		//                         isSgn = 0;
		//                         // console.log("forEach内");
		//                 }
		//         });
		//         if(isSgn===1){
		//                 noActIds.push(val);

		//         }
		// });
		// const ms = Date.now() - start;
		// [44,9],[39,7],[40,7],[40,7],[46,34],[43,7],[43,7],,[45,40],[40,8],[42,9]
		// redis本地获取非活跃玩家每次平均42.2ms
		// const start2 = Date.now();
		// 拿到非活跃用户
		const noActIds = await redisDb1.redisLuaScript("./public/handleUserAct.lua");
		// const ms2 = Date.now() - start2;
		// 调用lua 脚本平均13.5ms
		// 速度是node处理的3.1倍
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
