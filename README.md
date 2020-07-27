DEMO
===========================


## 环境依赖
node v0.10.28+
reids ~


## 部署步骤

### &nbsp;&nbsp; 1. 配置Redis



### &nbsp;&nbsp;2. npm install  //安装node运行环境


### &nbsp;&nbsp;3. npm start 启动

###########目录结构描述
#### ├── Readme.md                   // help
#### ├── logs                        // 日志
#### ├── src                         // 主程序
#### │   ├── cert                    // 证书保存文件
#### │   ├── config                  // 项目配置类
#### │   │   ├── Base.ts             // 项目基础配置
#### │   │   ├── Constants.ts        // jwt秘钥和ROUTER_MAP
#### │   │   ├── EnvironMents.ts     // 数据库环境配置
#### │   │   ├── GlobalVar.ts        // 系统常量配置
#### │   │   ├── RedisKeys.ts        // redis Key配置
#### │   │   ├── ReturnFormat.ts     // 返回模拟实体对象定义
#### │   │   ├── Type.ts             // 自定义类型封装
#### │   ├── controllers             // 请求控制类
#### │   ├── decorator               // 装饰器类
#### │   ├── entity                  // 实体类定义
#### │   ├── routes                  // 路由文件
#### │   ├── service                 // 服务提供类
#### │   ├── utils                   // 工具类
#### │   │   ├── services            // http请求封装
#### │   │   ├── weichat             // weichat链接时使用的工具
#### │   │   ├── DataBase.ts         // 数据库连接工具(可切换数据库)
#### │   │   ├── DateFormat.ts       // 时间处理类
#### │   │   ├── Exceptions.ts       // 异常处理类
#### │   │   ├── InitRedisData.ts    // 初始化数据到Redis
#### │   │   ├── Logger.ts           // 日志打印类
#### │   │   ├── RedisTool.ts        // redis连接,封装方法
#### │   │   ├── ReqFilter.ts        // 请求过滤接口
#### │   │   ├── ReturnResult        // 返回结果封装处理
#### │   │   ├── reqValidate         // 请求参数验证
#### │   │   ├── Encryption          // 非对称加密工具类
#### │   └── App.ts                  // 项目主文件
#### ├── ormconfig.json              // orm配置
#### ├── server.ts                   // 服务器启动文件
#### ├── tsconfig.ts                 // TS配置文件
#### ├── tslint.json                 // 语法规范格式文件
#### 

## 注意 argon2模块报错请在cnpm安装