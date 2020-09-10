/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： jwt加密使用的秘钥
 */
export const JWT_SECRET = "secret_2020-8-20";
/**
 * 用户密码加密密钥
 */
export const SECRET_KEY = "#2020/9/9_";
// 设置10小时过期时间
export const JWT_EXP: number = 600 * 60;// 过期时间
// 路由配置
export const ROUTER_MAP = Symbol("route_map");
/**
 * 生成验证码的配置
 */
export const svgCaptchaCfg = {
    "size": 4, // 验证码长度
    "width": 160,
    "height": 60,
    "fontSize": 50,
    "ignoreChars": "0oO1ilI", // 验证码字符中排除 0o1i
    "noise": 2, // 干扰线条的数量
    "color": true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    "background": "#eee" // 验证码图片背景颜色
};
/**
 * 发送邮件配置
 */
export const emailCfg = {
    "host": "smtp.qq.com", // qq邮箱主机
    "secure": true, // 使用 SSL
    "secureConnection": true, // 使用 SSL
    "port": 465, // SMTP 端口
    "auth": {
        "user": "2319512282@qq.com", // generated ethereal user
        "pass": "lthausfgbkdbdjjf", // generated ethereal password
    },
};
export const sendMailCfg = (email: string, code: string) => {
    return {
        "from": `"DF ?" <2319512282@qq.com>"`, // 发送方
        "to": email, // 接收方
        "subject": "DF", // Subject line
        "text": "找回密码时使用", // plain text body
        "html": "<b>code:" + code + "</b>", // html body
    };
};
