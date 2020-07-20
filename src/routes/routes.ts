
import Router = require('@koa/router');
import fs = require('fs');
import 'reflect-metadata'
import { RouteMeta } from '../config/Type';
import path = require('path');
import { ROUTER_MAP } from '../config/Constants';
import { resolve } from 'path';
const ctrPath = resolve(__dirname, '../controllers');
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：路由扫描自动添加,路径=controllers下文件夹名+ts文件内方法注解配置名
 */
// tslint:disable-next-line:no-shadowed-variable
const addRouter = (router: Router) => {
    // 扫描controller文件夹，收集所有controller
    fs.readdirSync(ctrPath).forEach(derName => {
        // 拿到文件名
        const folderName = path.join(ctrPath, derName);
        fs.readdirSync(folderName).forEach(name => {
            if (/^[^.]+\.ts$/.test(name)) {
                // console.log(roName+derName)
                binding(require(path.join(folderName, name)).default, derName)
            }
        });
    });
    // 结合meta数据添加路由
    function binding(m, derName) {
        const routerMap: RouteMeta[] = Reflect.getMetadata(ROUTER_MAP, m, 'method') || [];
        if (routerMap.length) {
            const ctr = new m();
            routerMap.forEach(route => {
                route.path = '/' + derName + route.path
                // tslint:disable-next-line:no-shadowed-variable
                const { name, method, path } = route;
                router[method](path, ctr[name]);
            })
        }
    }
}



export { addRouter };
