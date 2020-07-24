import request = require('request');
import fs = require('fs');
import rpc = require('../../utils/services/HttpService');
import path = require('path');
import { Context } from 'koa';
import { WeChatTool } from '../../utils/weichat/weichatTool';
import { WeiChatUrlBaseConfig } from '../../config/weichat/UrlBase';
import { WeiChatBaseConfig } from '../../config/weichat/Config';
import { EnAccountTransfer } from '../../config/Type';

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
		const appID = `wx8412200229d851b7`;
		const appSecret = `18432562d996fa8fc41647e482bee039`;
		const returnUri = encodeURI(`http://148.70.34.67:8080/api/base/getIndex`);
		const { request: req, response: res } = ctx;
		// 第一步：用户同意授权，获取code
		const scope = 'snsapi_base';
		// snsapi_userinfo可以获取用户信息与token与openid
		// snsapi_base只能获取到token与openid
		res.redirect(
			'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
				WeiChatBaseConfig.appID +
				'&redirect_uri=' +
				returnUri +
				'&response_type=code&scope=' +
				scope +
				'&state=123456#wechat_redirect'
		);
	}

	/**
         *第二步骤
         获取access_token
         获取用户信息
	 * @param ctx koa中间件
	 */
	public async token(code: string) {
		// 第二步：通过code换取网页授权access_token
		const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${WeiChatBaseConfig.appID}&secret=${WeiChatBaseConfig.appSecret}&code=${code}&grant_type=authorization_code`;
		const response: any = await rpc.HttpService.get(url);
		if (response.successed) {
			// 第三步：拉取用户信息(需scope为 snsapi_userinfo)
			console.log(JSON.parse(response.body));
			const data = JSON.parse(response.body);
			const access_token = data.access_token;
			const openid = data.openid;
			const userUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=?access_token=${access_token}&openid=${openid}&code=${code}&&lang=zh_CN`;
			const userResponse: any = await rpc.HttpService.get(userUrl);
			if (userResponse.successed) {
				// 第四步：根据获取的用户信息进行对应操作
				const userinfo = JSON.parse(userResponse.body);
				console.log(JSON.parse(userResponse.body));
				console.log('获取微信信息成功！');
				// 小测试，实际应用中，可以由此创建一个帐户
				//       res.send('\
				//             <h1>' + userinfo.nickname + " 的个人信息</h1>\
				//             <p><img src='" + userinfo.headimgurl + "' /></p>\
				//             <p>" + userinfo.city + '，' + userinfo.province + '，' + userinfo.country + '</p>\
				//         ');
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
		const appInfo = await this.tool.getAppInfo(enAccountTransfer.appid); // getAppInfoSetting(req.body.appCode);
		const preArray = {
			"mch_appid": appInfo.appId, // this.config.appID,
			"mchid": appInfo.wxmerchantId, // this.config.mch_id, //微信支付商户号
			"nonce_str": this.tool.createNonceStr(),
			"partner_trade_no": enAccountTransfer.orderno, // 订单号
			"openid": enAccountTransfer.openid || '',
			"check_name": 'NO_CHECK',
			"amount": enAccountTransfer.amount,
			"desc": '用户提现',
			"spbill_create_ip": '127.0.0.1', // 客户端ip
		};

		// 取得xml请求数据体
		const formData = this.tool.object2Xml(preArray, appInfo.wxmerchantKey);
		// 向微信服务端请求支付
		const pfx = fs.readFileSync(path.join(__dirname, '../../cert/' + appInfo.wxmerchantCert));
		const agentOptions = { "pfx": pfx, "passphrase": appInfo.wxmerchantId };
		const transferData: any = await rpc.HttpService.tPost(WeiChatUrlBaseConfig.transfermoneyUrl, formData, agentOptions);
		// test
		if (transferData.successed === false) {
			return { "successed": false, "orderno": enAccountTransfer.orderno, "errorcode": 1000 };
		}
		// 返回来的XML数据
		const reBodyXml = transferData.body.toString('uft-8');
		// console.log('return xml data ==', _reBodyXml);
		// 取得return_code进行成功与否判断
		const reCode = this.tool.getXMLNodeValue('return_code', reBodyXml, false);
		const resultCode = this.tool.getXMLNodeValue('result_code', reBodyXml, false);
		if (reCode === 'SUCCESS' && resultCode === 'SUCCESS') {
			// return Promise.resolve({successed:true,orderno:orderno});
			return { "successed": true, "orderno": enAccountTransfer.orderno };
		}
		const errorcode = this.tool.getXMLNodeValue('err_code', reBodyXml, false);
		const obj = { "successed": false, "orderno": enAccountTransfer.orderno, "errorcode": errorcode };

		return obj;
	}
}
