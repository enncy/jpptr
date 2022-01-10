"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONExecutor = exports.Plugin = void 0;
function Plugin(name) {
    return function (target) {
        Reflect.defineMetadata("plugin:name", name, target);
    };
}
exports.Plugin = Plugin;
var JSONExecutor = /** @class */ (function () {
    function JSONExecutor(page) {
        this.page = page;
    }
    return JSONExecutor;
}());
exports.JSONExecutor = JSONExecutor;
