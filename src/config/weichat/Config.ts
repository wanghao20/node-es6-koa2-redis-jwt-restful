/**
 * Created by wh on 2020/7/24
 * author: wanghao
 * @desc：微信参数配置
 */

export class WeiChatBaseConfig {
	/**
	 * 你的测试号或正式号appid
	 */
	public static appID = 'wx39368e54a8cdc0bc';
	/**
	 * 你的测试号或正式号appsecret
	 */
	public static appSecret = '9fa5ba18ec4d076972cc3c2f92f4fe1b';
	/**
	 * 企业转账商户号id(涉及支付)
	 */
	public static mchid = 'Test1512804351';
	/**
	 * 企业商户key(key为商户平台设置的密钥key)
	 */
	public static merchantKey = 'WeiShangTest20180905HCOURSE';
	/**
	 * 证书地址
	 */
	public static merchantCert = '../../cert/apiclient_cert.p12';
}
