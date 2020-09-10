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
    public static SYSTEM_DB = 1;
	/**
	 * redis db配置(MQ使用)
	 */
    public static BULLMQ_DB = 2;
	/**
         * token验证白名单Url
	 */
    public static OPEN_URL = [
        "/auth/login",
        "/auth/insert",
        "/auth/captchaCode",
        "/auth/getEmailCode",
        "/auth/validEmailCode",
        "/wechat/oauth",
        "/favicon.ico",
        "/common/download"
    ];
    /**
     * 文件URL
     */
    public static OPEN_FILE_URL = "/common/download";
	/**
    * 记录日志Urld对应的记录名称
	 */
    public static LOG_URL:any = {
        "/auth/user": "用户",
        "/auth/Mod": "模块",
        "/auth/role": "角色",
        "/game/game": "游戏",
    };
    /**
     * 这里处理特殊返回没有状态码的Url地址打印时显示正常
     */
    public static OPEN_LOG_URL ="/auth/captchaCode";
    /**
     * 1
     */
    public static OPEN_LOG_URL1 ="/common/download/";
    /**
     * 新注册玩家默认权限id
     */
    public static GHOST_DEFAULT_ROLE_ID = "b6363d60-71aa-4489-b784-4effa01dffd2";
    /**
     * name
     */
    public static GHOST_DEFAULT_ROLE_NAME = "访客";
    /**
     * 设置非活跃玩家判定时间(天数)
     * 玩家超过天数内未登录后清理redis内存数据
     */
    public static DT_TIME = 3;

}
