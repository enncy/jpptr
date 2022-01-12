"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserFactory = void 0;
var _1 = require(".");
var ParserFactory = /** @class */ (function () {
    function ParserFactory() {
    }
    ParserFactory.prototype.create = function (targetName) {
        for (var _i = 0, parsers_1 = _1.parsers; _i < parsers_1.length; _i++) {
            var target = parsers_1[_i];
            if (Reflect.getMetadata("parser:name", target) === targetName) {
                return new target();
            }
        }
    };
    ParserFactory.prototype.all = function (targetName) {
        var _this = this;
        return targetName.map(function (name) { return _this.create(name); }).filter(function (r) { return r !== undefined; });
    };
    return ParserFactory;
}());
exports.ParserFactory = ParserFactory;
