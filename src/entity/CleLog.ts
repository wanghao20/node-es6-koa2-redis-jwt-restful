import { Entity, Column, PrimaryColumn } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：客户端操作记录Entity
 */
@Entity()
export class CltLog {
	/**
	 * id
	 */
	@PrimaryColumn()
        public id: string;
        /**
         * 游戏id
	 */
        @Column()
	public gameId: string;
	/**
         * 微信参数id
	 */
        @Column()
        public openId: string;
        /**
         * 对应事件id
         */
        @Column()
	public evtId: string;
	/**
         * 事件参数
	 */
        @Column()
        public p1?: string;
        /**
         * 事件参数
         */
        @Column()
	public p2?: string;
}
