import { Entity, ObjectID, ObjectIdColumn, Column, PrimaryColumn } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：auth系统配置Entity
 */
@Entity()
export class User {
	/**
	 * id
	 */
	@PrimaryColumn()
        public id: string;
        /**
         * name
         */
	@Column()
        public name: string;
        /**
         * 密码
         */
	@Column()
        public passWord: string;
}
