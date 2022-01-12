"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var ArrayResolver_1 = require("./ArrayResolver");
var PluginContextSwitchableResolver_1 = require("./PluginContextSwitchableResolver");
exports.resolvers = [ArrayResolver_1.ArrayResolver, PluginContextSwitchableResolver_1.PluginContextSwitchableResolver];
