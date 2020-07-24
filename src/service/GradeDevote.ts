import { KeyName } from '../config/RedisKeys';
import { DrawReward } from '../config/Type';
import { VerifyException } from '../utils/exceptions';
import { redisDb1 } from '../utils/redisTool';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：等级贡献Service
 */
export class GradeDevoteService {
	/**
	 * 获取等级贡献配置表ervice
	 */
	public async findConfig() {
		// 从Redis拿取数据
		const gradeDevote = await redisDb1.smembers(KeyName.SET_CONFIG_GRAEDEVOTE);
		if (gradeDevote) {
			return gradeDevote;
		}
		throw new VerifyException('等级贡献配置不存在', 302);
	}
	/**
	 * 领取贡献奖励
	 * @param drawReward 传入参数对象
	 */
	public async drawReward(drawReward: DrawReward) {
		// 判断奖励是否已经领取
		// 判断set集合中是否存在此对象
		const gradeDevote = await redisDb1.sismember(KeyName.SET_OBJ_DRAW_LOG_ID(drawReward.uid), JSON.stringify(drawReward));
		if (gradeDevote === 1) {
			throw new VerifyException('奖励已领取', 302);
		}
		// 获取玩家的贡献奖励等级
		let drawRewardGrade = Number(await redisDb1.hget(KeyName.HASH_OBJ_GAME_USERS + drawReward.uid, 'drawRewardGrade'));
		drawRewardGrade = drawRewardGrade + 1;
		// 判断玩家奖励和参数是否不同
		if (drawRewardGrade !== drawReward.grade) {
			throw new VerifyException('玩家等级不足', 302);
		}
		// 判断客户端请求的对应奖励信息是否正确
		const devote = (await redisDb1.getString(KeyName.STR_CONFIG_GRAEDEVOTE + 'leve' + drawReward.grade)).toString();
		if (Number(devote) !== drawReward.devote) {
			throw new VerifyException('没有对应奖励', 302);
		}
		// 保存等级信息到玩家
		redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + drawReward.uid, 'drawRewardGrade', drawRewardGrade);
		// 获取用户贡献信息添加奖励
		const userDevote = await redisDb1.hget(KeyName.HASH_OBJ_GAME_USERS + drawReward.uid, 'devote');
		redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + drawReward.uid, 'devote', Number(userDevote + devote));
		// 领取记录添加记录信息
		redisDb1.sadd(KeyName.SET_OBJ_DRAW_LOG_ID(drawReward.uid), JSON.stringify(drawReward));

		return drawReward;
	}
}
