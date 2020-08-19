/**
 * Created by wh on 2020/7/24
 * author: wanghao
 * @desc：微信官方URL地址配置
 */

export class WeiChatUrlBaseConfig {
	/**
	 * 获取微信基础access-token的url
	 */
    public static accessTokenUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
	/**
	 * 获取微信网页授权所需的jsapi-ticket的url
	 */
    public static ticketUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=";
	/**
	 * 微信小程序消息推送url
	 */
    public static messageUrl = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=";
	/**
	 * 微信支付回调通知支付结果
	 */
    public static notifyUrl = "http://webusiness.shitenai.com/api/mini/payment/callback";
	/**
	 * 微信支付统一下单的prepay_id的url
	 */
    public static prepayIdUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
	/**
	 * 微信企业转账url
	 */
    public static transfermoneyUrl = "https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers";
	/**
	 * 微信企业红包
	 */
    public static senDredPackUrl = "https://api.mch.weixin.qq.com/mmpaymkttransfers/sendredpack";
	/**
	 * 微信授权成功后访问该接口带参数code(需要在微信开发平台接口权限配置,否则会提示无效)
	 */
    public static returnUri = "http://192.168.12.245:9090/api/wechat/token";
	/**
	 *  第一步：通过appid换取网页授权code的Url
	 * 此处URL是重定向到客户端授权URL
	 */
    public static getCodeUrl(appid: string, returnUri: string, scope: string) {
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${returnUri}&response_type=code&scope=${scope}&state=123456#wechat_redirect`;

        return url;
    }

	/**
	 *  第二步：通过code换取网页授权access_token的Url
	 */
    public static getAccessTokenUrl(appid: string, appSecret: string, code: string) {
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${appSecret}&code=${code}&grant_type=authorization_code`;

        return url;
    }

	/**
	 *  第三步：拉取用户信息的Url
	 */
    public static getUserInfoUrl(accessToken: string, openid: string, code: string) {
        const url = `https://api.weixin.qq.com/sns/userinfo?access_token=?${accessToken}&openid=${openid}&code=${code}&&lang=zh_CN`;

        return url;
    }
}
