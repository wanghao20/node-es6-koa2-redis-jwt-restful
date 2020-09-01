
/**
 * 获取限流配置
 * @param id  对比请求(可设置为用户id)
 * @param redis // 内存或Redis [redis] 实例
 * @desc：限流工具类
 * 文档:https://github.com/koajs/ratelimit
 */
export const getLimiterConfig = (id: any, redis: any) => {
    // 定义返回体
    const body = {
        "status": 200,
        "data": {
            "code": 429,
            "msg": "操作失败!,请求次数过快!"
        },
    };

    return {
        "driver": "redis",// 内存或Redis [redis]
        "db": redis, // Redis连接实例或Map实例（内存）
        "duration": 3000, // 限制的毫秒数[默认3600000]
        "errorMessage": body,
        "id": id,// 对比请求(可设置为用户id)
        "headers": { // 返回请求头设置
            "Retry-After": "10000",
            "reset": "Limit",
            "total": "Limit"
        },
        "max": 10, // 持续时间内的最大请求数[默认2500]
        "disableHeader": false,
        "whitelist": (ctx: any) => { // 如果函数返回true，则中间件在限制之前退出
            // 白名单配置
            // return true
        },
        "blacklist": (ctx: any) => { // 如果函数返回true，则抛出403错误
            // 黑名单配置
            // return true
        }
    };
};
