/**
 * Created by wh on 2020/8/14
 * author: wanghao
 * @desc：可控概率产生随机商品
 */
export class Roll {
	/**
	 * 存储要roll的列表
	 */
    public prtLuist: Array<any>;
    constructor() {
        this.prtLuist = new Array(); // 存储要roll的列表
    }

	/**
	 * 添加到随机区间
	 * @param item 奖品
	 * @param rank 概率
	 */
    public add(item: string, rank: number) {
        if (rank <= 0) {
            console.log("参数错误");
        }
        const prt = { item, rank };
        this.prtLuist.push(prt); // 把要roll的商品添加要列表中
    }

	/**
	 * 获取结果
	 */
    public roll() {
        let totalRank = 0;
        const random = Math.random(); // 产生一个随机数
        let result = null;
        const items = this.prtLuist.slice().map((item) => (totalRank += item.rank) && item); // 计算总权重
        let start = 0; // 区间的开始，第一个是为0
        while (items.length) {
            const item = items.shift(); // 取出第一个商品
            const end = start + item.rank / totalRank; // 计算区间的结束
            if (random > start && random <= end) {
                // 如果随机数在这个区间内，说明抽中了该商品，终止循环
                result = item;
                break;
            }
            start = end; // 当前区间的结束，作为下一个区间的开始
        }

        return result ? result.item : null;
    }
    // 调用实例测试
    // const roller = new Roll();
    // let nullNum = 0;
    // const nullStr = "       空空如也:";
    // let iphoneNum = 0;
    // const iphoneStr = "     IPhone 8:";
    // let huaweiNum = 0;
    // const huaweiStr = "     huawei P40:";
    // for (let i = 0; i < 1000; i++) {
    //         roller.add(iphoneStr, 1);
    //         roller.add(huaweiStr, 1);
    //         roller.add(nullStr, 98);
    //         const result = roller.roll();
    //         if (result === nullStr) {
    //                 nullNum++;
    //         }
    //         if (result === iphoneStr) {
    //                 iphoneNum++;
    //         }
    //         if (result === huaweiStr) {
    //                 huaweiNum++;
    //         }
    // }
    // console.log(nullStr+nullNum+iphoneStr+iphoneNum+huaweiStr+huaweiNum);
}
