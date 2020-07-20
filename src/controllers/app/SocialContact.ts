import { Context } from 'koa';
import { get, post } from '../../decorator/httpMethod';
import { SocialContactService } from '../../service/SocialContact';
import { successData } from '../../utils/returnResult';
import { Validate } from '../../utils/ReqValidate';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：征战主页Controllers
 */
export default class SocialContactController {
    /**
     * 获取用户盟友列表
     * @param ctx koa中间件
     */
    @get('/army')
    public async armyList(ctx: Context) {

        Validate.isId(ctx.request.query.uid);
        const service = new SocialContactService();
        const armyList = await service.armyList(ctx.request.query.uid);
        return ctx.body = successData(armyList)
    }

    /**
     * 出征列表
     * @param ctx koa
     */
    @get('/expeditions')
    public async expeditionsList(ctx: Context) {

        Validate.isId(ctx.request.query.uid);
        const service = new SocialContactService();
        const expeditionsList = await service.expeditionsList(ctx.request.query.uid);
        return ctx.body = successData(expeditionsList)
    }
    /**
     * 攻打
     * @param ctx koa
     */
    @post('/attack')
    public async attack(ctx: Context) {

        Validate.isId(ctx.request.body.uid);
        Validate.isObj(ctx.request.body.beuser);
        const service = new SocialContactService();
        const obj = await service.attack(ctx.request.body.uid, ctx.request.body.beuser);
        return ctx.body = successData(obj)
    }
}