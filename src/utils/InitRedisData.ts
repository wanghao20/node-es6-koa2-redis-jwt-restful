import { AdvancedConsoleLogger, getMongoManager } from "typeorm";

import fs = require("fs");

import { GlobalVar } from "../entity/GlobalVar";
import { KeyName } from "../config/RedisKeys";
import { DrawReward, TbLogContent, TbLog } from "../format/Type";
// import { DrawRewardEntity } from "../entity/DrawRewardEntity";

import { DateFormat } from "./DateFormat";
import { logError } from "./Logger";
import { redisDb1 } from "./RedisTool";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 初始化Redis数据到全局变量中
 */
export class InitRedisData {
	constructor() {
		this.init().catch((error) => {
			// tslint:disable-next-line:no-console
			console.log(error);
			logError("初始化数据错误:" + error);
		});
	}
	/**
	 * 启动时调用初始化
	 */
	private async init() {
		this.systemConfigInit();
		this.entityInit();
	}
	/**
	 * 初始化数据到Redis
	 */
	private async entityInit() {
		const uid = 1; // 初始化数据id
		// 红包数据列表
		const redEnvelopeList = [];
		redEnvelopeList.push({
			"id": "5f0d5c8c553e7c2c4c993662",
			"grade": 1,
			"isRobbed": 0,
			"isExpired": 0,
			"isDelete": 0,
			"attackerId": "2",
			"haveReadAttacker": 0,
			"beAttackerId": "1",
			"beHaveReadAttacker": 0,
			"generateDate": "2020-07-13T16:06:05.000Z",
			"ingotReward": 10,
			"takeAwayUserId": "",
		});
		redEnvelopeList.push({
			"id": "5f0d5c9f553e7c2c4c993663",
			"grade": 2,
			"isRobbed": 0,
			"isExpired": 0,
			"isDelete": 0,
			"attackerId": "1",
			"haveReadAttacker": 0,
			"beAttackerId": "2",
			"beHaveReadAttacker": 0,
			"generateDate": "2020-07-15T16:00:39.000Z",
			"ingotReward": 10,
			"takeAwayUserId": "",
		});
		redEnvelopeList.forEach((v) => {
			redisDb1.sadd(KeyName.SET_OBJ_RED_ENVRLOPE(v.attackerId), JSON.stringify(v));
		});

		const redEnvelopeRecordList = [];
		// 已领取列表
		const redEnvelopeRecord = { "generateDate": new Date(), "littleTime": 0, "userName": "", "headImg": "", "oneself": 0 };
		redEnvelopeRecordList.push(redEnvelopeRecord);
		redisDb1.setString(KeyName.STR_OBJ_RED_ENVRLOPE_RCORD + uid, JSON.stringify(redEnvelopeRecordList));

		// 玩家数据
		const gameUserList = [];
		// gameUserList.push({
		// 	"id": "A",
		// 	"name": "玩家A",
		// 	"headImg": "头像",
		// 	"grade": 1,
		// 	"friends": [2, 3],
		// 	"ingotReward": 5,
		// 	"roleId": ["id1", "id2"],
		// 	"superiorId": "2",
		// 	"drawRewardGrade": 2,
		// 	"devote": 0,
		// });
		// gameUserList.push({
		// 	"id": "B",
		// 	"name": "玩家B",
		// 	"headImg": "头像",
		// 	"grade": 1,
		// 	"friends": [2, 3],
		// 	"ingotReward": 5,
		// 	"roleId": ["id3", "id4"],
		// 	"superiorId": "",
		// 	"drawRewardGrade": 2,
		// 	"devote": 0,
		// });
		gameUserList.push({
			"id": "C",
			"name": "玩家C",
			"headImg": "头像",
			"grade": 1,
			"friends": [2, 3],
			"ingotReward": 5,
			"roleId": ["id5", "id6"],
			"superiorId": "2",
			"drawRewardGrade": 2,
			"devote": 0,
		});
		// gameUserList.push({
		// 	"id": "D",
		// 	"name": "玩家D",
		// 	"headImg": "头像",
		// 	"grade": 1,
		// 	"friends": [2, 3],
		// 	"ingotReward": 5,
		// 	"roleId": ["id5", "id6"],
		// 	"superiorId": "2",
		// 	"drawRewardGrade": 2,
		// 	"devote": 0,
		// });
		// gameUserList.push({
		// 	"id": "E",
		// 	"name": "玩家E",
		// 	"headImg": "头像",
		// 	"grade": 1,
		// 	"friends": [2, 3],
		// 	"ingotReward": 5,
		// 	"roleId": ["id5", "id6"],
		// 	"superiorId": "2",
		// 	"drawRewardGrade": 2,
		// 	"devote": 0,
		// });
		gameUserList.push({
			"id": "F",
			"name": "玩家F",
			"headImg": "头像",
			"grade": 1,
			"friends": [2, 3],
			"ingotReward": 5,
			"roleId": ["id5", "id6"],
			"superiorId": "2",
			"drawRewardGrade": 2,
			"devote": 0,
		});
		// gameUserList.push({
		// 	"id": "G",
		// 	"name": "玩家G",
		// 	"headImg": "头像",
		// 	"grade": 1,
		// 	"friends": [2, 3],
		// 	"ingotReward": 5,
		// 	"roleId": ["id5", "id6"],
		// 	"superiorId": "2",
		// 	"drawRewardGrade": 2,
		// 	"devote": 0,
		// });
		gameUserList.forEach((v) => {
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "id", v.id);
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "name", v.name);
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "headImg", v.headImg);
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "grade", v.grade);
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "friends", JSON.stringify(v.friends));
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "ingotReward", v.ingotReward);
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "roleId", JSON.stringify(v.roleId));
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "superiorId", v.superiorId);
			redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + v.id, "drawRewardGrade", v.drawRewardGrade);
                });
                // 模拟用户登录统计
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(1) + DateFormat.today(7), "A");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(2) + DateFormat.today(7), "A");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(3) + DateFormat.today(7), "A");

                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(1) + DateFormat.today(6), "B");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(2) + DateFormat.today(6), "B");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(3) + DateFormat.today(6), "B");

                await redisDb1.pfadd(KeyName.HLL_USER_STATS(1) + DateFormat.today(1), "C");
                await redisDb1.pfadd(KeyName.HLL_USER_STATS(2) + DateFormat.today(1), "C");
                await redisDb1.pfadd(KeyName.HLL_USER_STATS(3) + DateFormat.today(1), "C");

                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(1) + DateFormat.today(4), "D");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(2) + DateFormat.today(4), "D");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(3) + DateFormat.today(4), "D");

                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(1) + DateFormat.today(3), "E");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(2) + DateFormat.today(3), "E");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(3) + DateFormat.today(3), "E");

                // 第一次过滤正常模拟第二次过滤
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(1) + DateFormat.today(2), "F");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(2) + DateFormat.today(2), "F");
                // await redisDb1.pfadd(KeyName.HLL_USER_STATS(3) + DateFormat.today(2), "F");

                // 第二次过滤正常模拟第三次过滤
                await redisDb1.pfadd(KeyName.HLL_USER_STATS(1) + DateFormat.today(1), "G");
                await redisDb1.pfadd(KeyName.HLL_USER_STATS(2) + DateFormat.today(1), "G");
                await redisDb1.pfadd(KeyName.HLL_USER_STATS(3) + DateFormat.today(1), "G");

		// 等级贡献
		// 默认等级奖励对应数据
		// 从json文件读取
		fs.readFile("./public/config.json", function (err: any, data: any) {
			const config = JSON.parse(data.toString());
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve2", config.leve2);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve3", config.leve3);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve4", config.leve4);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve5", config.leve5);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve6", config.leve6);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve7", config.leve7);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve8", config.leve8);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve9", config.leve9);
			redisDb1.setString(KeyName.STR_CONFIG_GRAEDEVOTE + "leve10", config.leve10);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve2:" + config.leve2);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve3:" + config.leve3);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve4:" + config.leve4);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve5:" + config.leve5);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve6:" + config.leve6);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve7:" + config.leve7);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve8:" + config.leve8);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve9:" + config.leve9);
			redisDb1.sadd(KeyName.SET_CONFIG_GRAEDEVOTE, "leve10:" + config.leve10);
		});
		// 玩家领取记录
		const drawLogList = [];
		// const drawLog: DrawReward = new DrawRewardEntity();
		// drawLog.uid = "1";
		// drawLog.grade = 2;
		// drawLog.devote = 20;
		// drawLogList.push(drawLog);
		// drawLogList.forEach((v) => {
		// 	redisDb1.sadd(KeyName.SET_OBJ_DRAW_LOG_ID(v.uid), JSON.stringify(v));
		// });

		// redisDb1.sadd(KeyName.SET_OBJ_TB_LOG, JSON.stringify(tbLog));
		// 操作记录对应详情数据
                const tbLogContent: TbLogContent = { "urlAddress": "/app/addUser", "comment": "红包" };
                const tbLogContent1: TbLogContent = { "urlAddress": "/app/system_config", "comment": "系统配置" };
                // const tbLogContent2: TbLogContent = { "urlAddress": "/app/tbLog", "comment": "用户日志" };
                redisDb1.hset(KeyName.HASH_OBJ_CONTENT_URL, tbLogContent.urlAddress, tbLogContent.comment);
                redisDb1.hset(KeyName.HASH_OBJ_CONTENT_URL, tbLogContent1.urlAddress, tbLogContent1.comment);

	}

	/**
	 * 初始化系统全局配置数据
	 */
	private async systemConfigInit() {
		// 保存缓存
		const systemConfig = [
			{ "ID100": 10 },
			{ "ID101": 30 },
			{ "ID102": 24 },
			{ "ID103": 20 },
			{ "ID104": [1, 1] },
			{ "ID106": 10 },
			{ "ID107": [0, 1, 1] },
			{ "ID108": [60, 40] },
			{ "ID109": [0.5, 1.5] },
			{ "ID110": [50, 0, 0] },
			{ "ID111": 1 },
			{ "warbagMan": [0.5, 2] },
		];
		redisDb1.setString(KeyName.STR_CONFIG_SYSTETMF_INDKEY, systemConfig);
		const system = await redisDb1.getString(KeyName.STR_CONFIG_SYSTETMF_INDKEY);
		await JSON.parse(system).find((v: any) => {
			if (v.ID101) {
				GlobalVar.ID101 = v.ID101;
			}
			if (v.ID102) {
				GlobalVar.ID102 = v.ID102;
			}
			if (v.ID103) {
				GlobalVar.ID103 = v.ID103;
			}
			if (v.ID104) {
				GlobalVar.ID104 = v.ID104;
			}
			if (v.ID106) {
				GlobalVar.ID106 = v.ID106;
			}
			if (v.ID107) {
				GlobalVar.ID107 = v.ID107;
			}
			if (v.ID108) {
				GlobalVar.ID108 = v.ID108;
			}
			if (v.ID109) {
				GlobalVar.ID109 = v.ID109;
			}
			if (v.ID110) {
				GlobalVar.ID110 = v.ID110;
			}
			if (v.ID111) {
				GlobalVar.ID111 = v.ID111;
			}
			if (v.warbagMan) {
				GlobalVar.warbagMan = v.warbagMan;
			}
		});
	}
}
