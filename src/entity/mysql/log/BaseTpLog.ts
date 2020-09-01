import { Entity, Column, PrimaryColumn } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：操作记录
 */
@Entity()
export class BaseTpLog {
	/**
	 * id
	 */
    @PrimaryColumn()
    public id: string;
    /**
     * 操作用户id
     */
    @Column()
    public userId: string;
    /**
     * 操作时间
     */
    @Column()
    public creationTime: Date;
    /**
     * 查询、新增、删除、更新
     */
    @Column()
    public operationType: string;
    /**
     * 操作ip地址
     */
    @Column()
    public ip: string;
    /**
     * 操作URL地址
     */
    @Column()
    public operationUrl: string;
}
