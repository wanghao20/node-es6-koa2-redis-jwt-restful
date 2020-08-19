import "reflect-metadata";

import { ROUTER_MAP } from "../../config/Constants";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc 生成 http method 装饰器
 * @param {string} method - http method，如 get、post、head
 * @return Decorator - 装饰器
 */
// tslint:disable-next-line:only-arrow-functions
function createMethodDecorator(method: string) {
    // 装饰器接收路由 path 作为参数
    // tslint:disable-next-line:only-arrow-functions
    return function httpMethodDecorator(path: string, isVerify?: boolean) {
        return (proto: any, name: string) => {
            const target = proto.constructor;
            const routeMap = Reflect.getMetadata(ROUTER_MAP, target, "method") || [];
            routeMap.push({ name, method, path, "isVerify": !!isVerify });
            Reflect.defineMetadata(ROUTER_MAP, routeMap, target, "method");
        };
    };
}

// 导出 http method 装饰器
/**
 * POST动词最常用于创建**新资源
 */
export const post = createMethodDecorator("post");

/**
 *  GET方法用于**读取（或检索）资源的表示
 */
export const get = createMethodDecorator("get");
/**
 * DELETE用于**删除由URI标识的资源。
 */
export const del = createMethodDecorator("del");
/**
 * PUT最常用于更新功能，
 */
export const put = createMethodDecorator("put");
/**
 * 是对 PUT 方法的补充，用来对已知资源进行局部更新 。
 */
export const patch = createMethodDecorator("patch");
/**
 * options询问支持的方法
 */
export const options = createMethodDecorator("options");
/**
 * HEAD：获取报文首部
 * 与GET类似，只是不返回报文主体部分。一般用于确认URI的有效性以及资源的更新日期时间等。
 */
export const head = createMethodDecorator("head");

export const all = createMethodDecorator("all");
