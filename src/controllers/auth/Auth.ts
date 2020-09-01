
import { Context } from "koa";

import { JWT_SECRET } from "../../config/Constants";
import { TokenConfig, Paging } from "../../format/Type";
import { AccountService } from "../../service/Auth";
import { Validate } from "../../utils/ReqValidate";
import { ReturnResult } from "../../utils/ReturnResult";
import { post, get } from "../../utils/decorator/httpMethod";

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
        Validate.user(ctx.params.username, ctx.params.password);
        const obj = await this.service.verifyPassword(ctx.params.username, ctx.params.password);

        return ctx.body = ReturnResult.successData(obj);
    }
    /**
     * 获取用户详情信息
     * @param ctx koa中间件
     */
    @post("/info")
    public async info(ctx: Context) {
        // 验证
        const user = await this.service.info(ctx.user.id);

        return ctx.body = ReturnResult.successData(user);
    }

	/**
     * 退出登录
     * @param ctx koa中间件
	 */
    @post("/logout")
    public async register(ctx: Context) {
        return ctx.body = ReturnResult.successData();
    }
    /**
     * 获取用户列表
     * @param ctx koa中间件
     */
    @get("/users")
    public async users(ctx: Context) {
        const paging: Paging = ctx.params;
        const users = await this.service.users(paging);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取用户列表
     * @param ctx koa中间件
     */
    @get("/roles")
    public async roles(ctx: Context) {
        const users = await this.service.roles();

        return ctx.body = ReturnResult.successData(users);
    }
}
