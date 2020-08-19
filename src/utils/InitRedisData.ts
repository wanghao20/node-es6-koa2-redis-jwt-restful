

import { KeyName } from "../config/RedisKeys";

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
        this.entityInit();
    }
	/**
	 * 初始化数据到Redis
	 */
    private async entityInit() {

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
    }

}
