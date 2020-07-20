import { Entity, ObjectID, ObjectIdColumn, Column } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：auth系统配置Entity
 */
@Entity()
export class User {
  @Column()
  id: any;
  @Column()
  password: any;
  @Column()
  name: string;

}