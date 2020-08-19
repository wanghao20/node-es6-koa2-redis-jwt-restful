# DEMO

## 环境依赖

node v12.18.2
reids v3.2+
mysql(可在配置中关闭)
mongo(可在配置中关闭)

## 部署步骤

### &nbsp;&nbsp;1. 配置 Redis,配置数据库或者在app.ts注释掉数据库连接

### &nbsp;&nbsp;2. npm install //安装项目依赖

### &nbsp;&nbsp;3. npm start 启动

########### 目录结构描述

#### ├── Readme.md // help

#### ├── logs // 日志

#### ├── src // 主程序

#### │ ├── config // 项目配置类

#### │ │ ├── cert // 证书保存文件

#### │ │ ├── Base.ts // 项目基础配置

#### │ │ ├── BullConfig.ts // 消息中间件配置

#### │ │ ├── Constants.ts // jwt 秘钥和 ROUTER_MAP

#### │ │ ├── EnvironMents.ts // 数据库环境配置

#### │ │ ├── GlobalVar.ts // 系统常量配置

#### │ │ ├── Keys.ts // 非对称加密 key 配置.AES 对称加密 key

#### │ │ ├── LimiterConfig.ts // 限流控制模块

#### │ │ ├── RedisKeys.ts // redis Key 配置

#### │ │ ├── StaticStr.ts // 静态字符定义类

#### │ ├── controllers // 请求控制类

#### │ ├── entity // 实体类定义 20200728:当前未使用

#### │ ├── routes // 路由文件

#### │ ├── service // 服务提供类

#### │ ├── format // 格式化项目的一些定义文件

#### │ ├── utils // 工具类

#### │ │ ├── decorator // 装饰器类

#### │ │ ├── services // http 请求封装

#### │ │ ├── weichat // weichat 链接时使用的工具

#### │ │ ├── BullMQ.ts // 消息队列工具类

#### │ │ ├── DateFormat.ts // 时间处理类

#### │ │ ├── Encryption // 非对称加密工具类

#### │ │ ├── Exceptions.ts // 异常处理类

#### │ │ ├── InitRedisData.ts // 初始化数据到 Redis

#### │ │ ├── Logger.ts // 日志打印类

#### │ │ ├── RedisTool.ts // redis 连接,封装方法

#### │ │ ├── ReqFilter.ts // 请求过滤接口

#### │ │ ├── ReqValidate // 请求参数验证

#### │ │ ├── ReturnResult // 返回结果封装处理

#### │ │ ├── TimedTask.ts // 定时任务类

#### │ └── App.ts // 项目主文件

#### ├── .babelrc // 运行时编译

#### ├── .prettierrc.js // 语法规范格式文件

#### ├── .docker-compose.yml // docker 镜像整合文件(配置镜像之间的网络依赖关系)

#### ├── .Dockerfile // docker打包成镜像配置文件

#### ├── ormconfig.json // orm 配置

#### ├── server.ts // 服务器启动文件

#### ├── tsconfig.ts // TS 配置文件

#### ├── shime-vue.d.ts // 模块声明函数

#### ├── tslint.json // 语法规范格式文件

