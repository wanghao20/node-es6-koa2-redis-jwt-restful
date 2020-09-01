import { Entity, ObjectID, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：角色
 */
@Entity()
export class BaseRole {
	/**
	 * id
	 */
    @PrimaryColumn()
    public id: string;
    /**
     * 角色名称
     */
    @Column()
    public roleName: string;
    /**
     * 权限等级,
     */
    @Column()
    public authLevel: string;
    /**
     * 是否删除
     */
    @Column()
    public isDelete: string;
    /**
     * 创建时间
     */
    @Column()
    public creationTime: string;

}
