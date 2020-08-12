import { QUEUE_DATE_FORMAT } from "../config/BullConfig";
import { KeyName } from "../config/RedisKeys";
import { StaticStr } from "../config/StaticStr";
import { TbLogContent } from "../format/Type";
import { MysqlDatabase } from "../dataBase/MysqlDatabase";
import { BullMQ } from "../utils/BullMQ";
import { DateFormat } from "../utils/DateFormat";
import { VerifyException } from "../utils/Exceptions";
import { redisDb1 } from "../utils/RedisTool";
import { CltLog } from "../entity/mysql/CleLog";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：系统操作Service
 */
export class SystemService {
	/**
	 * 缓存中间件
	 */
	public bullDao: BullMQ;

	constructor() {
                this.bullDao = new BullMQ();
	}
	/**
	 * 查询全局配置Service
	 */
	public async findConfig() {
		// 从Redis拿取数据
                const system = await redisDb1.getString(KeyName.STR_CONFIG_SYSTETMF_INDKEY);
		if (system) {
			return system ;
		}
		throw new VerifyException(StaticStr.ERR_MSG_SYS_F, StaticStr.ERR_CODE_DEFAULT);
	}
	/**
	 * 查询玩家操作日志记录
	 */
	public async tbLog(name: string) {
		const sqlCommand = "call proc_tb_log_find(?);";
		const tbLogs = await MysqlDatabase.executeProc(sqlCommand, name);

		return tbLogs;
	}

	/**
	 * 设置日志URL地址对应说明
	 */
	public async setTbLogContent(tbLogContents: Array<TbLogContent>) {
		// 保存
		tbLogContents.forEach((v) => {
			redisDb1.hset(KeyName.HASH_OBJ_CONTENT_URL, v.urlAddress, v.comment);
		});
	}

	/**
	 * 保存玩家客户端操作日志
	 */
	public async saveCltLog(cltParam: CltLog) {
		// 保存
		this.bullDao.saveObj(cltParam, "cltParam");
	}
	/**
	 * 查看用户活跃度
	 * @param type D当日
	 */
	public async findUserAct(type: string) {
		const nowDate = Date.now();
		if (type === "D") {
			// 获取当前日期
                        const nowDateF = DateFormat.dateFormat(nowDate, QUEUE_DATE_FORMAT);

                        return redisDb1.pfcount(KeyName.HLL_USER_ACT+nowDateF);
		}
	}

	/**
	 * 设置全局配置Service
	 */
	public async SetConfig(fieldList: any) {
		// 保存
		redisDb1.setString(KeyName.STR_CONFIG_SYSTETMF_INDKEY, JSON.stringify(fieldList));

		return fieldList;
	}
}
