import { BaseConfig } from "./Base";

export const bullConfig = {
    "redis": {
        "port": BaseConfig.REDIS_PORT,
        "host": BaseConfig.REDIS_HOST,
        "db": BaseConfig.BULLMQ_DB,
        "password": BaseConfig.REDIS_PASSWORD,
    },
    "prefix": "queue_", // 用于所有Redis密钥的前缀
    "defaultJobOptions": {
        "attempts": 100, // 尝试完成该工作之前的总尝试次数
        "removeOnComplete": true, // 一个布尔值，如果为true，则在成功完成工作时将其删除。为数字时，它指定要保留的作业数量。默认行为是将作业保留在失败集中
        "backoff": 1, // 如果作业失败，自动重试的退避设置
        "delay": 5000, // 等待此作业可以处理的毫秒数。 *请注意，为了获得准确的延迟，服务器和客户端都应使其时钟同步。
    },
    "limiter": {
        "max": 2000000, // 处理的最大作业数
        "duration": 1000, // 每个持续时间（以毫秒为单位）
    },
    "settings": {
        "stalledInterval": 5000, // 多久检查一次停顿的工作（使用0表示从不检查）
        "maxStalledCount": 1, // 停顿的工作将被重新处理的最大次数
        "guardInterval": 2000, // 重新调度延迟,*轮询间隔，用于延迟的作业和新增的作业
        "retryProcessDelay": 500, // 如果发生内部错误，则延迟处理下一个作业
        "drainDelay": 50000 // 空队列时brpoplpush的等待时间
    },
};
/**
 * BullMQ保存对象时创建储存库名称
 */
export const QUEUE_OBJ_NAME = "saveObjQueue";
/**
 * BullMQ保存用户活跃数据储存库
 */
export const QUEUE_USER_ACTIVE = "saveUserActive";
/**
 * BullMQ保存活跃度时日期格式
 */
export const QUEUE_DATE_FORMAT = "YYYY-MM-DD";
