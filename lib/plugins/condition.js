"use strict";
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
/**
 * 条件判断插件
 */
exports.default = {
    name: "condition",
    run: function (_a) {
        var page = _a.page, frame = _a.frame, action = _a.action;
        return __awaiter(this, void 0, void 0, function () {
            var _b, actions, ifs, _i, ifs_1, _if, ifActions;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = action.actions, actions = _b === void 0 ? [] : _b;
                        ifs = [action.if].concat(action.elif);
                        _i = 0, ifs_1 = ifs;
                        _c.label = 1;
                    case 1:
                        if (!(_i < ifs_1.length)) return [3 /*break*/, 4];
                        _if = ifs_1[_i];
                        return [4 /*yield*/, handleIf(page, frame, action.if)];
                    case 2:
                        ifActions = _c.sent();
                        if (ifActions) {
                            return [2 /*return*/, actions.concat(ifActions)];
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, actions.concat(action.else)];
                }
            });
        });
    },
};
/**
 * 处理 if 语句
 */
function handleIf(page, frame, param) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = param.match;
                    if (!_a) return [3 /*break*/, 2];
                    return [4 /*yield*/, handleCondition({ page: page, frame: frame, conditions: param.match, handler: function (cdt, str) { return RegExp(cdt).test(str); } })];
                case 1:
                    _a = (_b.sent());
                    _b.label = 2;
                case 2:
                    // 处理正则表达式判断
                    if (_a) {
                        return [2 /*return*/, (param === null || param === void 0 ? void 0 : param.actions) || []];
                    }
                    // 处理字符串包含判断
                    else if (param.include && handleCondition({ page: page, frame: frame, conditions: param.include, handler: function (cdt, str) { return str.indexOf(cdt) !== -1; } })) {
                        return [2 /*return*/, (param === null || param === void 0 ? void 0 : param.actions) || []];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * 处理条件
 */
function handleCondition(_a) {
    var page = _a.page, frame = _a.frame, conditions = _a.conditions, handler = _a.handler;
    return __awaiter(this, void 0, void 0, function () {
        var cdt, cdtCookie_1, cookies, tested, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    cdt = conditions;
                    // 判断页面链接
                    if (cdt.url) {
                        if (handler(cdt.url, frame.url()) || handler(cdt.url, page.url())) {
                            return [2 /*return*/, true];
                        }
                    }
                    if (!cdt.cookie) return [3 /*break*/, 2];
                    cdtCookie_1 = cdt.cookie;
                    return [4 /*yield*/, page.cookies()];
                case 1:
                    cookies = _o.sent();
                    tested = cookies.map(function (cookie) { return cookie.name + "=" + cookie.value; }).some(function (cookie) { return handler(cdtCookie_1, cookie); });
                    if (tested) {
                        return [2 /*return*/, true];
                    }
                    _o.label = 2;
                case 2:
                    if (!cdt.text) return [3 /*break*/, 9];
                    _c = handler;
                    _d = [cdt.text];
                    return [4 /*yield*/, frame.content()];
                case 3:
                    _b = _c.apply(void 0, _d.concat([_o.sent()]));
                    if (_b) return [3 /*break*/, 5];
                    _e = handler;
                    _f = [cdt.text];
                    return [4 /*yield*/, page.content()];
                case 4:
                    _b = _e.apply(void 0, _f.concat([_o.sent()]));
                    _o.label = 5;
                case 5:
                    // html 内容
                    if (_b) {
                        return [2 /*return*/, true];
                    }
                    _h = handler;
                    _j = [cdt.text];
                    return [4 /*yield*/, frame.evaluate(function () { return document.body.innerText; })];
                case 6:
                    _g = _h.apply(void 0, _j.concat([_o.sent()]));
                    if (_g) return [3 /*break*/, 8];
                    _k = handler;
                    _l = [cdt.text];
                    return [4 /*yield*/, page.evaluate(function () { return document.body.innerText; })];
                case 7:
                    _g = _k.apply(void 0, _l.concat([_o.sent()]));
                    _o.label = 8;
                case 8:
                    // 纯文字内容
                    if (_g) {
                        return [2 /*return*/, true];
                    }
                    _o.label = 9;
                case 9:
                    if (!cdt.selector) return [3 /*break*/, 13];
                    return [4 /*yield*/, frame.evaluate(function (selector) { return document.querySelector(selector); }, cdt.selector)];
                case 10:
                    _m = (_o.sent());
                    if (_m) return [3 /*break*/, 12];
                    return [4 /*yield*/, page.evaluate(function (selector) { return document.querySelector(selector); }, cdt.selector)];
                case 11:
                    _m = (_o.sent());
                    _o.label = 12;
                case 12:
                    if (_m) {
                        return [2 /*return*/, true];
                    }
                    _o.label = 13;
                case 13: return [2 /*return*/, false];
            }
        });
    });
}
