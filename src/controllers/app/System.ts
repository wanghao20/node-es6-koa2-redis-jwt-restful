import { Context } from 'koa';

import { get, put } from '../../decorator/httpMethod';
import { SystemService } from '../../service/System';
import { Validate } from '../../utils/ReqValidate';
import { successData } from '../../utils/returnResult';

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：全局配置Controllers
 */
export default class SystemController {
	/**
	 * 逻辑处理service类
	 */
	private readonly service: SystemService;

	constructor() {
		this.service = new SystemService();
	}

	/**
	 * 查询系统设置
	 * @param ctx koa中间件
	 */
	@get('/system_config')
	public async findConfig(ctx: Context) {
		const systemConfig = await this.service.findConfig();

		// 保存缓存
		return (ctx.body = successData(systemConfig));
	}

	/**
	 * 设置系统设置
	 * @param ctx koa中间件
	 */
	@put('/system_config')
	public async setConfig(ctx: Context) {
		Validate.isArray(ctx.request.body.fieldList);
		const systemConfig = await this.service.SetConfig(ctx.request.body.fieldList);

		return (ctx.body = successData(systemConfig));
	}
}
