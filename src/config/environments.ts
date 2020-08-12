import { ConnectionOptions } from "typeorm";
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：数据库配置文件(utils>database文件内切换程序数据库)
 */
export const mysqlConfig: ConnectionOptions = {
        "name":"mysql",
	"type": "mysql",
	"host": "",
	"port": 3307,
	"username": "root",
	"password": "123456",
	"database": "test",
	"logging": true,
	// synchronize: true,
	"timezone": "+08:00",
	"dateStrings": true,
	"entities": ["src/entity/mysql/*.ts"],
};
export const mongodbConfig: ConnectionOptions = {
        "name":"mongodb",
	"type": "mongodb",
	"host": "",
	"port": 27017,
	"database": "test",
	"useUnifiedTopology": true,
	"entities": ["src/entity/mongo/*.ts"],
	// "subscribers": ["src/subscriber/*.ts"],
	// "migrations": ["src/migration/*.ts"],
	"cli": {
		"entitiesDir": "src/entity/mongo",
		"migrationsDir": "src/migration",
		"subscribersDir": "src/subscriber",
	},
};
