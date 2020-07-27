/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：redis中使用到的key名字定义(
 *  按照“存储类型: 业务类型：id：字段”的方式进行命名)
 * STR: 字符型
 * SET:无序集合不可重复的，和列表一样，在执行插入和删除和判断是否存在某元素时，效率是很高
 * 散列HASH:可以看成具有String key和String value的map容器，可以将多个key-value存储到一个key中。每一个Hash可以存储4294967295个键值对。
 */
export class KeyName {
	/**
	 * 模拟账户
	 */
	public static HASH_AUTH_USER = 'HASH:AUTH:USER:';
	/**
	 * 系统配置
	 */
	public static STR_CONFIG_SYSTETMF_INDKEY = 'STR:CONGIF:SYSTETMF_INDKEY';
	/**
	 * 等级奖励配置
	 */
	public static STR_CONFIG_GRAEDEVOTE = 'STR:CONGIF:GRAEDEVOTE:';
	/**
	 * 2
	 */
	public static SET_CONFIG_GRAEDEVOTE = 'SET:CONGIF:GRAEDEVOTE';
	/**
	 * 已经领取红包列表
	 */
	public static STR_OBJ_RED_ENVRLOPE_RCORD = 'STR:OBJ:RED_ENVRLOPE_RCORD';
	/**
	 * set型数据
	 */
	/**
	 * 玩家数据
	 */
	public static HASH_OBJ_GAME_USERS = 'HASH:OBJ:GAME_USERS:';

	// 每日清空数据
	/**
	 * 每日领取红包
	 */
	public static STR_DAYS_RED_CLAIMT_IMES = 'STR:DAYS:RED_CLAIMT_IMES:';
	// 实体对象
	// 红包数据
	/**
	 * 用户获得红包记录
	 * @param uid 用户ID
	 */
	public static SET_OBJ_RED_ENVRLOPE(uid: string) {
		return `SET:OBJ:${uid}:RED_ENVRLOPE`;
	}
	/**
	 * 用户攻打记录KEY
	 * @param uid 用户ID
	 */
	public static SET_OBJ_ATTACK_LOG_ID(uid: string) {
		return `SET:OBJ:${uid}:ATTACK_LOG`;
	}
	/**
	 * 等级贡献奖励记录
	 * @param uid 用户ID
	 */
	public static SET_OBJ_DRAW_LOG_ID(uid: string) {
		return `SET:OBJ:DRAW_LOG:${uid}`;
	}

	/**
	 * 存储了App的信息在此
	 */
	public static HASH_OBJ_APPINFO(appid: string) {
		return `HASH:OBJ:APPINFO:${appid}`;
	}
}
