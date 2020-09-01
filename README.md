# dfs-ums-server


## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [reids](https://redis.io/)在Base.ts内配置redis连接。本项目技术栈基于 [typescript](https://www.typescriptlang.org/)、[限流](https://github.com/koajs/ratelimit)、[BullMQ](https://github.com/OptimalBits/bull#uis)、[HyperLogLog](https://juejin.im/post/6844904097666039816) 、[redis分布式锁](https://redis.io/) 、[Joi](https://hapi.dev/module/joi/) 和 [typeorm](https://github.com/typeorm/typeorm)

## 目录结构

本项目已经为你生成了一个完整的开发框架，提供了后台开发的各类功能和坑位，下面是整个项目的目录结构。

```bash
├── logs                       # 日志
├── src                        # 源代码
│   ├── config                 # 项目配置类
│   ├── controllers            # 请求控制类
│   ├── entity                 # 实体类定义
│   ├── routes                 # 路由文件
│   ├── service                # 全局布局
│   ├── router                 # 服务提供类
│   ├── format                 # 格式化项目的一些定义文件
│   ├── utils                  # 工具类
├── .App                      # 项目主文件
├── .babelrc                  # 运行时编译
├── .ormconfig                #  orm 配置
├── server.ts                 # 服务器启动文件
├── tsconfig                  # 配置文件
├── package.json              # package.json 依赖
```

## 如何设置以及启动项目

### 安装依赖

```bash
npm install
```

### 启动本地开发环境

```bash
npm start
```
                                                         