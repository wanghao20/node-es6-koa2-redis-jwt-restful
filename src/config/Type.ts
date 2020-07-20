import { Context, Next } from "koa"
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：类型定义
 */
type ResData = {
  code: number;
  msg?: string;
  data?: any;
  err?: any;
}
// type PlainObject = { [P: string]: any };
type PlainObject = Record<string, any>;
type MysqlResult = {
  affectedRows?: number;
  insertId?: string;
}

type RouteMeta = {
  name: string;
  method: string;
  path: string;
}

type MiddleWare = (...arg: any[]) => (ctx: Context, next?: Next) => Promise<void>;



export {
  ResData,
  MysqlResult,
  PlainObject,
  RouteMeta,
  MiddleWare,
}