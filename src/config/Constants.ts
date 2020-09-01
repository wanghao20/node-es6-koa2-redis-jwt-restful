/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： jwt加密使用的秘钥
 */
export const JWT_SECRET = "secret_2020-8-20";
// 设置10小时过期时间
export const JWT_EXP: number = 600 * 60;// 过期时间
// 路由配置
export const ROUTER_MAP = Symbol("route_map");
