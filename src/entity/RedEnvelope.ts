import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：红包Entity
 */
@Entity()
export class RedEnvelope {
        /**
         * ed
         */
        @ObjectIdColumn()
        /**
         * id
         */
	public id: string;

	@Column()
	public grade: number; // 红包等级

	@Column()
	public isRobbed: number; // 是否已经打开

	@Column()
	public isExpired: number; // 是否已过期

	@Column()
	public isDelete: number; // 是否已经删除

	@Column()
	public attackerId: string; // 攻击者id

	@Column()
	public haveReadAttacker: number; // 攻击者是否已读

	@Column()
	public beAttackerId: string; // 被攻击者id

	@Column()
	public beHaveReadAttacker: number; // 被攻击者是否已读

	@Column()
	public generateDate: number; // 红包生成时间

	@Column()
	public ingotReward: number; // 元宝

	@Column()
	public takeAwayUserId: number; // 领取人
}
