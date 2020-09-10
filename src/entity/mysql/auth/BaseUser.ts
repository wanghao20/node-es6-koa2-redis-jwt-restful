import { Entity, Column, } from "typeorm";

import { BaseEntity } from "../Base.entity";

/**
 * Created by wh on 2020/8/31
 * author: wanghao
 * @desc：用户
 */
@Entity()
export class BaseUser extends BaseEntity {

    /**
     * 对应角色
     */
    @Column()
    public roles: string;
    /**
     * 用户名
     */
    @Column()
    public name: string;
    /**
     * 密码
     */
    @Column()
    public password: string;
    /**
     * 邮箱
     */
    @Column()
    public email: string;
    /**
     * 头像
     */
    @Column()
    public avatar: string;
    /**
     * 权限名称
     */
    @Column()
    public rolesName: string;
}
