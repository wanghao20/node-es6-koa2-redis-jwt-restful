import { v4 as uuidv4 } from "uuid";

import jwt = require("jsonwebtoken");
import nodemailer = require("nodemailer");

import { getRepository } from "typeorm";

import svgCaptcha = require("svg-captcha");

import { JWT_SECRET, JWT_EXP, svgCaptchaCfg, emailCfg, sendMailCfg } from "../config/Constants";
import { KeyName } from "../config/RedisKeys";
import { StaticStr } from "../config/StaticStr";
import { MysqlDatabase } from "../dataBase/MysqlDatabase";
import { TokenConfig, Paging } from "../format/Type";
import { DateFormat } from "../utils/DateFormat";
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
     * 获取token
     */
    private getToken(user: BaseUser) {
        const tconfig: TokenConfig = {
            "exp": Math.floor(Date.now() / 1000) + JWT_EXP,
            "data": { "id": user.id, "roles": user.roles },
        };

        return jwt.sign(tconfig, JWT_SECRET);
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
        const user = await userDao.findOne({ "name": userName });
        if (user.name !== userName) {
            throw new VerifyException(StaticStr.USERNAME_ERR_MSG, StaticStr.ERR_CODE_DEFAULT);
        }
        // if (!(await     argon2 .verify(pwd, passWord))) { // todo argon2模块有问题,后面选择其他模块
        if (user.password !== passWord) {
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
        const user: any = await userDao.findOne({ "id": id });
        user.roles = user.roles.split(",");

        return user;
    }
    /**
     * 获取权限和后台管理用户列表
     */
    public async users(paging: Paging) {
        const data = await MysqlDatabase.executeProc(
            `call proc_users(${paging.page},${paging.limit},"${paging.name}","${paging.roles}")`);

        // 解析存储过程数据
        return { "items": data[0], "total": Number(data[1][0].total) };
    }
    /**
     * 获取角色列表
     */
    public async roles() {
        const roleDao = getRepository(BaseRole);
        const data: any = await roleDao.find();

        return data;
    }
    /**
     * 修改用户
     * @param user User
     */
    public async update(user: BaseUser) {
        user.updateTime = DateFormat.dateFormat(Date.now());
        // TODO 加密密码
        const userDao = getRepository(BaseUser);
        const data: any = await userDao.save(user);

        return data;
    }
    /**
     * 创建用户
     * @param user User
     */
    public async create(user: BaseUser) {
        const uid = uuidv4();
        const roleDao = getRepository(BaseRole);
        const role: BaseRole = await roleDao.findOne({ "id": user.roles });
        user.creationTime = DateFormat.dateFormat(Date.now());
        user.rolesName = role.roleName;
        user.id = uid;
        // TODO 加密密码
        const userDao = getRepository(BaseUser);
        const data: any = await userDao.save(user);

        return data;
    }
    /**
     * 删除用户
     * @param user User
     */
    public async delect(user: BaseUser) {
        const userDao = getRepository(BaseUser);
        user.updateTime = DateFormat.dateFormat(Date.now());
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
        const user: BaseUser = await userDao.findOne({ "email": email });
        if (user===undefined) {
            throw new VerifyException(StaticStr.ERR_EMAILCO_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        // 验证code是否正确
        const codeVali = await redisDb1.getString(KeyName.STR_EMAIL_CODE + user.id,);
        await redisDb1.expire(KeyName.STR_EMAIL_CODE + user.id, 1);

        if (codeVali !== code) {
            throw new VerifyException(StaticStr.ERR_CAPTCHA_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        // todo 暂未加密,后面处理
        user.password = password;
        user.updateTime = DateFormat.dateFormat(Date.now());
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
        const user: BaseUser = await userDao.findOne({ "email": email });
        if (user===undefined) {
            throw new VerifyException(StaticStr.ERR_EMAILCO2_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const code = Math.random().toString().slice(-6);
        // 发送到邮箱
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport(emailCfg);
        await transporter.sendMail(sendMailCfg(email,code));
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
        // 验证邮箱是否使用
        const userDao = getRepository(BaseUser);
        const user1: BaseUser = await userDao.findOne({ "email": user.email });
        if (user1) {
            throw new VerifyException(StaticStr.ERR_EMAILCO_CODE, StaticStr.ERR_CODE_DEFAULT);
        }
        const uid = uuidv4();
        // todo 设置默认权限
        user.roles = "3";
        user.rolesName = "访客";
        user.id = uid;
        user.creationTime = DateFormat.dateFormat(Date.now());
        // 保存到数据库
        await userDao.save(user);
        // todo 暂未加密,后面处理
        const token = this.getToken(user);

        return { "accessToken": token, "id": uid };
    }
}
