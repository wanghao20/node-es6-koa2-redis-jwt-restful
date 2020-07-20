import { Entity,  ObjectIdColumn, Column } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：系统配置Entity
 */
@Entity()
export class SysTemConfig {
  @ObjectIdColumn()
  id: string;
  @Column()
  fieldList: [];

}