
import  Queue = require("bull");

/**
 * Created by wh on 2020/7/28
 * author: wanghao
 * @desc：消息队列工具类
 * 文档:https://github.com/OptimalBits/bull#uis
 */
export class BullMq {

        /**
         * 初始化
         */
	public static init() {
                const queue = new Queue("nike", {
                        "redis": {
                          "port": 6379,
                          "host": "127.0.0.1",
                          "db": 3,
                          "password": null
                        },
                        "prefix": "nike_",// 用于所有Redis密钥的前缀
                        "defaultJobOptions": {
                          "attempts": 1,// 尝试完成该工作之前的总尝试次数
                          "removeOnComplete": true,// *一个布尔值，如果为true，则在成功完成工作时将其删除。为数字时，它指定要保留的作业数量。默认行为是将作业保留在失败集中
                          "backoff": 1,// 如果作业失败，自动重试的退避设置
                          "delay": 0// 退避延迟，以毫秒为单位
                        },
                        "limiter": {
                          "max": 200000,// 已处理的最大作业数
                          "duration": 1000// 每个持续时间（以毫秒为单位）
                        },
                        "settings": {
                          "maxStalledCount": 1,// 停顿的工作将被重新处理的最大次数
                          "guardInterval": 1, // 重新调度延迟,*轮询间隔，用于延迟的作业和新增的作业
                          "retryProcessDelay": 500, // 如果发生内部错误，则延迟处理下一个作业
                        // drainDelay: 50000 // 空队列时brpoplpush的等待时间
                        }
                      });
        }

}
