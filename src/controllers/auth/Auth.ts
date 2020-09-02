
import { Context } from "koa";

import { JWT_SECRET } from "../../config/Constants";
import { TokenConfig, Paging } from "../../format/Type";
import { AccountService } from "../../service/Auth";
import { Validate } from "../../utils/ReqValidate";
import { ReturnResult } from "../../utils/ReturnResult";
import { post, get, put } from "../../utils/decorator/httpMethod";
import { BaseUser } from "../../entity/mysql/auth/BaseUser";

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
        Validate.isFlexValid(ctx.params.captchaCode);
        Validate.isFlexValid(ctx.params.time);
        const obj = await this.service.verifyPassword(ctx.params.username, ctx.params.password,ctx.params.captchaCode,ctx.params.time);

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
        Validate.verifyAuth(ctx.user.roles, "auth/users");
        const paging: Paging = ctx.params;
        const users = await this.service.users(paging);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取角色列表
     * @param ctx koa中间件
     */
    @get("/roles")
    public async roles(ctx: Context) {
        Validate.verifyAuth(ctx.user.roles, "auth/roles");
        const users = await this.service.roles();

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 修改用户信息
     * @param ctx koa中间件
     */
    @put("/update")
    public async update(ctx: Context) {
        Validate.verifyAuth(ctx.user.roles, "auth/update");
        const user: BaseUser = ctx.params;
        Validate.user(user.name, user.password);
        const users = await this.service.update(user);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 创建用户信息
     * @param ctx koa中间件
     */
    @post("/create")
    public async create(ctx: Context) {
        Validate.verifyAuth(ctx.user.roles, "auth/create");
        const user: BaseUser = ctx.params;
        Validate.user(user.name, user.password);
        Validate.isFlexValid(user.roles);
        const users = await this.service.create(user);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 注册
     * @param ctx koa中间件
     */
    @post("/insert")
    public async insert(ctx: Context) {
        const user: BaseUser = ctx.params;
        Validate.user(user.name, user.password);
        Validate.isEmail(user.email);
        const users = await this.service.insert(user);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 删除用户信息
     * @param ctx koa中间件
     */
    @put("/delect")
    public async delect(ctx: Context) {
        Validate.verifyAuth(ctx.user.roles, "auth/delect");
        const user: BaseUser = ctx.params;
        Validate.isId(user.id);
        const data = await this.service.delect(user);

        return ctx.body = ReturnResult.successData(data);
    }
    /**
     * 获取验证码图片
     * @param ctx koa中间件
     */
    @get("/captchaCode")
    public async captchaCode(ctx: Context) {
        Validate.isFlexValid(ctx.params.time);
        const data = await this.service.captchaCode(ctx.params.time);
        ctx.type = "html";
        // 设置响应头
        ctx.response.type = "image/svg+xml";

        return ctx.body = data;

    }
    /**
     * 验证Email验证码
     * @param ctx koa中间件
     */
    @post("/validEmailCode")
    public async validEmailCode(ctx: Context) {
        Validate.isEmail(ctx.params.email);
        Validate.isFlexValid(ctx.params.code);
        Validate.isFlexValid(ctx.params.password);
        const data = await this.service.validEmailCode(ctx.params.email,ctx.params.code,ctx.params.password);

        return ctx.body = ReturnResult.successData(data);

    }
    /**
     * 获取Email验证码
     * @param ctx koa中间件
     */
    @get("/getEmailCode")
    public async getEmailCode(ctx: Context) {
        Validate.isEmail(ctx.params.email);
        await this.service.getEmailCode(ctx.params.email);

        return ctx.body = ReturnResult.successData();

    }
}
