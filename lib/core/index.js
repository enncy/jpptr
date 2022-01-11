"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.DefaultExecutor = exports.ObjectExecutor = exports.ArrayExecutor = void 0;
require("reflect-metadata");
var plugins_1 = __importStar(require("../plugins"));
var types_1 = require("./types");
/**
 * 数组解析器
 */
var ArrayExecutor = /** @class */ (function (_super) {
    __extends(ArrayExecutor, _super);
    function ArrayExecutor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArrayExecutor.prototype.execute = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var key, fun, pageFun;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(ctx.action);
                        key = ctx.action.shift();
                        if (!key) return [3 /*break*/, 6];
                        fun = Reflect.get(ctx.frame, key);
                        if (!fun) return [3 /*break*/, 3];
                        if (!(typeof fun === "function")) return [3 /*break*/, 2];
                        return [4 /*yield*/, Reflect.apply(fun, ctx.frame, ctx.action)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 6];
                    case 3:
                        pageFun = Reflect.get(ctx.page, key);
                        if (!pageFun) return [3 /*break*/, 6];
                        if (!(typeof pageFun === "function")) return [3 /*break*/, 5];
                        return [4 /*yield*/, Reflect.apply(pageFun, ctx.page, ctx.action)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return ArrayExecutor;
}(types_1.Executor));
exports.ArrayExecutor = ArrayExecutor;
/**
 * 对象解析器
 * 加载内置插件，并对json进行解析运行
 */
var ObjectExecutor = /** @class */ (function (_super) {
    __extends(ObjectExecutor, _super);
    function ObjectExecutor() {
        var _this = _super.call(this) || this;
        _this.arrayExecutor = new ArrayExecutor();
        _this.plugins = plugins_1.default;
        return _this;
    }
    ObjectExecutor.prototype.execute = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, plugin, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!ctx.action.use) return [3 /*break*/, 4];
                        _i = 0, _a = this.plugins;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        plugin = _a[_i];
                        if (!(plugin.name === ctx.action.use)) return [3 /*break*/, 3];
                        return [4 /*yield*/, plugin.run(ctx)];
                    case 2:
                        result = _b.sent();
                        // 如果存在返回值，则处理
                        if (result) {
                            // 如果返回新的执行列表，则执行
                            if (Array.isArray(result)) {
                                ctx.action.actions = result;
                                return [2 /*return*/, ctx];
                            }
                            // 如果返回新的上下文，则直接使用此上下文
                            else {
                                return [2 /*return*/, result];
                            }
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ObjectExecutor;
}(types_1.Executor));
exports.ObjectExecutor = ObjectExecutor;
/**
 * 默认的解析器
 */
var DefaultExecutor = /** @class */ (function (_super) {
    __extends(DefaultExecutor, _super);
    function DefaultExecutor() {
        var _this = _super.call(this) || this;
        _this.arrayExecutor = new ArrayExecutor();
        _this.objectExecutor = new ObjectExecutor();
        return _this;
    }
    DefaultExecutor.prototype.execute = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var newCtx, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(typeof ctx.action !== "object" && Array.isArray(ctx.action))) return [3 /*break*/, 1];
                        return [3 /*break*/, 7];
                    case 1:
                        if (!Array.isArray(ctx.action)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.arrayExecutor.execute(ctx)];
                    case 2:
                        _c.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        _b = (_a = this.objectExecutor).execute;
                        return [4 /*yield*/, plugins_1.switchPluginContext(ctx)];
                    case 4: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                    case 5:
                        newCtx = _c.sent();
                        if (!(newCtx && !Array.isArray(newCtx.action) && newCtx.action.actions)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.executeAll(newCtx.action.actions, newCtx)];
                    case 6:
                        _c.sent();
                        _c.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    DefaultExecutor.prototype.executeAll = function (actions, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, actions_1, action, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, actions_1 = actions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < actions_1.length)) return [3 /*break*/, 6];
                        action = actions_1[_i];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.execute(__assign(__assign({}, ctx), { action: action }))];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(["error", e_1]);
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return DefaultExecutor;
}(types_1.Executor));
exports.DefaultExecutor = DefaultExecutor;
