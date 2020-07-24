import { Context } from 'koa';

import { get, post } from '../../decorator/httpMethod';
import { RedRewardService } from '../../service/RedReward';
import { Validate } from '../../utils/ReqValidate';
import { successData } from '../../utils/returnResult';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：红包Controller
 */
export default class RedRewardController {
	/**
	 * 逻辑处理service类
	 */
	private readonly service: RedRewardService;

	constructor() {
		this.service = new RedRewardService();
	}

	/**
	 * 通过userID查询红包
	 * @param ctx koa中间件
	 */
	@get('/red_envelope')
	public async findRedRewardList(ctx: Context) {
		Validate.isId(ctx.request.query.uid);
		const redRewardList = await this.service.findRedRewardList(ctx.request.query.uid);

		return (ctx.body = successData(redRewardList));
	}

	/**
	 * 通过userID查询红包
	 * @param ctx koa中间件
	 */
	@get('/red_envelope_record')
	public async findredEnvelopeRecordList(ctx: Context) {
		Validate.isId(ctx.request.query.uid);
		const redRewardList = await this.service.findredEnvelopeRecordList(ctx.request.query.uid);

		return (ctx.body = successData(redRewardList));
	}

	/**
	 * 领取红包
	 * @param ctx koa中间件
	 */
	@post('/get_red_envelope')
	public async getRedEnvelope(ctx: Context) {
		// Validate.isId(ctx.request.body.uid);
		Validate.isId(ctx.request.body.rid);
		const obj = await this.service.getRedEnvelope(ctx.request.body.uid, ctx.request.body.rid);

		return (ctx.body = successData(obj));
	}
}
