import { v4 as uuidv4 } from "uuid";

import jwt = require("jsonwebtoken");

import crypto = require("crypto");

import nodemailer = require("nodemailer");

import { getRepository } from "typeorm";

import svgCaptcha = require("svg-captcha");

import { BaseConfig } from "../config/Base";
import { JWT_SECRET, JWT_EXP, svgCaptchaCfg, emailCfg, sendMailCfg, SECRET_KEY } from "../config/Constants";
import { KeyName } from "../config/RedisKeys";
import { StaticStr } from "../config/StaticStr";
import { MysqlDatabase } from "../dataBase/MysqlDatabase";
import { TokenConfig, Paging } from "../format/Type";
import { DateFormat } from "../utils/DateFormat";
import { VerifyException } from "../utils/Exceptions";
import { redisDb1 } from "../utils/RedisTool";
import { BaseMod } from "../entity/mysql/auth/BaseMod";
import { BaseRole } from "../entity/mysql/auth/BaseRole";
import { BaseUser } from "../entity/mysql/auth/BaseUser";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：authService
 */
export class AccountService {

    /**
     * 获取token
     */
    private getToken(user: BaseUser) {
        const tconfig: TokenConfig = {
            "exp": Math.floor(Date.now() / 1000) + JWT_EXP,
            "data": { "id": user.id, "roles": user.roles, "name": user.name },
        };

        return jwt.sign(tconfig, JWT_SECRET);
    }
    /**
     * 加密密码
     */
    private genPassword(password: string) {
        const md5 = crypto.createHash("md5");
        const str = `password=${password}&key=${SECRET_KEY}`; // 拼接方式是自定的，只要包含密匙即可

        return md5.update(str).digest("hex"); // 把输出编程16进制的格式
    }
    /**
     * 登录验证接口Service
     * @param userName 用户名
     * @param passWord 密码
     */
    public async verifyPassword(userName: string, passWord: string, captchaCode: string, time: string) {
        // 验证码
        const val = await redisDb1.getString(KeyName.STR_SVGCAPTCHA_TIME + time);
        // 设置为过期
        redisDb1.expire(KeyName.STR_SVGCAPTCHA_TIME + time, 1);
        if (captchaCode !== val) {
            throw new VerifyException(StaticStr.ERR_CAPTCHA_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const userDao = getRepository(BaseUser);
        const user = await userDao.findOne({ "name": userName, "isDelete": 0 });
        if (user === undefined) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        if (user.name !== userName) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        if (user.password !== this.genPassword(passWord)) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }

        const token = this.getToken(user);

        return { "accessToken": token, "id": user.id };
    }
    /**
     * 获取用户信息
     * @param name 用户名称
     */
    public async info(id: string) {
        const userDao = getRepository(BaseUser);
        const user: BaseUser = await userDao.findOne({ "id": id, "isDelete": 0 });
        const roleDao = getRepository(BaseRole);
        const role: BaseRole = await roleDao.findOne({ "id": user.roles, "isDelete": 0 }, { "relations": ["mods"] });
        // 拿到对应权限mods信息

        return { "user": user, "mods": role.mods };
    }
    /**
     * 获取权限和后台管理用户列表
     */
    public async users(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_users(${paging.page},${paging.limit},"${paging.condition.name}","${paging.condition.roles}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 获取系统操作日志
     */
    public async systemLog(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_system_log(${paging.page},${paging.limit},
                "${paging.condition.name}",
                "${paging.condition.type}",
                "${paging.condition.Mod}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 获取角色列表
     */
    public async roles() {
        const roleDao = getRepository(BaseRole);
        const data: any = await roleDao.find({ "isDelete": 0 });

        return data;
    }
    /**
     * create角色列表
     */
    public async createRole(role: BaseRole) {
        role.id = uuidv4();
        const roleDao = getRepository(BaseRole);
        // 设置默认根模块权限
        const modDao = getRepository(BaseMod);
        const mods: any = await modDao.find({ "isDelete": 0 });
        const mod = this.findRootId(mods);
        role.mods.push(mod);
        const data: any = await roleDao.save(role);

        return data;
    }
    /**
 * 找到根节点id
 * @param event
 */
    private findRootId(mods: Array<BaseMod>) {
        for (let i = 0; i < mods.length; i++) {
            if (
                mods[i].pId === "undefined" ||
                mods[i].pId === undefined ||
                mods[i].pId === null ||
                mods[i].pId === ""
            ) {
                return mods[i];
            }
        }
    }
    /**
     * create角色列表
     */
    public async updateRole(role: BaseRole) {
        const roleDao = getRepository(BaseRole);
        const data: any = await roleDao.save(role);

        return data;
    }
    /**
     * 删除角色列表
     */
    public async delectRole(role: BaseRole) {
        const roleDao = getRepository(BaseRole);
        role.isDelete = 1;
        const data: any = await roleDao.save(role);

        return data;
    }
    /**
     * 获取角色详情
     */
    public async roleMods(role: BaseRole) {
        const roleDao = getRepository(BaseRole);
        const data: any = await roleDao.findOne({ "id": role.id, "isDelete": 0 }, { "relations": ["mods"] });

        return data;
    }
    /**
     * 获取角色分页
     */
    public async rolesPage(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_roles(${paging.page},${paging.limit},"${paging.condition.name}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 修改用户
     * @param user User
     */
    public async update(user: BaseUser) {
        // 验证用户名
        const userDao = getRepository(BaseUser);
        const userVname = await userDao.findOne({ "name": user.name, "isDelete": 0 });
        if (userVname) {
            throw new VerifyException(StaticStr.INSERT_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        user.updatedTime = DateFormat.dateFormat(Date.now());
        user.password = this.genPassword(user.password);
        const data: any = await userDao.save(user);

        return data;
    }
    /**
     * 创建用户
     * @param user User
     */
    public async create(user: BaseUser) {
        // 验证用户名
        const userDao = getRepository(BaseUser);
        const userVname = await userDao.findOne({ "name": user.name, "isDelete": 0 });
        if (userVname) {
            throw new VerifyException(StaticStr.INSERT_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        const uid = uuidv4();
        const roleDao = getRepository(BaseRole);
        const role: BaseRole = await roleDao.findOne({ "id": user.roles });
        user.createdTime = DateFormat.dateFormat(Date.now());
        user.rolesName = role.roleName;
        user.id = uid;
        user.password = this.genPassword(user.password);
        const data: any = await userDao.save(user);

        return data;
    }
    /**
     * 删除用户
     * @param user User
     */
    public async delect(user: BaseUser) {
        const userDao = getRepository(BaseUser);
        user.createdTime = DateFormat.dateFormat(Date.now());
        user.isDelete = 1;
        const data: any = await userDao.save(user);

        return data;
    }
    /**
     * 获取验证码图片
     */
    public async captchaCode(time: string) {
        const cap = svgCaptcha.create(svgCaptchaCfg);
        const img = cap.data; // 验证码
        const text = cap.text.toLowerCase(); // 验证码字符，忽略大小写
        await redisDb1.setString(KeyName.STR_SVGCAPTCHA_TIME + time, text);
        // 一分钟过期
        await redisDb1.expire(KeyName.STR_SVGCAPTCHA_TIME + time, 6000);

        return img;
    }
    /**
     * 验证Email验证码
     * @param email email地址
     * @param code 发出的code
     * @param password 新密码
     */
    public async validEmailCode(email: string, code: string, password: string) {
        // 验证邮箱是否存在
        const userDao = getRepository(BaseUser);
        const user: BaseUser = await userDao.findOne({ "email": email, "isDelete": 0 });
        if (user === undefined) {
            throw new VerifyException(StaticStr.ERR_EMAILCO_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        // 验证code是否正确
        const codeVali = await redisDb1.getString(KeyName.STR_EMAIL_CODE + user.id,);
        await redisDb1.expire(KeyName.STR_EMAIL_CODE + user.id, 1);

        if (codeVali !== code) {
            throw new VerifyException(StaticStr.ERR_CAPTCHA_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        user.password = this.genPassword(password);
        user.createdTime = DateFormat.dateFormat(Date.now());
        // 保存到数据库
        await userDao.save(user);
        const token = this.getToken(user);

        return { "accessToken": token, "id": user.id };
    }
    /**
     * 获取Email验证码
     * @param email email地址
     */
    public async getEmailCode(email: string) {
        // 验证邮箱是否存在
        const userDao = getRepository(BaseUser);
        const user: BaseUser = await userDao.findOne({ "email": email, "isDelete": 0 });
        if (user === undefined) {
            throw new VerifyException(StaticStr.ERR_EMAILCO2_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const code = Math.random().toString().slice(-6);
        // 发送到邮箱
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(emailCfg);
        await transporter.sendMail(sendMailCfg(email, code));
        // 保存到redis
        await redisDb1.setString(KeyName.STR_EMAIL_CODE + user.id, code);
        // 一分钟过期
        await redisDb1.expire(KeyName.STR_EMAIL_CODE + user.id, 6000);
    }

    /**
     * 注册用户接口Service
     * @param userName 用户名
     * @param passWord 密码
     */
    public async insert(user: BaseUser) {
        // 验证用户名
        const userDao = getRepository(BaseUser);
        const userVname = await userDao.findOne({ "name": user.name, "isDelete": 0 });
        if (userVname) {
            throw new VerifyException(StaticStr.INSERT_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        // 验证邮箱是否使用
        const user1: BaseUser = await userDao.findOne({ "email": user.email, "isDelete": 0 });
        if (user1) {
            throw new VerifyException(StaticStr.ERR_EMAILCO_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const uid = uuidv4();
        user.roles = BaseConfig.GHOST_DEFAULT_ROLE_ID;
        user.rolesName = BaseConfig.GHOST_DEFAULT_ROLE_NAME;
        user.id = uid;
        user.createdTime = DateFormat.dateFormat(Date.now());
        user.password = this.genPassword(user.password);
        // 保存到数据库
        await userDao.save(user);
        const token = this.getToken(user);

        return { "accessToken": token, "id": uid };
    }

    /**
     * 创建模块
     * @param mod Mod
     */
    public async createMod(mod: BaseMod) {
        const modDao = getRepository(BaseMod);
        const uid = uuidv4();
        mod.id = uid;
        mod.createdTime = Date.now().toString();
        const data: any = await modDao.save(mod);

        return data;
    }
    /**
     * 修改模块
     * @param mod Mod
     */
    public async updateMod(mod: BaseMod) {
        const modDao = getRepository(BaseMod);
        mod.updatedTime = Date.now().toString();
        const data: any = await modDao.save(mod);

        return data;
    }
    /**
     * 查询模块
     */
    public async getMod() {
        const modDao = getRepository(BaseMod);
        const data: any = await modDao.find({ "isDelete": 0 });

        return data;
    }
    /**
     * 删除模块
     */
    public async deleteMod(mod: BaseMod) {
        const modDao = getRepository(BaseMod);
        const data: any = await modDao.delete(mod);

        return data;
    }
}
