"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * frame 切换插件
 */
exports.default = {
    name: "frame",
    run: function (_a) {
        var browser = _a.browser, page = _a.page, frame = _a.frame, action = _a.action;
        var name = (action === null || action === void 0 ? void 0 : action.name) || (action === null || action === void 0 ? void 0 : action.frame);
        if (name) {
            var newFrame = frame;
            for (var _i = 0, _b = page.frames(); _i < _b.length; _i++) {
                var f = _b[_i];
                if (name === f.name()) {
                    newFrame = f;
                }
            }
            return { browser: browser, page: page, frame: newFrame, action: action };
        }
        return { browser: browser, page: page, frame: frame, action: action };
    },
};
