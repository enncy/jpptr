"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsers = void 0;
var PageParser_1 = require("./PageParser");
var ArrayParser_1 = require("./ArrayParser");
var FrameParser_1 = require("./FrameParser");
exports.parsers = [PageParser_1.PageParser, ArrayParser_1.ArrayParser, FrameParser_1.FrameParser];
