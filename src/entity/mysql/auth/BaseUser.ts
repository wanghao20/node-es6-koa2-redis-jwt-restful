import { Entity, ObjectID, ObjectIdColumn, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";

import { BaseRole } from "./BaseRole";
/**
 * Created by wh on 2020/8/31
 * author: wanghao
 * @desc：用户
 */
@Entity()
export class BaseUser {
	/**
	 * id
	 */
    @PrimaryColumn()
    public id: string;
    /**
     * 对应角色
     */
    @PrimaryColumn()
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
     * creationTime
     */
    @Column()
    public creationTime: string;
    /**
     * 是否删除,0:否1:是
     */
    @Column()
    public isDelete: string;
    /**
     * 头像
     */
    @Column()
    public avatar: string;
    /**
     * 权限名称
     */
    public rolesName: string;
}
