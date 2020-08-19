import moment = require("moment");
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：时间格式化/获取时间差
 */
export class DateFormat {
	/**
	 * 根据时间戳格式化时间
	 * @param date 传入时间戳
	 * @param format 格式化时间格式,默认'YYYY-MM-DD HH:mm:ss'
	 */
    public static dateFormat(date: number, format?: string) {
        return moment(date).format(format || "YYYY-MM-DD HH:mm:ss");
    }
	/**
	 * 计算时间差,包括计算，天，时，分，秒
	 * @param date1 开始时间
	 * @param date2  结束时间
	 * @param returnType  返回结果类型-{days,hours,minutes,seconds,all}
	 * @param format  是否格式化返回 true:days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
	 * false: {'days':days,'hours':hours,'minutes':minutes,'seconds':seconds}
	 */
    public static dateCount(date1: Date, date2: Date, returnType?: string) {
        const date3 = date2.getTime() - date1.getTime(); // 时间差的毫秒数
        // 计算出相差天数
        const days = Math.floor(date3 / (24 * 3600 * 1000));
        // 计算出小时数
        const leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000));
        // 计算相差分钟数
        const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
        const minutes = Math.floor(leave2 / (60 * 1000));
        // 计算相差秒数
        const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
        const seconds = Math.round(leave3 / 1000);
        // 判断需要的返回类型
        switch (returnType) {
            case "days":
                return days;
            case "hours":
                return hours + days * 24;
            case "days":
                return minutes + (hours + days * 24) * 60;
            case "days":
                return seconds + (minutes + (hours + days * 24) * 60);
            default:
                break;
        }
    }

	/**
	 * 格式化时间差
	 * @param date1 开始时间
	 * @param date2  结束时间
	 * @param format  是否格式化返回 true:days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
	 * false: {'days':days,'hours':hours,'minutes':minutes,'seconds':seconds}
	 */
    public static dateCountFormat(date1: Date, date2: Date) {
        const date3 = date2.getTime() - date1.getTime(); // 时间差的毫秒数
        // 计算出相差天数
        const days = Math.floor(date3 / (24 * 3600 * 1000));
        // 计算出小时数
        const leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
        const hours = Math.floor(leave1 / (3600 * 1000));
        // 计算相差分钟数
        const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
        const minutes = Math.floor(leave2 / (60 * 1000));
        // 计算相差秒数
        const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
        const seconds = Math.round(leave3 / 1000);

        return days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒";
    }
    /**
     *   拿取当前日期前某一天日期
     * @param days 天数
     */
    public static today(days: number) {

        const today = moment();

        return today.subtract(days, "days").format("YYYY-MM-DD"); /*前一天的时间*/
    }

}
