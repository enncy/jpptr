"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * frame 切换插件
 */
exports.default = {
    name: "frame",
    run: function (_a) {
        var browser = _a.browser, page = _a.page, frame = _a.frame, json = _a.json;
        for (var _i = 0, _b = page.frames(); _i < _b.length; _i++) {
            var f = _b[_i];
            if ((json === null || json === void 0 ? void 0 : json.name) === f.name()) {
                return { browser: browser, page: page, frame: f, json: json.actions };
            }
        }
    },
};
