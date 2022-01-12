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
exports.Jsonsep = void 0;
var ObjectExecutor_1 = require("./executor/ObjectExecutor");
var ParserFactory_1 = require("./parser/ParserFactory");
var Jsonsep = /** @class */ (function () {
    function Jsonsep(options) {
        this.parserFactory = new ParserFactory_1.ParserFactory();
        this.objectExecutor = new ObjectExecutor_1.ObjectExecutor();
        this.parsers = this.parserFactory.all((options === null || options === void 0 ? void 0 : options.parserNames) || ["array", "page", "frame"]);
    }
    Jsonsep.prototype.parse = function (action) {
        for (var _i = 0, _a = this.parsers; _i < _a.length; _i++) {
            var parser = _a[_i];
            action = parser.parse(action) || action;
        }
        return action;
    };
    Jsonsep.prototype.parseAll = function (actions) {
        var _this = this;
        return actions.map(function (action) { return _this.parse(action); });
    };
    Jsonsep.prototype.execute = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var newContext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctx.action = this.parse(ctx.action);
                        return [4 /*yield*/, this.objectExecutor.execute(ctx)];
                    case 1:
                        newContext = _a.sent();
                        if (!(newContext && !Array.isArray(newContext.action) && newContext.action.actions)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.executeAll(newContext.action.actions, newContext)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** 全部解析 */
    Jsonsep.prototype.executeAll = function (actions, options) {
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
                        return [4 /*yield*/, this.execute({
                                browser: options.browser || options.page.browser(),
                                page: options.page,
                                frame: options.frame || options.page.mainFrame(),
                                action: action,
                            })];
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
    return Jsonsep;
}());
exports.Jsonsep = Jsonsep;
