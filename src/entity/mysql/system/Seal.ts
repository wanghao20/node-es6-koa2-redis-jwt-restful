import { Entity, Column } from "typeorm";

import { BaseEntity } from "../Base.entity";

/**
 * Created by wh on 2020/9/14
 * author: wanghao
 * @desc：封号数据实体
 */
@Entity()
export class BaseSeal extends BaseEntity {

    /**
     * gameId
     */
    @Column()
    public gameId: string;
    /**
     * openid
     */
    @Column()
    public openId: string;
    /**
     * userId
     */
    @Column()
    public userId: string;
    /**
     * 玩家名称
     */
    @Column()
    public userName: string;
    /**
     * 封号原因
     */
    @Column()
    public reason: string;
    /**
     * 是否封号
     */
    @Column()
    public isSeal: string;

}
