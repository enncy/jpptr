"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayParser = void 0;
var types_1 = require("../types");
/**
 * 数组解析器
 */
var ArrayParser = /** @class */ (function () {
    function ArrayParser() {
    }
    ArrayParser.prototype.parse = function (action) {
        // 使用数组第一个值作为函数名,剩下的作为参数
        if (Array.isArray(action)) {
            var name_1 = action[0], args = action.slice(1);
            // 替换 action ，返回新的 object action
            if (name_1) {
                return {
                    use: "function",
                    name: name_1,
                    args: args || [],
                };
            }
        }
    };
    ArrayParser = __decorate([
        types_1.Parser("array")
    ], ArrayParser);
    return ArrayParser;
}());
exports.ArrayParser = ArrayParser;
