"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionPlugin = void 0;
var types_1 = require("../core/types");
/**
 * 条件判断插件
 */
var ConditionPlugin = /** @class */ (function () {
    function ConditionPlugin() {
    }
    ConditionPlugin.prototype.invoke = function (page, json) {
        return __awaiter(this, void 0, void 0, function () {
            var actions, _i, _a, elseif, action;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!json.if) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.if(page, json.if)];
                    case 1:
                        actions = _b.sent();
                        if (actions) {
                            return [2 /*return*/, actions];
                        }
                        return [3 /*break*/, 8];
                    case 2:
                        if (!json["else if"]) return [3 /*break*/, 7];
                        _i = 0, _a = json["else if"];
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        elseif = _a[_i];
                        return [4 /*yield*/, this.if(page, elseif)];
                    case 4:
                        action = _b.sent();
                        if (action) {
                            return [2 /*return*/, action];
                        }
                        _b.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, json.else];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 处理 if 语句
     * @param page 页面
     * @param ifJSON 语句体
     */
    ConditionPlugin.prototype.if = function (page, ifJSON) {
        return __awaiter(this, void 0, void 0, function () {
            var _if, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _if = ifJSON;
                        _a = _if.match;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.handle(page, _if.match, function (cdt, str) { return RegExp(cdt).test(str); })];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        // 处理正则表达式判断
                        if (_a) {
                            return [2 /*return*/, _if.actions];
                        }
                        // 处理字符串包含判断
                        else if (_if.include && this.handle(page, _if.include, function (cdt, str) { return str.indexOf(cdt) !== -1; })) {
                            return [2 /*return*/, _if.actions];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 处理条件
     * @param page page 页面
     * @param conditions 条件构造体
     * @param handler 处理器
     * @returns
     */
    ConditionPlugin.prototype.handle = function (page, conditions, handler) {
        return __awaiter(this, void 0, void 0, function () {
            var cdt, cdtCookie_1, cookies, tested, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cdt = conditions;
                        // 判断页面链接
                        if (cdt.url) {
                            if (handler(cdt.url, page.url())) {
                                return [2 /*return*/, true];
                            }
                        }
                        if (!cdt.cookie) return [3 /*break*/, 2];
                        cdtCookie_1 = cdt.cookie;
                        return [4 /*yield*/, page.cookies()];
                    case 1:
                        cookies = _c.sent();
                        tested = cookies.map(function (cookie) { return cookie.name + "=" + cookie.value; }).some(function (cookie) { return handler(cdtCookie_1, cookie); });
                        if (tested) {
                            return [2 /*return*/, true];
                        }
                        _c.label = 2;
                    case 2:
                        if (!cdt.text) return [3 /*break*/, 4];
                        _a = handler;
                        _b = [cdt.text];
                        return [4 /*yield*/, page.content()];
                    case 3:
                        if (_a.apply(void 0, _b.concat([_c.sent()]))) {
                            return [2 /*return*/, true];
                        }
                        _c.label = 4;
                    case 4:
                        if (!cdt.selector) return [3 /*break*/, 6];
                        return [4 /*yield*/, page.$(cdt.selector)];
                    case 5:
                        if (_c.sent()) {
                            return [2 /*return*/, true];
                        }
                        _c.label = 6;
                    case 6: return [2 /*return*/, false];
                }
            });
        });
    };
    ConditionPlugin = __decorate([
        types_1.Plugin("condition")
    ], ConditionPlugin);
    return ConditionPlugin;
}());
exports.ConditionPlugin = ConditionPlugin;
