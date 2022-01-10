"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var condition_1 = __importDefault(require("./condition"));
var script_1 = __importDefault(require("./script"));
var frame_1 = __importDefault(require("./frame"));
var function_1 = __importDefault(require("./function"));
var module_1 = __importDefault(require("./module"));
var plugin = [condition_1.default, function_1.default, script_1.default, frame_1.default, module_1.default];
exports.default = plugin;
