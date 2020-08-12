import fs = require("fs");

import path = require("path");

import { Context } from "koa";

import { StaticStr } from "../../config/StaticStr";
import { EnAccountTransfer, PreArray, AgentOptionsTy, SenDredPack, RedArray } from "../../format/Type";
import { VerifyException } from "../../utils/Exceptions";
import { WeiChatBaseConfig } from "../../config/weichat/Config";
import { WeiChatUrlBaseConfig } from "../../config/weichat/UrlBase";
import { HttpService } from "../../utils/services/HttpService";
import { WeChatTool } from "../../utils/weichat/WeichatTool";

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
        /**
         * http请求
         */
	private readonly httpService: HttpService;

	constructor() {
		this.tool = new WeChatTool();
		this.httpService = new HttpService();
	}
	/**
	 * 第一步骤
	 * 通过appID获取code
	 * 把微信授权页面URL配置好后重定向到客户端
	 * @param ctx koa中间件
	 */
	public async oauth(ctx: Context) {
		const { request: req, response: res } = ctx;
		// 第一步：用户同意授权，获取code
                const url = await this.tool.getAuthorizeURL();
		// 重定向到微信授权
		res.redirect(url);
	}

	/**
	 * 第二步骤
	 * 获取access_token获取用户信息
	 * 微信回调此方法获取到code拿取access_token
	 * @param ctx koa中间件
	 */
	public async token(code: string) {
		// 第二步：通过code换取网页授权access_token
		const url = WeiChatUrlBaseConfig.getAccessTokenUrl(WeiChatBaseConfig.appID, WeiChatBaseConfig.appSecret, code);
		const response: any = await this.httpService.get(url);
		if (response.successed) {
			// 第三步：拉取用户信息(需scope为 snsapi_userinfo)
			console.log(JSON.parse(response.body));
			const data = JSON.parse(response.body);
			const access_token = data.access_token;
			const openid = data.openid;
			const userUrl = WeiChatUrlBaseConfig.getUserInfoUrl(access_token, openid, code);
			const userResponse: any = await this.httpService.get(userUrl);
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
	 * @param openid openid
	 * @param orderno 订单号
	 * @param amount 金额
	 */
	public async transfers(enAccountTransfer: EnAccountTransfer) {
		const orderno = this.tool.createOrderno().toString();
		// 定义发送给微信请求body
		const preArray: PreArray = enAccountTransfer;
		preArray.mch_appid = WeiChatBaseConfig.appID; // appID,
		preArray.mchid = WeiChatBaseConfig.mchid; // 微信支付商户号
		preArray.nonce_str = this.tool.createNonceStr(); // 随机字符串
		preArray.partner_trade_no = orderno; // 订单号
		preArray.openid = enAccountTransfer.openid; // openid
		preArray.check_name = StaticStr.WC_NO_CHECK; // 不检查name
		preArray.amount = enAccountTransfer.amount; // 企业付款金额，单位为分
		preArray.desc = StaticStr.WC_DESC; // 备注
		preArray.spbill_create_ip = StaticStr.WC_IP; // 客户端ip
		// 取得xml请求数据体
		const formData = this.tool.object2Xml(preArray, WeiChatBaseConfig.merchantKey);
		// 向微信服务端请求支付
		const pfx = fs.readFileSync(path.join(__dirname, WeiChatBaseConfig.merchantCert));
		const agentOptions: AgentOptionsTy = { "pfx": pfx, "passphrase": WeiChatBaseConfig.mchid };
		const transferData: any = await this.httpService.tPost(WeiChatUrlBaseConfig.transfermoneyUrl, formData, agentOptions);
		// 判断是否是空
		if (transferData.successed === false) {
			throw new VerifyException(StaticStr.WC_ERR_MSG, 1000);
		}
		// 返回来的XML数据
                const reBodyXml = transferData.body.toString("uft-8");
                console.log(reBodyXml);
		// 取得return_code进行成功与否判断
		const reCode = this.tool.getXMLNodeValue("return_code", reBodyXml, false);
		const resultCode = this.tool.getXMLNodeValue("result_code", reBodyXml, false);
		if (reCode === "SUCCESS" && resultCode === "SUCCESS") {
			// 操作成功
			// return Promise.resolve({successed:true,orderno:orderno});
			return {"successed":true, "orderno": orderno };
		}
                const errorcode = this.tool.getXMLNodeValue("err_code", reBodyXml, false);
		throw new VerifyException(errorcode, 1000);
	}
	/**
	 * 微信公众号发送红包
	 * SenDredPack
	 * @param 企业红包对象
	 */
	public async sendredpack(senDredPack: SenDredPack) {
		const orderno = this.tool.createOrderno().toString();
		// 定义发送给微信请求body
		const redArray: RedArray = {};
		redArray.nonce_str = this.tool.createNonceStr(); // 随机字符串
		redArray.mch_billno = orderno; // 订单号
		redArray.mch_id = WeiChatBaseConfig.mchid; // 微信支付商户号
		redArray.wxappid = WeiChatBaseConfig.oaAppID; // appID,
		redArray.send_name = WeiChatBaseConfig.sendName; // 红包发送者姓名
		redArray.re_openid = senDredPack.reOpenid; // 接收者openID
		redArray.total_amount = senDredPack.totalAmount; // 付款金额，单位分
		redArray.total_num = WeiChatBaseConfig.totalNum; // 红包发送人数
		redArray.wishing = WeiChatBaseConfig.wishing; // 红包祝福语
		redArray.client_ip = StaticStr.WR_IP; // 客户端ip
		redArray.act_name = WeiChatBaseConfig.actName; // 活动名称
		redArray.remark = WeiChatBaseConfig.remark; // 红包发送人数
		// redArray.scene_id = WeiChatBaseConfig.sceneId; // 红包发送人数
		// 取得xml请求数据体
		const formData = this.tool.object2Xml(redArray, WeiChatBaseConfig.merchantKey);
		// 向微信服务端请求支付
		const pfx = fs.readFileSync(path.join(__dirname, WeiChatBaseConfig.merchantCert));
		const agentOptions: AgentOptionsTy = { "pfx": pfx, "passphrase": WeiChatBaseConfig.mchid };
		const transferData: any = await this.httpService.tPost(WeiChatUrlBaseConfig.senDredPackUrl, formData, agentOptions);
		// 判断是否是空
		if (transferData.successed === false) {
			throw new VerifyException(StaticStr.WC_ERR_MSG, 1000);
		}
		// 返回来的XML数据
                const reBodyXml = transferData.body.toString("uft-8");
                console.log(reBodyXml);
		// 取得return_code进行成功与否判断
		const reCode = this.tool.getXMLNodeValue("return_code", reBodyXml, false);
		const resultCode = this.tool.getXMLNodeValue("result_code", reBodyXml, false);
		if (reCode === "SUCCESS" && resultCode === "SUCCESS") {
			// 操作成功
			// return Promise.resolve({successed:true,orderno:orderno});
			return {"successed":true, "orderno": orderno };
		}
                const errorcode = this.tool.getXMLNodeValue("err_code", reBodyXml, false);
		throw new VerifyException(errorcode, 1000);
	}
}
