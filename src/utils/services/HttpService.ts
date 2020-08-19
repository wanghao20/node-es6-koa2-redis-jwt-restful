// const soap = require('soap');
const request = require("request");

/**
 * Created by wh on 2020/7/23
 * author: wanghao
 * @desc：
 * http 请求封装类
 */
export class HttpService {
	/**
	 * 微信企业转账发起
	 * @param url
	 * @param body
	 * @returns {Observable<Response>}
	 */
    public async tPost(url: string, formData: any, agentOptions: any) {
        return new Promise(function (resolve, reject) {
            const opts = {
                "url": url,
                "method": "POST",
                "body": formData,
                "agentOptions": agentOptions,
            };
            request(opts, function (error: any, response: any, body: any) {
                if (error) {
                    return reject({ "successed": false, "error": error });
                }
                resolve({ "successed": true, "response": response, "body": body });
            });
        });
    }
	/**
	 * get，请求数据
	 * @param url
	 */
    public async get(url: string) {
        return new Promise(function (resolve, reject) {
            request.get({ "url": url }, function (error: any, response: any, body: any) {
                if (error) {
                    return reject({ "successed": false, "error": error });
                }
                resolve({ "successed": true, "response": response, "body": body });
            });
        });
    }
}
