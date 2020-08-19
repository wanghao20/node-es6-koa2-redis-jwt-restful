import { Logger, QueryRunner, getConnection } from "typeorm";

import { mysqlLogger } from "../utils/Logger";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 连接数据库函数
 */
export class MysqlDatabase {
	/**
	 * 获取数据库连接
	 */
    public static getConnection() {
        return getConnection("mysql");
    }
    // todo 自定义的方法使用redis分布式锁或者在数据库中开启事务
    // todo typeorm中增删改都自动添加了事务机制

	/**
	 *执行SQL命令(需要自己添加事务)
	 */
    public static executeSql(sqlCommand: string, parameters?: any) {
        return getConnection().query(sqlCommand, parameters);
    }
	/**
	 *执行存储过程(需要自己添加事务)
	 */
    public static async executeProc(sqlCommand: string, parameters?: any) {
        const data = await getConnection().query(sqlCommand, parameters);

        return data[0];
    }
}

/**
 * 用我们自己的logger来接管typeorm logger
 */
export class MysqlDbLogger implements Logger {
	/**
	 * 基础查询
	 * @param query
	 * @param parameters
	 * @param queryRunner
	 */
    public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
        const log = "sqlCommand:" + query + " parameters:" + parameters;
        mysqlLogger.info(log);
    }

	/**
	 * 日志记录
	 * @param error
	 * @param query
	 * @param parameters
	 * @param queryRunner
	 */
    public logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        const log = "sqlCommand:" + query + " parameters:" + parameters;
        mysqlLogger.error(log, error);
    }
	/**
	 *日志记录
	 * @param time
	 * @param query
	 * @param parameters
	 * @param queryRunner
	 */
    public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
        mysqlLogger.info(query, time);
    }

	/**
	 * 日志记录
	 * @param message
	 * @param queryRunner
	 */
    public logSchemaBuild(message: string, queryRunner?: QueryRunner) {
        mysqlLogger.info(message);
    }

	/**
	 * 日志记录
	 * @param message
	 * @param queryRunner
	 */
    public logMigration(message: string, queryRunner?: QueryRunner) {
        mysqlLogger.info(message);
    }

	/**
	 *日志记录
	 * @param level
	 * @param message
	 * @param queryRunner
	 */
    public log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
        switch (level) {
            case "info": {
                mysqlLogger.info(message);
                break;
            }
            case "warn": {
                mysqlLogger.warn(message);
            }
        }
    }
}
