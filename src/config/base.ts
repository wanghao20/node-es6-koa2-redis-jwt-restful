/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：服务器基础配置
 */

export class BaseConfig {
	/**
	 * 服务器端口配置
	 */
	public static PORT = 9090;
	/**
	 * redis配置
	 */
	// public static REDIS_HOST = "";
	public static REDIS_HOST = "localhost";
	/**
	 * redis端口配置
	 */
	public static REDIS_PORT = 6379;
	/**
	 * redis密码配置(需要在redisTool打开注释)
	 */
	public static REDIS_PASSWORD = "123456";
	/**
	 * redis db配置(项目使用)
	 */
	public static SYSTEM_DB = 3;
	/**
	 * redis db配置(MQ使用)
	 */
	public static BULLMQ_DB = 2;
	/**
         * token验证白名单Url
	 */
        public static OPEN_URL = ["/auth/login", "/auth/register", "/wechat/oauth", "/favicon.ico"];
	/**
         * 不记录日志Url
	 */
        public static NO_LOG_URL = ["/app/system/tbLog", "/app/system/cltLog"];

        /**
         * 设置非活跃玩家判定时间(天数)
         * 玩家超过天数内未登录后清理redis内存数据
         */
        public static DT_TIME = 3;

}
