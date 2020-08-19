/**
 * Created by wh on 2020/7/24
 * author: wanghao
 * @desc：微信参数配置
 */

export class WeiChatBaseConfig {
	/**
	 * 企业转账商户号appid
	 */
    public static appID = "wxa9d990edf6466ab2";
	/**
	 * 企业转账商户号appsecret
	 */
    public static appSecret = "db237e5f7e8caf2644a8f5cb00deee54";

	/**
	 * 公众号红包appid
	 */
    public static oaAppID = "wx7076a3612fb659d3";
    /**
* 公众号红包appid
*/
    public static oaAppSecret = "95438d19e05d0691fc322e1c74bc38a6";

	/**
	 * 红包发送者名称
	 * 注意：敏感词会被转义成字符*
	 */
    public static sendName = "test";
	/**
	 * 红包发送人数
	 * 注意：敏感词会被转义成字符*
	 */
    public static totalNum = "1";
	/**
	 * 红包发送祝福语
	 * 注意：敏感词会被转义成字符*
	 */
    public static wishing = "test";
	/**
	 * 红包活动名称
	 * 注意：敏感词会被转义成字符*
	 */
    public static actName = "test";
	/**
	 * 红包备注
	 * 注意：敏感词会被转义成字符*
	 */
    public static remark = "test";
	/**
         * 发放红包使用场景，红包金额大于200或者小于1元时必传
        PRODUCT_1:商品促销

        PRODUCT_2:抽奖

        PRODUCT_3:虚拟物品兑奖

        PRODUCT_4:企业内部福利

        PRODUCT_5:渠道分润

        PRODUCT_6:保险回馈

        PRODUCT_7:彩票派奖

        PRODUCT_8:税务刮奖
         */
    public static sceneId = "PRODUCT_2";
	/**
	 * 企业转账商户号id(涉及支付)
	 */
    public static mchid = "1483831402";
	/**
	 * 企业商户key(key为商户平台设置的密钥key)
	 */
    public static merchantKey = "98f93dd3122ee82c5635ab432593ferd";
	/**
	 * 证书地址
	 */
    public static merchantCert = "../../config/weichat/cert/apiclient_cert.p12";
}
