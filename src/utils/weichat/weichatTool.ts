import { DateFormat } from "../DateFormat";
import { redisDb1 } from "../RedisTool";
import { KeyName } from "../../config/RedisKeys";
import { WeiChatBaseConfig } from "../../config/weichat/Config";
import { WeiChatUrlBaseConfig } from "../../config/weichat/UrlBase";

/**
 * Created by wh on 2020/7/24
 * author: wanghao
 * @desc：微信操作tool
 */
export class WeChatTool {
	/**
	 * 微信授权操作对象
	 */
	public client: any;
	constructor() {
		// tslint:disable-next-line:variable-name
		const OAuth = require("wechat-oauth");
		this.client = new OAuth(WeiChatBaseConfig.appID, WeiChatBaseConfig.appSecret);
	}
	/**
	 * 获取实例的配置信息
	 * @param appid appid
	 */
	public async getAppInfo(appid: string) {
		const appinfo = await this.getAppInfoSetting(appid);

		return appinfo;
	}
	/**
	 * 生成引导用户点击的URL。
	 */
	public async getAuthorizeURL() {
		// 手机页面
		// const url = this.client.getAuthorizeURL(WeiChatUrlBaseConfig.returnUri, "state", StaticStr.SNSAPI);
		// 电脑页面
		const url = this.client.getAuthorizeURLForWebsite(WeiChatUrlBaseConfig.returnUri);

		return url;
	}
	/**
	 *  根据不同的AppCode获取对应的Id和Key
	 */
	public async getAppInfoSetting(appid: string) {
		/// 如果没有code则返回默认的app设置信息
		/// 如果配置文件中没有多小程序配置节，返回默认的
		/// 或者多配置中没有配置对应的appcode
		if (appid == null) {
			return null;
		}
		/// 先查看redis缓存中是否有该appid的相关信息
		const appInfo = redisDb1.hgetall(KeyName.HASH_OBJ_APPINFO(appid));
		if (appInfo) {
			return appInfo;
		}
		/// 从数据库里面拿
	}

	/**
	 * 取得微信端返回来的xml标签里的value
	 * @param node_name
	 * @param xml
	 * @param flag
	 */
	public getXMLNodeValue(nodeName: string, xml: string, flag = false) {
		let reNodeValue = "";
		const tmp = xml.split("<" + nodeName + ">");
		if (tmp) {
			const tmp1 = tmp[1].split("</" + nodeName + ">")[0];
			if (!flag) {
				const tmp2 = tmp1.split("[");
				reNodeValue = tmp2[2].split("]")[0];
			} else {
				reNodeValue = tmp1;
			}
		}

		return reNodeValue;
	}
	/**
	 * object-->string
	 * @param args 参数
	 */
	public object2raw(args: { [x: string]: any }) {
		let keys = Object.keys(args);
		keys = keys.sort();
		const newArgs: any[] = [];
		keys.forEach(function (key: any) {
			newArgs[key] = args[key];
		});
		let string = "";
		for (const k in newArgs) {
			string += "&" + k + "=" + newArgs[k];
		}
		string = string.substr(1);

		return string;
	}
	/**
	 * 取得签名加密字符串
	 * @param data
	 * @param merchantKey
	 */
	public sign(data: { [x: string]: string }, merchantKey: string) {
		let string = this.object2raw(data);
		string = string + "&key=" + merchantKey;
		const crypto = require("crypto");
		const sign = crypto.createHash("md5").update(string, "utf8").digest("hex");

		return sign.toUpperCase();
	}
	/**
	 * object - > XML
	 * @param array
	 * @param apikey
	 */
	public object2Xml(array: { [x: string]: string }, apikey: any) {
		const keys = Object.keys(array);
		let xmlData = "<xml>";
		keys.forEach(function (key) {
			xmlData += "<" + key + ">" + array[key] + "</" + key + ">";
		});

		// 取得签名加密字符串
		const paySign = this.sign(array, apikey);
		xmlData += "<sign>" + paySign + "</sign>";
		xmlData += "</xml>";
		// console.log('xml data ===', _xmlData);

		return xmlData;
	}
	/**
	 * 随机字符串产生函数
	 */
	public createNonceStr() {
		return Math.random().toString(36).substr(2, 15);
	}
	/**
	 * 时间戳产生函数
	 */
	public createTimeStamp() {
		return new Date().getTime() / 1000;
	}

	/**
	 * 生成商家订单号
	 * 这里默认使用年月日+10位随机数生成
	 * 实际开发中可从数据库中查询最大值
	 * 使用数值叠加方法确定唯一性
	 */
	public createOrderno() {
		return DateFormat.dateFormat(new Date().getTime(), "YYYYMMDD") + Math.random().toString().substr(2, 10);
	}
}
