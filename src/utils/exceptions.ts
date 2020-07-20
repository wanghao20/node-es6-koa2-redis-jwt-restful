
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc： 异常处理
 */
export class BaseException extends Error {
  // 状态码
  code: number;
  // 提示信息
  msg: string;
}

// tslint:disable-next-line:max-classes-per-file
export class NotFoundException extends BaseException {
  code = 404;

  constructor(msg?: string) {
    super();
    this.msg = msg || '无此内容';
  }
}

// tslint:disable-next-line:max-classes-per-file
export class UnauthorizedException extends BaseException {
  code = 401;

  constructor(msg?: string) {
    super();
    this.msg = msg || '尚未登录';
  }
}
// tslint:disable-next-line:max-classes-per-file
export class ForbiddenException extends BaseException {
  code = 403;

  constructor(msg?: string) {
    super();
    this.msg = msg || '权限不足';
  }
}
/**
 * 数据验证异常
 * 自定义返回信息和code
 */
// tslint:disable-next-line:max-classes-per-file
export class VerifyException extends BaseException {
  constructor(msg: string, code: number) {
    super();
    this.msg = msg || '信息错误';
    this.code = code;
  }
}