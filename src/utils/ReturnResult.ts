
import { ResData } from "../config/Type";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 返回结果处理
 */

/**
 * 请求成功返回结果
 * @param _data 返回数据体
 */
const successData = (_data?: any) => {
    const obj: ResData = { code: 200, msg: '操作成功!', data: _data || '' };
    return obj;
}


/**
 * 失败返回结果
 * @param _msg 返回的消息
 * @param _code code
 */
const errorMsg = (_msg?, _code?) => {
    const obj: ResData =  { code: _code || 302, msg: _msg || '服务器错误!' }
    return obj;
}

// tslint:disable-next-line:no-unused-expression
export { successData, errorMsg };
