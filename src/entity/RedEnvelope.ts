import { Entity, ObjectIdColumn, Column, ObjectID } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：红包Entity
 */
@Entity()
export class RedEnvelope {
    @ObjectIdColumn()
    id: string;

    @Column()
    grade: number;// 红包等级

    @Column()
    isRobbed: number;// 是否已经打开

    @Column()
    isExpired: number;// 是否已过期

    @Column()
    isDelete: number;// 是否已经删除

    @Column()
    attackerId: string;// 攻击者id

    @Column()
    haveReadAttacker: number;// 攻击者是否已读

    @Column()
    beAttackerId: string;// 被攻击者id

    @Column()
    beHaveReadAttacker: number;// 被攻击者是否已读

    @Column()
    generateDate: number;// 红包生成时间

    @Column()
    ingotReward: number;// 元宝

    @Column()
    takeAwayUserId: number;// 领取人

}