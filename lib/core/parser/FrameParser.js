"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameParser = void 0;
var types_1 = require("../types");
var FrameParser = /** @class */ (function () {
    function FrameParser() {
    }
    FrameParser.prototype.parse = function (action) {
        if (action.frame) {
            var frame = action.frame, _a = action.actions, actions = _a === void 0 ? [] : _a, newAction = __rest(action, ["frame", "actions"]);
            action = {
                use: "frame",
                name: action.frame,
                actions: [newAction].concat(actions),
            };
            return action;
        }
    };
    FrameParser = __decorate([
        types_1.Parser("frame")
    ], FrameParser);
    return FrameParser;
}());
exports.FrameParser = FrameParser;
