import jwt = require("jsonwebtoken");

import { Context } from "koa";

import { JWT_SECRET } from "../../config/Constants";
import { TokenConfig } from "../../format/Type";
import { AccountService } from "../../service/Auth";
import { Validate } from "../../utils/ReqValidate";
import { ReturnResult } from "../../utils/ReturnResult";
import { post } from "../../utils/decorator/httpMethod";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：登陆注册Controllers
 */
export default class AuthController {
	/**
	 * 逻辑处理service类
	 */
    private readonly service: AccountService;

    constructor() {
        this.service = new AccountService();
    }

	/**
	 * 登录接口Controller
	 * @param ctx koa中间件
	 */
    @post("/login")
    public async login(ctx: Context) {
        // 验证
        Validate.user(ctx.request.body.username, ctx.request.body.password);
        const user = await this.service.verifyPassword(ctx.request.body.username, ctx.request.body.password);
        // 设置10小时过期时间
        const tconfig: TokenConfig = {
            "exp": Math.floor(Date.now() / 1000) + 600 * 60,
            "data": { "id": user.id },
        };
        const token = jwt.sign(tconfig, JWT_SECRET);

        return (ctx.body = ReturnResult.successData({ "token": token, user }));
    }

	/**
	 * 注册接口Controller
	 * @param ctx koa中间件
	 */
    @post("/register")
    public async register(ctx: Context) {
        Validate.user(ctx.request.body.username, ctx.request.body.password);
        const user = await this.service.insert(ctx.request.body.username, ctx.request.body.password);
        // 设置10小时过期时间
        const tconfig: TokenConfig = {
            "exp": Math.floor(Date.now() / 1000) + 600 * 60,
            "data": { "id": user.id },
        };
        const token = jwt.sign(tconfig, JWT_SECRET);

        return (ctx.body = ReturnResult.successData({ "token": token, user }));
    }
}
