import { ConnectionOptions, createConnection } from 'typeorm';
import { mongodbConfig, mysqlConfig } from '../config/environments';
import { logError } from './logger';

/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 连接数据库函数(可配置链接的数据库)
 */
export function connection() {
	const config: ConnectionOptions = mongodbConfig as any;
	//   Object.assign(config, {logger: new DbLogger()});
	// createConnection(config).then(() => {
	//   // tslint:disable-next-line:no-console
	//   console.log('数据库 connect success');
	// }).catch(err => {
	//   logError('数据库连接错误:'err);
	// });
}
