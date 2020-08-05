import { Context, Next } from "koa";
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
 *企业红包
 */
type SenDredPack = {
	/**
	 * appid
	 */
	wxappid: string;
	/**
	 * openid
	 */
	reOpenid: string;
	/**
	 * 金额
	 */
	totalAmount: any;
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
	 * 企业转账商户号id
         * 此处设置为证书密码
         * 服务器加载证书时需要使用密码否则会提示:mac verify failure
	 */
	passphrase: string;
};
/**
 *操作记录详情
 */
type TbLogContent = {
	/**
	 * url地址
	 */
	urlAddress: string;
	/**
	 * 地址对应功能说明
	 */
	comment: string;
};
/**
 *操作记录
 */
type TbLog = {
	/**
	 * 操作用户id
	 */
        userId?: string;
        /**
         * 操作时间
         */
        dateCreated?: Date;
        /**
         * 操作类型:查询、新增、删除、更新
         */
	operationType?: string;
	/**
	 * 操作地址
	 */
	operationUrl?: string;
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
/**
 *企业红包POST发出参数
 */
type RedArray = {
        /**
         * 随机字符串
         */
        nonce_str?: string;
        /**
         * 商户订单号
         */
        mch_billno?: string;
        /**
         * 微信支付商户号
         */
        mch_id?: string;
	/**
	 * 公众账号appid
	 */
	wxappid?: string;
	/**
	 * 商户名称
	 */
	send_name?: string;
	/**
	 * 用户openid
	 */
	re_openid?: string;
	/**
	 * 金额
	 */
        total_amount?: string;
	/**
	 * 红包发放总人数
	 */
        total_num?: string;
	/**
	 * 红包祝福语
	 */
        wishing?: string;
	/**
         * 客户端ip
	 */
        client_ip?: string;
        /**
         * 活动名称
         */
        act_name?: string;
        /**
         * 备注
         */
        remark?: string;
        /**
         * 发放红包使用场景，红包金额大于200或者小于1元时必传
         */
        scene_id?: string;
};

export {RedArray, SenDredPack,ResData, RouteMeta, TokenConfig, AttackDate, DrawReward, EnAccountTransfer,PreArray,AgentOptionsTy ,TbLogContent,TbLog};
