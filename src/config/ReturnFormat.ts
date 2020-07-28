/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc 与前端交互时定义的返回变量格式
 */
// 红包列表
class RedEnvelopeVal {
	/**
	 * id
	 */
	public id = "";
	/**
	 * 是否是红包持有者
	 */
	public generation = 0;
	/**
	 * 红包等级
	 */
	public grade = 0;
	/**
	 * 是否过期
	 */
	public isExpired = 0;
	/**
	 * 过期时间
	 */
	public littleTime: any;
}
/**
 * 征战列表
 */
class Expeditions {
	/**
	 * id
	 */
	public id = "";
	/**
	 * 等级
	 */
	public name = 0;
	/**
	 * 等级
	 */
	public grade = 0;
	/**
	 * 头像
	 */
	public headImg = 0;
	/**
	 * 是否已读
	 */
	public isRed = 0;
	/**
	 * 读取时间
	 */
	public redDate = "";
}
/**
 * 盟友列表
 */
class ArmyList {
	/**
	 * id
	 */
	public id = "";
	/**
	 * name
	 */
	public name = 0;
	/**
	 * 等级
	 */
	public grade = 0;
	/**
	 * 头像
	 */
	public headImg = 0;
}

export { RedEnvelopeVal, Expeditions, ArmyList };
