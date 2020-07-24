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
	public static REDIS_HOST = '127.0.0.1';
	/**
	 * redis端口配置
	 */
	public static REDIS_PORT = 6379;
	/**
	 * redis密码配置(没有可不填)
	 */
	public static REDIS_PASSWORD = '';
	/**
	 * token验证白名单Url
	 */
	public static OPEN_URL = ['/auth/login', '/auth/register','/wechat/oauth'];
}
