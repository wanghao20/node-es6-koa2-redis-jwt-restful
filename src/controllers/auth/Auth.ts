
import { Context } from "koa";

import { Paging } from "../../format/Type";
import { AccountService } from "../../service/Auth";
import { Validate } from "../../utils/ReqValidate";
import { ReturnResult } from "../../utils/ReturnResult";
import { post, get, put, del } from "../../utils/decorator/httpMethod";
import { BaseMod } from "../../entity/mysql/auth/BaseMod";
import { BaseRole } from "../../entity/mysql/auth/BaseRole";
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
        const obj = await this.service.verifyPassword(ctx.params.username, ctx.params.password, ctx.params.captchaCode, ctx.params.time);

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
    @get("/user")
    public async users(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "user");
        const paging: Paging = ctx.params;
        paging.condition = JSON.parse(paging.condition);
        const users = await this.service.users(paging);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 修改用户信息
     * @param ctx koa中间件
     */
    @put("/user")
    public async update(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "user");
        const user: BaseUser = ctx.params;
        user.updatedBy = ctx.user.id;
        Validate.user(user.name, user.password);
        const users = await this.service.update(user);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 创建用户信息
     * @param ctx koa中间件
     */
    @post("/user")
    public async create(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "user");
        const user: BaseUser = ctx.params;
        user.createdBy = ctx.user.id;
        Validate.user(user.name, user.password);
        Validate.isFlexValid(user.roles);
        Validate.isEmail(user.email);
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
    @del("/user")
    public async delect(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "user");
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
        const data = await this.service.validEmailCode(ctx.params.email, ctx.params.code, ctx.params.password);

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
    /**
     * 创建模块
     * @param ctx koa中间件
     */
    @post("/Mod")
    public async createMod(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "Mod");
        const mod: BaseMod = ctx.params;
        mod.createdBy = ctx.user.id;
        Validate.isId(mod.pId);
        Validate.isFlexValid(mod.pName);
        Validate.isFlexValid(mod.component);
        Validate.isFlexValid(mod.label);
        Validate.isFlexValid(mod.modPath);
        Validate.isFlexValid(mod.modtTitle);
        const data = await this.service.createMod(mod);

        return ctx.body = ReturnResult.successData(data);

    }
    /**
    * 修改模块信息
    * @param ctx koa中间件
    */
    @put("/Mod")
    public async updateMod(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "Mod");
        const mod: BaseMod = ctx.params;
        mod.updatedBy = ctx.user.id;
        const users = await this.service.updateMod(mod);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 查询模块
     * @param ctx koa中间件
     */
    @get("/Mod")
    public async getMod(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "Mod");
        const data = await this.service.getMod();

        return ctx.body = ReturnResult.successData(data);

    }
    /**
     * 查询模块
     * @param ctx koa中间件
     */
    @del("/Mod")
    public async deleteMod(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "Mod");
        const mod: BaseMod = ctx.params;
        Validate.isId(mod.id);
        const data = await this.service.deleteMod(mod);

        return ctx.body = ReturnResult.successData(data);

    }
    /**
     * 获取角色列表
     * @param ctx koa中间件
     */
    @get("/role")
    public async roles(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "role");
        const users = await this.service.roles();

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取角色页面
     * @param ctx koa中间件
     */
    @get("/rolePage")
    public async rolesPage(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "role");
        const paging: Paging = ctx.params;
        paging.condition = JSON.parse(paging.condition);
        const users = await this.service.rolesPage(paging);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 创建角色列表
     * @param ctx koa中间件
     */
    @post("/role")
    public async createRole(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "role");
        const role: BaseRole = ctx.params;
        role.createdBy = ctx.user.id;
        const users = await this.service.createRole(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 删除角色列表
     * @param ctx koa中间件
     */
    @del("/role")
    public async delectRole(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "role");
        const role: BaseRole = ctx.params;
        const users = await this.service.delectRole(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 修改角色列表
     * @param ctx koa中间件
     */
    @put("/role")
    public async updateRole(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "role");
        const role: BaseRole = ctx.params;
        role.updatedBy = ctx.user.id;
        const users = await this.service.updateRole(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取角色详情模块列表
     * @param ctx koa中间件
     */
    @get("/roleMods")
    public async roleMods(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "role");
        const role: BaseRole = ctx.params;
        Validate.isId(role.id);
        const users = await this.service.roleMods(role);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 获取系统操作日志
     * @param ctx koa中间件
     */
    @get("/systemLog")
    public async systemLog(ctx: Context) {
        const paging: Paging = ctx.params;
        Validate.isNumber(paging.page);
        paging.condition = JSON.parse(paging.condition);
        const users = await this.service.systemLog(paging);

        return ctx.body = ReturnResult.successData(users);
    }
}
