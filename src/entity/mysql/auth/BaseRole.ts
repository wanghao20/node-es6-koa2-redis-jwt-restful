import { Entity, Column,  ManyToMany, JoinTable } from "typeorm";

import { BaseEntity } from "../Base.entity";

import { BaseMod } from "./BaseMod";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：角色
 */
@Entity()
export class BaseRole extends BaseEntity  {

    /**
     * 角色名称
     */
    @Column()
    public roleName: string;
    /**
     * 权限对应的模块
     */
    @ManyToMany((type) => BaseMod, (mod) => mod.roles)
    @JoinTable({
        "name": "mod_role",
        "joinColumn": { "name": "role_id" },
        "inverseJoinColumn": { "name": "mod_id" },
      })
    public mods: BaseMod[];

}
