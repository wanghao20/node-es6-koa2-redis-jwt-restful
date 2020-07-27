import { GlobalVar } from '../config/GlobalVar';
import { KeyName } from '../config/RedisKeys';
import { RedEnvelopeVal } from '../config/ReturnFormat';
import { DateFormat } from '../utils/DateFormat';
import { VerifyException } from '../utils/Exceptions';
import { redisDb1 } from '../utils/RedisTool';
import { StaticStr } from '../config/StaticStr';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：红包Service
 */
export class RedRewardService {
	/**
	 * 获取用户待领取红包
	 * @param uid 当前查询红包用户ID
	 */
	public async findRedRewardList(uid: string) {
		// 从Redis拿取数据
		const redEnvelope = await redisDb1.smembers(KeyName.SET_OBJ_RED_ENVRLOPE(uid));
		// 定义返回结果list
		const redEnvelopeList: any = [];
		// 拿到当前时间
		const date = new Date();
		redEnvelope.forEach((v: any) => {
			v = JSON.parse(v);
			const redEnvelopeVal = new RedEnvelopeVal();
			redEnvelopeVal.id = v.id;
			// 判断红包拥有者
			if (v.attackerId === uid) {
				redEnvelopeVal.generation = 1;
			}
			if (v.beAttackerId === uid) {
				redEnvelopeVal.generation = 0;
			}
			redEnvelopeVal.grade = v.grade;
			// 获取红包生成时间
			const generateDate = new Date(v.generateDate);
			// 生成时间加上配置的倒计时
			generateDate.setMinutes(generateDate.getMinutes() + GlobalVar.ID101);
			// 判断生成时间和当前时间的时间差
			const hoursCount = DateFormat.dateCount(generateDate, date, 'hours');
			// 判断是否过期
			if (hoursCount > GlobalVar.ID101) {
				// 过期 删除该红包
				v.isDelete = 1;
				// 设置为过期
				redEnvelopeVal.isExpired = 1;
				// 在一小时以内判断倒计时是否结束
			} else if (hoursCount < 1) {
				if (GlobalVar.ID101 > DateFormat.dateCount(generateDate, date, 'minutes')) {
					redEnvelopeVal.littleTime = DateFormat.dateCountFormat(generateDate, date);
					redEnvelopeVal.isExpired = 0;
				}
			} else {
				redEnvelopeVal.littleTime = 0;
				// 可直接领取
				redEnvelopeVal.isExpired = 0;
			}
			redEnvelopeList.push(redEnvelopeVal);
		});
		if (redEnvelopeList) {
			return redEnvelopeList.sort((a: RedEnvelopeVal, b: RedEnvelopeVal) => a.isExpired - b.isExpired);
		}
		throw new VerifyException(StaticStr.ERR_MSG_R, StaticStr.ERR_CODE_DEFAULT);
	}

	/**
	 * 获取已经领取红包列表
	 * @param uid 当前查询红包记录用户ID
	 */
	public async findredEnvelopeRecordList(uid: string) {
		// 从Redis拿取数据
		const redEnvelopeRecordList = JSON.parse(await redisDb1.getString(KeyName.STR_OBJ_RED_ENVRLOPE_RCORD + uid));
		redEnvelopeRecordList.forEach((v: any) => {
			v.littleTime = DateFormat.dateCountFormat(new Date(v.generateDate), new Date());
		});

		return redEnvelopeRecordList;
	}
	/**
	 * 领取红包
	 * @param uid 当前操作用户ID
	 * @param rid 领取的红包ID
	 */
	public async getRedEnvelope(uid: string, rid: string) {
		// 从Redis拿取数据
		const redEnvelopeRecordList = await redisDb1.smembers(KeyName.SET_OBJ_RED_ENVRLOPE(uid));
		let obj;
		redEnvelopeRecordList.forEach((v: any) => {
			v = JSON.parse(v);
			if (v.id === rid) {
				// 拿到当前时间
				const date = new Date();
				// 判断领取倒计时是否结束
				const hoursCount = DateFormat.dateCount(new Date(v.generateDate), date, 'hours');
				if (hoursCount < 1) {
					obj = { "state": 'ip_43' };

					return;
				}
				// 判断红包是否过期
				if (hoursCount > GlobalVar.ID101) {
					v.isDelete = 1;
					// 过期 删除该红包
					obj = { "state": 'ip_44' };

					return;
				}
				// 判断红包是否已经被领取
				if (v.isRobbed === 1) {
					obj = { "state": 'ip_45' };

					return;
				}
				// 今日领取次数是否达上限
				if (v.isRobbed >= GlobalVar.ID103) {
					obj = { "state": 'ip_45' };

					return;
				}
				// 领取红包
				// 根据红包等级计算元宝奖励：
				// 判断区间获取随机元宝奖励
				// 计算元宝
				const startValue = GlobalVar.ID104[0];
				const endValue = v.grade * GlobalVar.ID104[1];
				const yuanBao = Math.floor(Math.random() * (endValue - startValue + 1) + startValue);
				// 删除红包
				v.isDelete = 1;
				// 计算角色奖励
				// 计算金币收益
				const startGold = GlobalVar.warbagMan[0];
				const endGold = v.grade * GlobalVar.warbagMan[1];
				let roleGrade = 0;
				let goldIncome = Math.floor(Math.random() * (endGold - startGold + 1) + startGold);

				if (goldIncome <= 50) {
					roleGrade = v.grade;
				} else {
					if (roleGrade > 1) {
						roleGrade--;
					}
					goldIncome = goldIncome / 2;
					roleGrade = v.grade;
				}
				// 根据金币价值确定角色
				obj = { "state": '200', "yuanBao": yuanBao, "roleGrade": roleGrade };
			}
		});

		return obj;
	}
}
