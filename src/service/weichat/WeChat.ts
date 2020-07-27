import fs = require("fs");

import path = require("path");

import { Context } from "koa";

import { EnAccountTransfer, PreArray, AgentOptionsTy } from "../../config/Type";
import { WeiChatBaseConfig } from "../../config/weichat/Config";
import { WeiChatUrlBaseConfig } from "../../config/weichat/UrlBase";
import { WeChatTool } from "../../utils/weichat/WeichatTool";
import { HttpService } from "../../utils/services/HttpService";
import { VerifyException } from "../../utils/Exceptions";
import { StaticStr } from "../../config/StaticStr";

/**
 * Created by wh on 2020/7/23
 * author: wanghao
 * @desc：微信操作Service
 */
export class WeChatService {
	/**
	 * 工具类
	 */
	private readonly tool: WeChatTool;

	constructor() {
		this.tool = new WeChatTool();
	}
	/**
	 * 第一步骤
	 * @param ctx koa中间件
	 */
	public async oauth(ctx: Context) {
		// const appID = `wx8412200229d851b7`;
		// const appSecret = `18432562d996fa8fc41647e482bee039`;
		// const returnUri = encodeURI(`http://148.70.34.67:8080/api/base/getIndex`);
		// const { request: req, response: res } = ctx;
		// // 第一步：用户同意授权，获取code
		// const scope = 'snsapi_base';
		// // snsapi_userinfo可以获取用户信息与token与openid
		// // snsapi_base只能获取到token与openid
		// res.redirect(
		// 	'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
		// 		WeiChatBaseConfig.appID +
		// 		'&redirect_uri=' +
		// 		returnUri +
		// 		'&response_type=code&scope=' +
		// 		scope +
		// 		'&state=123456#wechat_redirect'
		// );
	}

	/**
         *第二步骤
         获取access_token
         获取用户信息
	 * @param ctx koa中间件
	 */
	public async token(code: string) {
		// 第二步：通过code换取网页授权access_token
		const url = WeiChatUrlBaseConfig.getAccessTokenUrl(WeiChatBaseConfig.appID, WeiChatBaseConfig.appSecret, code);
		const response: any = await HttpService.get(url);
		if (response.successed) {
			// 第三步：拉取用户信息(需scope为 snsapi_userinfo)
			console.log(JSON.parse(response.body));
			const data = JSON.parse(response.body);
			const access_token = data.access_token;
			const openid = data.openid;
			const userUrl = WeiChatUrlBaseConfig.getUserInfoUrl(access_token, openid, code);
			const userResponse: any = await HttpService.get(userUrl);
			if (userResponse.successed) {
				// 第四步：根据获取的用户信息进行对应操作
				const userinfo = JSON.parse(userResponse.body);
				console.log(JSON.parse(userResponse.body));
				// console.log('获取微信信息成功！');
			} else {
				console.log(response.error);
			}
		} else {
			console.log(response.error);
		}
	}

	/**
	 * 通过微信的企业账号转账
	 * EnAccountTransfer对象封装
	 * @param appid appid
	 * @param openid openid
	 * @param orderno 订单号
	 * @param amount 金额
	 */
	public async transfers(enAccountTransfer: EnAccountTransfer) {
		const orderno = this.tool.createOrderno().toString();
		// 定义发送给微信请求body
		const preArray: PreArray = enAccountTransfer;
		preArray.mch_appid = enAccountTransfer.appid; // appID,
		preArray.mchid = WeiChatBaseConfig.mchid; // 微信支付商户号
		preArray.nonce_str = this.tool.createNonceStr(); // 随机字符串
		preArray.partner_trade_no = orderno; // 订单号
		preArray.openid = enAccountTransfer.openid; // openid
		preArray.check_name = StaticStr.WC_NO_CHECK; // 不检查name
		preArray.amount = enAccountTransfer.amount; // 金额
		preArray.desc = StaticStr.WC_DESC; // 备注
		preArray.spbill_create_ip = StaticStr.WC_IP; // 客户端ip
		// 取得xml请求数据体
		const formData = this.tool.object2Xml(preArray, WeiChatBaseConfig.merchantKey);
		// 向微信服务端请求支付
		const pfx = fs.readFileSync(path.join(__dirname, WeiChatBaseConfig.merchantCert));
		const agentOptions: AgentOptionsTy = { "pfx": pfx, "passphrase": WeiChatBaseConfig.mchid };
		const transferData: any = await HttpService.tPost(WeiChatUrlBaseConfig.transfermoneyUrl, formData, agentOptions);
		// 判断是否是空
		if (transferData.successed === false) {
			throw new VerifyException(StaticStr.WC_ERR_MSG, 1000);
		}
		// 返回来的XML数据
		const reBodyXml = transferData.body.toString("uft-8");
		// console.log('return xml data ==', _reBodyXml);
		// 取得return_code进行成功与否判断
		const reCode = this.tool.getXMLNodeValue("return_code", reBodyXml, false);
		const resultCode = this.tool.getXMLNodeValue("result_code", reBodyXml, false);
		if (reCode === "SUCCESS" && resultCode === "SUCCESS") {
			// return Promise.resolve({successed:true,orderno:orderno});
			return { "orderno": orderno };
		}
		const errorcode = this.tool.getXMLNodeValue("err_code", reBodyXml, false);
		const obj = { "orderno": orderno, "errorcode": errorcode };

		return obj;
	}
}