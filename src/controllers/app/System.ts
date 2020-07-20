import { Context } from 'koa';
import { redisDb1 } from '../../utils/redisTool';
import { SystemService } from '../../service/System';
import { put, get } from '../../decorator/httpMethod';
import { KeyName } from '../../config/RedisKeys';
import { successData } from '../../utils/returnResult';
import { Validate } from '../../utils/ReqValidate';

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：全局配置Controllers
 */
export default class SystemController {
    /**
     * 查询系统设置
     * @param ctx koa中间件
     */
    @get('/system_config')
    public async findConfig(ctx: Context) {

        const service = new SystemService();
        const systemConfig = await service.findConfig()
        // 保存缓存
        return ctx.body = successData(systemConfig)
    }
    /**
     * 设置系统设置
     * @param ctx koa中间件
     */
    @put('/system_config')
    public async setConfig(ctx: Context) {

        Validate.isArray(ctx.request.body.fieldList);
        const service = new SystemService();
        const systemConfig = await service.SetConfig(ctx.request.body.fieldList)
        return ctx.body = successData(systemConfig)
    }


}