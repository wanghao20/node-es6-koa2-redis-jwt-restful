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
 *企业号转账后台接收参数
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
	 * 金额
	 */
	amount: any;
};
/**
 *代理选项
 */
type AgentOptionsTy = {
	/**
	 * pfx证书
	 */
	pfx: Buffer;
	/**
	 * 企业转账商户号id(涉及支付)
	 */
	passphrase: string;
};
/**
 *企业号转账POST请求发出参数
 */
type PreArray = {
	/**
	 * appid
	 */
	mch_appid?: string;
	/**
	 * 微信支付商户号
	 */
	mchid?: string;
	/**
	 * 随机字符串
	 */
	nonce_str?: string;
	/**
	 * 订单号
	 */
	partner_trade_no?: string;
	/**
	 * openid
	 */
	openid?: string;
	/**
	 * 是否检查name
	 */
	check_name?: string;
	/**
	 * 金额
	 */
        amount?: string;
	/**
	 * 备注
	 */
        desc?: string;
	/**
	 * 客户端ip
	 */
        spbill_create_ip?: string;
};

export { ResData, RouteMeta, TokenConfig, AttackDate, DrawReward, EnAccountTransfer,PreArray,AgentOptionsTy };
