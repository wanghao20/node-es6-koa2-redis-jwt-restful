"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Filter = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var Base_1 = require("../config/Base");
var Constants_1 = require("../config/Constants");
var StaticStr_1 = require("../config/StaticStr");
var BullMQ_1 = require("./BullMQ");
var Logger_1 = require("./Logger");
var ReturnResult_1 = require("./ReturnResult");
/**
 * Created by wh on 2020/7/15
 * author: wanghao
 * @desc：请求验证/过滤
 */
var Filter = /** @class */ (function () {
    function Filter() {
        this.bull = new BullMQ_1.BullMQ();
    }
    /**
     * reqfilter
     * @desc：请求验证/过滤
     */
    Filter.prototype.reqfilter = function () {
        var _this = this;
        return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var url, decodedToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // 参数设置
                        ctx.params = __assign(__assign({}, ctx.request.body), ctx.query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        url = ctx.originalUrl.substring(0, ctx.originalUrl.indexOf("?"));
                        if (url === "") {
                            url = ctx.originalUrl;
                        }
                        if (!(Base_1.BaseConfig.OPEN_URL.indexOf(url) !== -1)) return [3 /*break*/, 3];
                        // 白名单接口直接通过
                        return [4 /*yield*/, next()];
                    case 2:
                        // 白名单接口直接通过
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        decodedToken = jsonwebtoken_1.verify(ctx.headers.authentication, Constants_1.JWT_SECRET);
                        // 解析token保存到中间
                        ctx.user = decodedToken.data; // 这里的key = 'user'
                        return [4 /*yield*/, next()];
                    case 4:
                        _a.sent();
                        // 保存用户操作日志
                        this.operateLog(ctx);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        this.catchError(ctx, error_1);
                        return [3 /*break*/, 7];
                    case 7:
                        // 判断404
                        if (ctx.status === 404 || ctx.status === 405) {
                            // 设置浏览器状态码
                            ctx.status = 200;
                            return [2 /*return*/, (ctx.body = ReturnResult_1.ReturnResult.errorMsg("未找到当前路径", 404))];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    };
    /**
     * 捕捉错误处理后记录日志
     * @param ctx koa
     * @param error 错误信息
     */
    Filter.prototype.catchError = function (ctx, error) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // 判断是否是参数错误
                if (error.msg) {
                    // 设置浏览器状态码
                    ctx.status = 200;
                    return [2 /*return*/, (ctx.body = ReturnResult_1.ReturnResult.errorMsg(error.msg, StaticStr_1.StaticStr.ERR_CODE_DEFAULT))];
                }
                else if (error.message === "invalid token" || error.message === "jwt must be provided" || error.message === "jwt expired") {
                    // 设置浏览器状态码
                    ctx.status = 200;
                    // token验证错误
                    return [2 /*return*/, (ctx.body = ReturnResult_1.ReturnResult.errorMsg("当前token失效", 401))];
                }
                else {
                    // 系统错误
                    Logger_1.logError(error.message, ctx.ip);
                    // 设置浏览器状态码
                    ctx.status = 200;
                    return [2 /*return*/, (ctx.body = ReturnResult_1.ReturnResult.errorMsg("服务器错误", 500))];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * 用户操作记录
     * @param ctx koa
     */
    Filter.prototype.operateLog = function (ctx) {
        // 记录日志
        // 过滤日志白名单
        // if (BaseConfig.NO_LOG_URL.indexOf(ctx.routerPath) === -1) {
        // 	// 添加到队列中处理
        // 	const tbLog: TbLog = {};
        // 	tbLog.userId = ctx.user.id;
        // 	tbLog.operationUrl = ctx.operationUrl;
        // 	tbLog.operationType = ctx.request.method;
        // 	this.bull.saveObj(tbLog, "tbLog");
        // }
        // 记录用户活跃统计
        // 暂时写在这里
        // const start2 = Date.now();
        // for(let i=0;i<100000;i++){
        // this.bull.saveActive("123456");
        // }
        // const ms2 = Date.now() - start2;
        // console.log("");
    };
    return Filter;
}());
exports.Filter = Filter;
