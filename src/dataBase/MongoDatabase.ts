import { Logger, QueryRunner, getConnection } from "typeorm";

import { mongoLogger } from "../utils/Logger";

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 连接数据库函数
 */
export class MongoDatabase {
	/**
	 * 获取数据库连接
	 */
	public static getConnection() {
		return getConnection("mongodb");
	}
}

/**
 * 用我们自己的logger来接管typeorm logger
 */
export class  MongoDbLogger implements Logger {
	/**
	 * 基础查询
	 * @param query
	 * @param parameters
	 * @param queryRunner
	 */
	public logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
		const log = "sqlCommand:" + query + " parameters:" + parameters;
                mongoLogger.info(log);
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
		mongoLogger.error(log, error);
	}
	/**
	 *日志记录
	 * @param time
	 * @param query
	 * @param parameters
	 * @param queryRunner
	 */
	public logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
		mongoLogger.info(query, time);
	}

	/**
	 * 日志记录
	 * @param message
	 * @param queryRunner
	 */
	public logSchemaBuild(message: string, queryRunner?: QueryRunner) {
		mongoLogger.info(message);
	}

	/**
	 * 日志记录
	 * @param message
	 * @param queryRunner
	 */
	public logMigration(message: string, queryRunner?: QueryRunner) {
		mongoLogger.info(message);
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
				mongoLogger.info(message);
				break;
			}
			case "warn": {
				mongoLogger.warn(message);
			}
		}
	}
}
