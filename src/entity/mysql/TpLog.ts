import { Entity, ObjectID, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：auth系统配置Entity
 */
@Entity()
export class TpLog {
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
        public dateCreated: string;
        /**
         * 查询、新增、删除、更新
         */
	@Column()
        public operationType: string;
        /**
         * 操作地址
         */
	@Column()
	public operationUrl: string;
}
