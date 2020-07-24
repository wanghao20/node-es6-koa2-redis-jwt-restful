import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：等级贡献Entity
 */
@Entity()
export class DrawRewardEntity {
	/**
	 * id
	 */
	@Column()
	public uid: string;

	/**
	 * 等级
	 */
	@Column()
	public grade: number; // 红包等级

	/**
	 * 等级对应奖励
	 */
	@Column()
	public devote: number; // 红包等级
}
