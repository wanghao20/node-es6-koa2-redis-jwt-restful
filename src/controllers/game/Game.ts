
import { Context } from "koa";

import {  Paging } from "../../format/Type";
import { GameService } from "../../service/Game";
import { Validate } from "../../utils/ReqValidate";
import { ReturnResult } from "../../utils/ReturnResult";
import { post, get, put, del } from "../../utils/decorator/httpMethod";
import { BaseGame } from "../../entity/mysql/game/Game";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：游戏Controllers
 */
export default class GameController {
	/**
	 * 逻辑处理service类
	 */
    private readonly service: GameService;

    constructor() {
        this.service = new GameService();
    }

    /**
     * 获取游戏列表
     * @param ctx koa中间件
     */
    @get("/game")
    public async games(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "game");
        const paging: Paging = ctx.params;
        paging.condition=JSON.parse(paging.condition);
        const users = await this.service.game(paging);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 新增
     * @param ctx koa中间件
     */
    @post("/game")
    public async createBaseGame(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "game");
        const game: BaseGame = ctx.params;
        game.createdBy=ctx.user.id;
        const users = await this.service.createBaseGame(game);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 删除
     * @param ctx koa中间件
     */
    @del("/game")
    public async delectBaseGame(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "game");
        const game: BaseGame = ctx.params;
        game.updatedBy=ctx.user.id;
        const users = await this.service.delectBaseGame(game);

        return ctx.body = ReturnResult.successData(users);
    }
    /**
     * 修改
     * @param ctx koa中间件
     */
    @put("/game")
    public async updateBaseGame(ctx: Context) {
        await Validate.verifyAuth(ctx.user.roles, "game");
        const game: BaseGame = ctx.params;
        game.updatedBy=ctx.user.id;
        const users = await this.service.updateBaseGame(game);

        return ctx.body = ReturnResult.successData(users);
    }
}
