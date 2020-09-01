import { v4 as uuidv4 } from "uuid";

import jwt = require("jsonwebtoken");

import { getRepository } from "typeorm";

import { JWT_SECRET, JWT_EXP } from "../config/Constants";
import { KeyName } from "../config/RedisKeys";
import { StaticStr } from "../config/StaticStr";
import { MysqlDatabase } from "../dataBase/MysqlDatabase";
import { TokenConfig, Paging } from "../format/Type";
import { VerifyException } from "../utils/Exceptions";
import { redisDb1 } from "../utils/RedisTool";
import { BaseRole } from "../entity/mysql/auth/BaseRole";
import { BaseUser } from "../entity/mysql/auth/BaseUser";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：authService
 */
export class AccountService {
	/**
	 * 登录验证接口Service
	 * @param userName 用户名
	 * @param passWord 密码
	 */
    public async verifyPassword(userName: string, passWord: any) {
        //
        const userDao = getRepository(BaseUser);
        const user = await userDao.findOne({ "name": userName });
        if (user.name !== userName) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        // if (!(await     argon2 .verify(pwd, passWord))) { // todo argon2模块有问题,后面选择其他模块
        if (user.password !== passWord) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        const tconfig: TokenConfig = {
            "exp": Math.floor(Date.now() / 1000) + JWT_EXP,
            "data": { "id": user.id },
        };
        const token = jwt.sign(tconfig, JWT_SECRET);

        return { "accessToken": token, "id": user.id };
    }

    /**
     * 获取用户信息
     * @param name 用户名称
     */
    public async info(id: string) {
        const userDao = getRepository(BaseUser);
        const user: any = await userDao.findOne({ "id": id });
        user.roles = user.roles.split(",");

        return user;
    }
    /**
     * 获取权限和后台管理用户列表
     */
    public async users(paging: Paging) {
        // 验证权限
        const data = await MysqlDatabase.executeProc(
            `call proc_users(${paging.page},${paging.limit},"${paging.name}","${paging.roles}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 获取角色列表
     */
    public async roles() {
        // 验证权限
        const roleDao = getRepository(BaseRole);
        const data: any = await roleDao.find();

        return data;
    }

	/**
	 * 注册用户接口Service
	 * @param userName 用户名
	 * @param passWord 密码
	 */
    public async insert(userName: string, passWord: string) {
        const uid = uuidv4();
        // 保存到数据库
        redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + userName, "id", uid);
        redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + userName, "name", userName);
        redisDb1.hset(KeyName.HASH_OBJ_GAME_USERS + userName, "passWord", passWord);// todo 暂未加密,后面处理
        const tconfig: TokenConfig = {
            "exp": Math.floor(Date.now() / 1000) + JWT_EXP,
            "data": { "name": userName },
        };
        const token = jwt.sign(tconfig, JWT_SECRET);

        return { "id": uid, "name": userName, "token": token };
    }
}
