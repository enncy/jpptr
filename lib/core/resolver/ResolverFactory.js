"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverFactory = void 0;
var _1 = require(".");
var ResolverFactory = /** @class */ (function () {
    function ResolverFactory() {
    }
    ResolverFactory.prototype.create = function (targetName) {
        for (var _i = 0, resolvers_1 = _1.resolvers; _i < resolvers_1.length; _i++) {
            var target = resolvers_1[_i];
            if (Reflect.getMetadata("resolver:name", target) === targetName) {
                return new target();
            }
        }
    };
    ResolverFactory.prototype.all = function (targetName) {
        var _this = this;
        return targetName.map(function (name) { return _this.create(name); }).filter(function (r) { return r !== undefined; });
    };
    return ResolverFactory;
}());
exports.ResolverFactory = ResolverFactory;
