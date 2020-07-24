/**
 * Created by wh on 2020/7/24
 * author: wanghao
 * @desc：微信官方URL地址配置
 */

export class WeiChatUrlBaseConfig {
	/**
	 * 获取微信基础access-token的url
	 */
	public static accessTokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential';
	/**
	 * 获取微信网页授权所需的jsapi-ticket的url
	 */
	public static ticketUrl = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=';
	/**
	 * 微信支付是否支持信用卡支付
	 */
	public static limitPay: 'no_credit';
	/**
	 * 微信小程序消息推送url
	 */
	public static messageUrl: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=';
	/**
	 * 微信支付回调通知支付结果
	 */
	public static notifyUrl: 'http://webusiness.shitenai.com/api/mini/payment/callback';
	/**
	 * 微信支付统一下单的prepay_id的url
	 */
	public static prepayIdUrl: 'https://api.mch.weixin.qq.com/pay/unifiedorder';
	/**
	 * 微信企业转账url
	 */
	public static transfermoneyUrl: 'https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers';
	/**
	 * 正式环境的微信端auth2.0网页授权回调URL
	 */
	public static webAuthServerUrl: 'http://www.******.com/wechat/authtoken';
	/**
	 * 微信网页授权第一步所要请求获得code的URL
	 */
	public static webAuthCodeUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?';
	/**
	 * 微信网页授权所需的access_token，用于获取到用户的openid等信息
	 */
	public static webAuthTokenUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?';
}
