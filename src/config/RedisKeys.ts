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
	 * 系统配置
	 */
    public static STR_CONFIG_SYSTETMF_INDKEY = "STR:CONGIF:SYSTETMF_INDKEY:";
    /**
     * 验证码
     */
    public static STR_SVGCAPTCHA_TIME = "STR:SVGCAPTCHA_TIME:";
    /**
     * Email验证码
     */
    public static STR_EMAIL_CODE = "STR:EMAIL_CODE:";
	/**
	 * HyperLogLog型数据
	 * 记录日活跃用户数
	 */
    public static HLL_USER_ACT = "HLL:USER:ACT:";
	/**
	 * set型数据
	 */
	/**
	 * 玩家数据
	 */
    public static HASH_OBJ_GAME_USERS = "HASH:OBJ:GAME_USERS:";

	/**
	 * HyperLogLog型数据
	 * 用户活跃数据记录,用来判断前两天用户活跃度
	 */
    public static HLL_USER_STATS(days: number) {
        return `HLL:USER:STATS${days}:`;
    }
}
