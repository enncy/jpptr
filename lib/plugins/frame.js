"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * frame 切换插件
 */
exports.default = {
    name: 'frame',
    invoke: function (_a) {
        var page = _a.page, frame = _a.frame, json = _a.json;
        for (var _i = 0, _b = page.frames(); _i < _b.length; _i++) {
            var frame_1 = _b[_i];
            if ((json === null || json === void 0 ? void 0 : json.name) === frame_1.name()) {
                return {
                    actions: json.actions,
                    frame: frame_1,
                };
            }
        }
    }
};
