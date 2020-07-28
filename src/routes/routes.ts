import Router = require("@koa/router");
import fs = require("fs");
import path = require("path");
import { resolve } from "path";
import "reflect-metadata";
import { ROUTER_MAP } from "../config/Constants";
import { RouteMeta } from "../config/Type";
const ctrPath = resolve(__dirname, "../controllers");
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：路由扫描自动添加,路径=controllers下文件夹名+ts文件内方法注解配置名
 */
const addRouter = (router: any) => {
	// 扫描controller文件夹，收集所有controller
	fs.readdirSync(ctrPath).forEach((derName) => {
		// 拿到文件名
		const folderName = path.join(ctrPath, derName);
		fs.readdirSync(folderName).forEach((name) => {
			if (/^[^.]+\.ts$/.test(name)) {
				// console.log(roName+derName)
				binding(require(path.join(folderName, name)).default, derName);
			}
		});
	});
	/**
	 * 结合meta数据添加路由
	 * @param m 方法
	 * @param derName 文件名
	 */
	// tslint:disable-next-line:completed-docs
	function binding(m: ObjectConstructor, derName: string) {
		const routerMap: RouteMeta[] = Reflect.getMetadata(ROUTER_MAP, m, "method") || [];
		if (routerMap.length) {
			const ctr: any = new m();
			routerMap.forEach((route) => {
				// const { name, method, path } = route;
				const path: string = "/" + derName + route.path;
				const name: string = route.name;
				const method: string = route.method;
				const obj: string = ctr[name].bind(ctr);
				// router[method](path, ctr[name].bind(ctr));
				router[method](path, obj);
			});
		}
	}
};

export { addRouter };
