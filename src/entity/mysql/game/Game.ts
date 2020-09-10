import { Entity, Column } from "typeorm";

import { BaseEntity } from "../Base.entity";

/**
 * Created by wh on 2020/9/4
 * author: wanghao
 * @desc：游戏实体
 */
@Entity()
export class BaseGame extends BaseEntity {

    /**
     * gameId
     */
    @Column()
    public gameId: string;
    /**
     * lcon
     */
    @Column()
    public icon: string;
    /**
     * 产品名称
     */
    @Column()
    public gameName: string;
    /**
     * 描述
     */
    @Column()
    public doc: string;
    /**
     * appid
     */
    @Column()
    public appid: string;
    /**
     * Ftp路径(游戏路径)
     */
    @Column()
    public gamePath: string;
    /**
     * 游戏配置
     */
    @Column()
    public config: string;
    /**
     * 游戏版本
     */
    @Column()
    public version: string;
    /**
     * 当前状态
     */
    @Column()
    public status: number;
    /**
     * 公司团队
     */
    @Column()
    public team: string;
    /**
     * 人员安排
     */
    @Column()
    public staffGear: string;

}
