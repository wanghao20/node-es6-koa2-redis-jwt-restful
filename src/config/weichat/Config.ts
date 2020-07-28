/**
 * Created by wh on 2020/7/24
 * author: wanghao
 * @desc：微信参数配置
 */

export class WeiChatBaseConfig {
	/**
	 * 你的测试号或正式号appid
	 */
	public static appID = "";
	/**
	 * 你的测试号或正式号appsecret
	 */
	public static appSecret = "";
	/**
	 * 企业转账商户号id(涉及支付)
	 */
	public static mchid = "";
	/**
	 * 企业商户key(key为商户平台设置的密钥key)
	 */
	public static merchantKey = "";
	/**
	 * 证书地址
	 */
	public static merchantCert = "../../config/weichat/cert/apiclient_cert.p12";

}
