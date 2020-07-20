
import { Expeditions, ArmyList } from '../config/ReturnFormat';
import { redisDb1 } from '../utils/redisTool';
import { KeyName } from '../config/RedisKeys';
import { GlobalVar } from '../config/GlobalVar';
import { v4 as uuidv4 } from 'uuid';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：社交主页Service
 */
export class SocialContactService {


    /**
     * 获取用户盟友列表
     * @param uid 当前查询用户ID
     */
    async armyList(uid: string) {

        // 从Redis拿取数据
        const allyList = [];
        const user = JSON.parse(await redisDb1.smembers(KeyName.SET_OBJ_GAME_USERS + uid))
        allyList.push(user)
        let i = 0;
        let j = 0;
        let k = 0;
        user.friends.forEach(async v => {
            // 拿到玩家一级好友
            const user1 = JSON.parse(await redisDb1.smembers(KeyName.SET_OBJ_GAME_USERS + v))
            // 根据全局配置获取数量
            if (user1.grade === 1 || i < GlobalVar.ID110[0]) {
                i++;
                allyList.push(user1);
            }
            if (user1.grade === 2 || j < GlobalVar.ID110[1]) {
                j++;
                allyList.push(user1);
            }
            if (user1.grade === 3 || k < GlobalVar.ID110[2]) {
                k++;
                allyList.push(user1);
            }
        });
        const expeditionsList = [];
        // 格式化数据
        allyList.forEach(async (v) => {
            const armyList = new ArmyList();
            armyList.id = v.id;
            armyList.name = v.name;
            armyList.grade = v.grade;
            armyList.headImg = v.headImg;
            expeditionsList.push(armyList);
        });
        return expeditionsList;
    }
    /**
     * 获取用户出征列表
     * @param uid 当前查询用户ID
     */
    async expeditionsList(uid: string) {

        // 从Redis拿取数据
        const user = JSON.parse(await redisDb1.smembers(KeyName.SET_OBJ_GAME_USERS + uid))
        const allyList = [];
        user.friends.forEach(async v => {
            // 拿到玩家一级好友
            const user1 = JSON.parse(await redisDb1.smembers(KeyName.SET_OBJ_GAME_USERS + v))
            if (user1.grade === 1)
                allyList.push(user1);
        });
        // 拿到玩家上级好友
        const user2 = JSON.parse(await redisDb1.smembers(KeyName.SET_OBJ_GAME_USERS + user.superiorId))
        if (allyList.indexOf(user2) !== -1) {
            // 不存在就加入进去
            allyList.push(user2);
        }
        // 拿到我攻打过的陌生玩家;（且生成的红包还未领取）
        const logList = await redisDb1.smembers(KeyName.SET_OBJ_ATTACK_LOG_ID(uid))
        // 拿到攻打记录
        logList.forEach(async v => {
            v = JSON.parse(v)
            // 判断是否是陌生人
            if (user.friends.indexOf(v.beAttackerId) <= -1) {
                // 是:查询红包列表检查是否有红包未领取
                const redEnvelopeList = await redisDb1.smembers(KeyName.SET_OBJ_RED_ENVRLOPE(v.beAttackerId))
                redEnvelopeList.forEach(async element => {
                    element = JSON.parse(element)
                    if (element.isDelete === 0 && element.isExpired === 0 && element.isRobbed === 0) {
                        // 添加到列表中
                        allyList.push(JSON.parse(await redisDb1.smembers(KeyName.SET_OBJ_GAME_USERS + element.beAttackerId)))
                    }
                });
            }
        });
        const expeditionsList = []
        // 格式化数据
        allyList.forEach(async (v) => {
            const expeditions = new Expeditions();
            expeditions.id = v.id;
            expeditions.name = v.name;
            expeditions.grade = v.grade;
            expeditions.headImg = v.headImg;
            expeditionsList.push(expeditions);
        });
        return expeditionsList;
    }

    /**
     * 保存攻打结果
     * @param uid 玩家ID
     * @param bid 被攻打玩家ID
     */
    async attack(uid: string, beUser) {

        // 判断最近红包
        // 保存攻打记录
        const attackLog = JSON.stringify({ generateDate: beUser.attackDate, attackerId: uid, beAttackerId: beUser.id, winLose: beUser.winLose })
        redisDb1.sadd(KeyName.SET_OBJ_ATTACK_LOG_ID(uid), attackLog);
        // 保存红包信息
        const redEnvelope = JSON.stringify({ "id": uuidv4(), "grade": 1, "isRobbed": 0, "isExpired": 0, "isDelete": 0, attackerId: uid, "haveReadAttacker": 0, "beAttackerId": beUser.id, "beHaveReadAttacker": 0, "generateDate": new Date(), "ingotReward": 10, "takeAwayUserId": "" })
        redisDb1.sadd(KeyName.SET_OBJ_RED_ENVRLOPE(uid), redEnvelope)

        return "保存成功"
    }

}