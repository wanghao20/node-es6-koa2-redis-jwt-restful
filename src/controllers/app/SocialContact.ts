import { Context } from "koa";

import { SocialContactService } from "../../service/SocialContact";
import { Validate } from "../../utils/ReqValidate";
import { successData } from "../../utils/returnResult";
import { get, post } from "../../utils/decorator/httpMethod";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：征战主页Controllers
 */
export default class SocialContactController {
	/**
	 * 逻辑处理service类
	 */
	private readonly service: SocialContactService;

	constructor() {
		this.service = new SocialContactService();
	}

	/**
	 * 获取用户盟友列表
	 * @param ctx koa中间件
	 */
	@get("/army")
	public async armyList(ctx: Context) {
		Validate.isId(ctx.request.query.uid);
		const armyList = await this.service.armyList(ctx.request.query.uid);

		return (ctx.body = successData(armyList));
	}

	/**
	 * 出征列表
	 * @param ctx koa
	 */
	@get("/expeditions")
	public async expeditionsList(ctx: Context) {
		Validate.isId(ctx.request.query.uid);
		const expeditionsList = await this.service.expeditionsList(ctx.request.query.uid);

		return (ctx.body = successData(expeditionsList));
	}

	/**
	 * 攻打
	 * @param ctx koa
	 */
	@post("/attack")
	public async attack(ctx: Context) {
		Validate.isId(ctx.request.body.uid);
		Validate.isObj(ctx.request.body.beuser);
		const obj = await this.service.attack(ctx.request.body.uid, ctx.request.body.beuser);

		return (ctx.body = successData(obj));
	}
}
