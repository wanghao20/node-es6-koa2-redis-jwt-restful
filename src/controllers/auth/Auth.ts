import { Context } from 'koa';
import jwt = require('jsonwebtoken');
import { JWT_SECRET } from '../../config/Constants';
import { AccountService } from '../../service/Auth';
import { post } from '../../decorator/httpMethod';
import { successData } from '../../utils/returnResult';
import { Validate } from '../../utils/ReqValidate';

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：登陆注册Controllers
 */
export default class AuthController {
  /**
   * 登录接口Controller
   * @param ctx koa中间件
   */
  @post('/login')
  public async login(ctx: Context) {

    // 验证
    Validate.user(ctx.request.body.username, ctx.request.body.password);
    const service = new AccountService();
    const user = await service.verifyPassword(ctx.request.body.username, ctx.request.body.password)
    // 设置10小时过期时间
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (600 * 60),
      data: { 'id': user.id }
    }, JWT_SECRET)
    return ctx.body = successData({ 'token': token, user })
  }
  /**
   * 注册接口Controller
   * @param ctx koa中间件
   */
  @post('/register')
  public async register(ctx: Context) {

    Validate.user(ctx.request.body.username, ctx.request.body.password);
    const service = new AccountService();
    const user = await service.insert(ctx.request.body.username, ctx.request.body.password)
    // 设置10小时过期时间
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (600 * 60),
      data: { 'id': user.id }
    }, JWT_SECRET)
    return ctx.body = successData({ 'token': token, user })
  }
}
