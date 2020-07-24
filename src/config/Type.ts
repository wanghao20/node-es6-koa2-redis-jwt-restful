import { Context, Next } from 'koa';
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：类型定义
 */

/**
 *请求处理返回类型
 */
type ResData = {
	/**
	 * 状态码
	 */
	code: number;
	/**
	 * 对称加密key
	 */
	// key: string;
	/**
	 * 消息提示
	 */
	msg?: string;
	/**
	 * 数据体
	 */
	data?: any;
	/**
	 * 错误体
	 */
	err?: any;
};

/**
 * 路由类型
 */
type RouteMeta = {
	/**
	 * 路由名称
	 */
	name: string;
	/**
	 * 方法名称
	 */
	method: string;
	/**
	 * 路径
	 */
	path: string;
};
/**
 * token配置类型
 */
type TokenConfig = {
	/**
	 * 过期时间
	 */
	exp: number;
	/**
	 * 数据体
	 */
	data: {};
};
/**
 * attackDate配置类型
 */
type AttackDate = {
	/**
	 * 创建时间
	 */
	attackDate: any;
	/**
	 * id
	 */
	id: any;
	/**
	 * 输赢
	 */
	winLose: any;
};
/**
 *等级贡献记录数据结构
 */
type DrawReward = {
	/**
	 * uid
	 */
	uid: string;
	/**
	 * 等级
	 */
	grade: number;
	/**
	 * 奖励
	 */
	devote: number;
};
/**
 *企业号转账
 */
type EnAccountTransfer = {
	/**
	 * appid
	 */
	appid: string;
	/**
	 * openid
	 */
	openid: string;
	/**
	 * 订单号
	 */
	orderno: any;
	/**
	 * 金额
	 */
	amount: any;
};

export { ResData, RouteMeta, TokenConfig, AttackDate, DrawReward, EnAccountTransfer };
