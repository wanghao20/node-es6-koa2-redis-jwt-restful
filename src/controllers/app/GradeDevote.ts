import { Context } from "koa";

import { DrawReward } from "../../format/Type";
import { GradeDevoteService } from "../../service/GradeDevote";
import { Validate } from "../../utils/ReqValidate";
import { ReturnResult } from "../../utils/ReturnResult";
import { get, put } from "../../utils/decorator/httpMethod";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：等级贡献Controllers
 */
export default class GradeDevoteController {
	/**
	 * 逻辑处理service类
	 */
	private readonly service: GradeDevoteService;

	constructor() {
		this.service = new GradeDevoteService();
	}

	/**
	 * 查询等级贡献配置信息
	 * @param ctx koa中间件
	 */
	@get("/grade_devote")
	public async findConfig(ctx: Context) {
		const gradeDevoteList = await this.service.findConfig();

		return (ctx.body = ReturnResult.successData(gradeDevoteList));
	}
	/**
	 * 领取奖励
	 * @param ctx koa中间件
	 */
	@put("/draw_reward")
	public async drawReward(ctx: Context) {
                // 验证
		Validate.isId(ctx.request.body.uid);
		Validate.isObj(ctx.request.body.data);
		const drawReward: DrawReward = ctx.request.body.data;
		drawReward.uid = ctx.request.body.uid;
		Validate.isNumber(drawReward.devote);
		Validate.isNumber(drawReward.grade);
                const state = await this.service.drawReward(drawReward);

		return (ctx.body = ReturnResult.successData(state));
	}
}
