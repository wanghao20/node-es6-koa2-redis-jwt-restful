import { ConnectionOptions, createConnection, Logger, QueryRunner, Connection, getConnectionManager, ConnectionManager, getConnection } from "typeorm";

import { mongodbConfig, mysqlConfig } from "../config/Environments";
import { logError, mysqlLogger } from "../utils/Logger";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 连接数据库函数(可配置链接的数据库)
 */
export class Database {
	/**
	 * 获取数据库连接
	 */
	public static getConnection() {
		return getConnection();
	}
	/**
	 *执行SQL命令
	 */
	public static executeSql(sqlCommand: string, parameters?: any) {
		return getConnection().query(sqlCommand, parameters);
	}
	/**
	 *执行存储过程
	 */
	public static async executeProc(sqlCommand: string, parameters?: any) {
                const data = await getConnection().query(sqlCommand, parameters);

		return data[0];
	}
}

/**
 * 用我们自己的logger来接管typeorm logger
 */
export class DbLogger implements Logger {
	/**
	 * 基础查询
	 * @param query
	 * @param parameters
	 * @param queryRunner
	 */
	public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
		const log = "sqlCommand:" + query + " parameters:" + parameters;
                // mysqlLogger.info(log);
                console.log(log);
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
