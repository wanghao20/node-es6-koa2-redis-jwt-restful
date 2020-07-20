import { getMongoManager } from "typeorm";
import { GlobalVar } from "../config/GlobalVar";
import { KeyName } from "../config/RedisKeys";
import { logError } from "./logger";
import { redisDb1 } from "./redisTool";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 初始化Redis数据到全局变量中
 */
export class InitRedisData {


    constructor() {
        this.init().catch(error => {
            // tslint:disable-next-line:no-console
            console.log(error);
            logError('初始化数据错误:' + error)
        });
    }
    // 启动时调用初始化
    private async init() {
        this.systemConfigInit()
        this.entityInit()
    }
    /**
     * 初始化数据到Redis
     */
    private async entityInit() {
        const uid = 1;// 初始化数据id
        // 红包数据列表
        const redEnvelopeList = [];
        redEnvelopeList.push({ "id": "5f0d5c8c553e7c2c4c993662", "grade": 1, "isRobbed": 0, "isExpired": 0, "isDelete": 0, attackerId: "2", "haveReadAttacker": 0, "beAttackerId": "1", "beHaveReadAttacker": 0, "generateDate": "2020-07-13T16:06:05.000Z", "ingotReward": 10, "takeAwayUserId": "" })
        redEnvelopeList.push({ "id": "5f0d5c9f553e7c2c4c993663", "grade": 2, "isRobbed": 0, "isExpired": 0, "isDelete": 0, attackerId: "1", "haveReadAttacker": 0, "beAttackerId": "2", "beHaveReadAttacker": 0, "generateDate": "2020-07-15T16:00:39.000Z", "ingotReward": 10, "takeAwayUserId": "" })
        redEnvelopeList.forEach(v => {
            redisDb1.sadd(KeyName.SET_OBJ_RED_ENVRLOPE(v.attackerId), JSON.stringify(v))
        })


        const redEnvelopeRecordList = [];
        // 已领取列表
        const redEnvelopeRecord = { generateDate: new Date(), littleTime: 0, userName: '', headImg: '', oneself: 0 }
        redEnvelopeRecordList.push(redEnvelopeRecord)
        redisDb1.setString(KeyName.STR_OBJ_RED_ENVRLOPE_RCORD + uid, JSON.stringify(redEnvelopeRecordList))

        // 玩家数据
        const gameUserList = []
        gameUserList.push({ id: 1, name: '玩家1', headImg: '头像', grade: 1, friends: [2, 3], ingotReward: 5, roleId: ['id1', 'id2'], superiorId: '2' })
        gameUserList.push({ id: 2, name: '玩家2', headImg: '头像', grade: 1, friends: [2, 3], ingotReward: 5, roleId: ['id3', 'id4'], superiorId: '' })
        gameUserList.push({ id: 3, name: '玩家3', headImg: '头像', grade: 1, friends: [2, 3], ingotReward: 5, roleId: ['id5', 'id6'], superiorId: '2' })
        gameUserList.forEach(v => {
            redisDb1.sadd(KeyName.SET_OBJ_GAME_USERS + v.id, JSON.stringify(v))
        })
        // 攻打记录
        const attackLogList = [];
        attackLogList.push({ generateDate: '2020-07-13T16:06:05.000+0000', attackerId: '1', beAttackerId: '2', winLose: 1 })
        attackLogList.push({ generateDate: '2020-07-13T16:08:05.000+0000', attackerId: '1', beAttackerId: '3', winLose: 0 })
        attackLogList.push({ generateDate: '2020-07-13T16:08:05.000+0000', attackerId: '3', beAttackerId: '1', winLose: 1 })
        attackLogList.forEach(v => {
            redisDb1.sadd(KeyName.SET_OBJ_ATTACK_LOG_ID(v.attackerId), JSON.stringify(v))
        })
        // 保存缓存



        // redEnvelopeList.forEach(v=>{
        //     redisDb1.sadd(v.id,v)
        // })
        // redisDb1.sadd(redEnvelopeRecord.uid,redEnvelopeRecord)
    }


    /**
     * 初始化系统全局配置数据
     */
    private async systemConfigInit() {
        // 保存缓存
        const systemConfig = [{"ID100":10},{"ID101":30},{"ID102":24},{"ID103":20},{"ID104":[1,1]},{"ID106":10},{"ID107":[0,1,1]},{"ID108":[60,40]},{"ID109":[0.5,1.5]},{"ID110":[50,0,0]},{"ID111":1},{"warbag_man":[0.5,2]}]
        redisDb1.setString(KeyName.STR_CONFIG_SYSTETMF_INDKEY, systemConfig)
        const system = await redisDb1.getString(KeyName.STR_CONFIG_SYSTETMF_INDKEY)
        await JSON.parse(system)
            .find(v => {
                if (v.ID101)
                    GlobalVar.ID101 = v.ID101;
                if (v.ID102)
                    GlobalVar.ID102 = v.ID102;
                if (v.ID103)
                    GlobalVar.ID103 = v.ID103;
                if (v.ID104)
                    GlobalVar.ID104 = v.ID104;
                if (v.ID106)
                    GlobalVar.ID106 = v.ID106;
                if (v.ID107)
                    GlobalVar.ID107 = v.ID107;
                if (v.ID108)
                    GlobalVar.ID108 = v.ID108;
                if (v.ID109)
                    GlobalVar.ID109 = v.ID109;
                if (v.ID110)
                    GlobalVar.ID110 = v.ID110;
                if (v.ID111)
                    GlobalVar.ID111 = v.ID111;
                if (v.warbag_Man)
                    GlobalVar.warbag_man = v.warbag_Man;
            })
    }
}