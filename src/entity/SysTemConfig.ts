import { Column, Entity, ObjectIdColumn } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：系统配置Entity
 */
@Entity()
export class SysTemConfig {
        /**
         * id
         */
	@ObjectIdColumn()
        public id: string;
        /**
         * 字段列表
         */
	@Column()
	public fieldList: [];
}
