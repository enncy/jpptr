"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
require("reflect-metadata");
function Parser(name) {
    return function (target) {
        Reflect.defineMetadata("parser:name", name, target);
    };
}
exports.Parser = Parser;
