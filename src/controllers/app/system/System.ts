import { Context } from "koa";

import { SystemService } from "../../../service/System";
import { Validate } from "../../../utils/ReqValidate";
import { ReturnResult } from "../../../utils/ReturnResult";
import { get, put, post } from "../../../utils/decorator/httpMethod";
import { CltLog } from "../../../entity/CleLog";

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
	@get("/system_config")
	public async findConfig(ctx: Context) {
		const systemConfig = await this.service.findConfig();

		// 保存缓存
		return (ctx.body = ReturnResult.successData(systemConfig));
	}
	/**
	 * 查询玩家操作日志
	 * @param ctx koa中间件
	 */
	@get("/tbLog")
	public async tbLog(ctx: Context) {
                Validate.isFlexValid(ctx.request.query.name);
		const tbLogs = await this.service.tbLog(ctx.request.query.name);

		// 保存缓存
		return (ctx.body = ReturnResult.successData(tbLogs));
	}

	/**
	 * 修改玩家操作日志
	 * @param ctx koa中间件
	 */
	@put("/tbLog")
	public async setTbLogContent(ctx: Context) {
		Validate.isArray(ctx.request.body);
		await this.service.setTbLogContent(ctx.request.body);

		return (ctx.body = ReturnResult.successData());
        }
        /**
	 * 保存客户端操作日志
	 * @param ctx koa中间件
	 */
	@post("/cltLog")
	public async saveCltLog(ctx: Context) {
                const cltParam:CltLog=ctx.request.body;
                // 验证参数
		Validate.isId(cltParam.gameId);
		Validate.isId(cltParam.openId);
		Validate.isId(cltParam.evtId);
		Validate.isFlexValid(cltParam.p1);
		Validate.isFlexValid(cltParam.p2);
		await this.service.saveCltLog(cltParam);

		return (ctx.body = ReturnResult.successData());
        }

	/**
	 * 设置系统设置
	 * @param ctx koa中间件
	 */
	@put("/system_config")
	public async setConfig(ctx: Context) {
		Validate.isArray(ctx.request.body.fieldList);
		const systemConfig = await this.service.SetConfig(ctx.request.body.fieldList);

		return (ctx.body = ReturnResult.successData(systemConfig));
	}

	/**
	 * 查看用户活跃度
	 * @param ctx koa中间件
	 */
	@get("/find_user_act")
	public async findUserAct(ctx: Context) {
		Validate.isFlexValid(ctx.request.query.type);
		const data = await this.service.findUserAct(ctx.request.query.type);

		return (ctx.body = ReturnResult.successData(data));
	}
}
