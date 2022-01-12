"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayResolver = void 0;
var ArrayParser_1 = require("../parser/ArrayParser");
var types_1 = require("../types");
var ArrayResolver = /** @class */ (function () {
    function ArrayResolver() {
        this.arrayParser = new ArrayParser_1.ArrayParser();
    }
    ArrayResolver.prototype.resolve = function (ctx) {
        console.log("array");
        var newAction = this.arrayParser.parse(ctx.action);
        if (newAction) {
            ctx.action = newAction;
        }
        return ctx;
    };
    ArrayResolver = __decorate([
        types_1.Resolver("array"),
        __metadata("design:paramtypes", [])
    ], ArrayResolver);
    return ArrayResolver;
}());
exports.ArrayResolver = ArrayResolver;
