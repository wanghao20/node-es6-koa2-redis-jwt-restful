import { Entity, Column, ManyToMany,  } from "typeorm";

import { BaseEntity } from "../Base.entity";

import { BaseRole } from "./BaseRole";

/**
 * Created by wh on 2020/3/3
 * @desc：模块实体
 */
@Entity()
export class BaseMod extends BaseEntity  {

    /**
     * 父节点id
     */
    @Column()
    public pId: string;
    /**
     * 父节点名称
     */
    @Column()
    public pName: string;
    /**
     * 模块名称
     */
    @Column()
    public label: string;
    /**
     * 模块路由地址
     */
    @Column()
    public modPath: string;
    /**
     * 模块标题
     */
    @Column()
    public modtTitle: string;
    /**
     * vueComponent对应地址
     */
    @Column()
    public component: string;
    /**
     * icon
     */
    @Column()
    public icon: string;

    /**
     * 是否禁止操作,0否1:是
     */
    @Column()
    public disabled: number;

    /**
     * 多对多
     */
    @ManyToMany((type) => BaseRole, (role) => role.mods)
    public roles: BaseRole[];

}
