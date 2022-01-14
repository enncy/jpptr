import { Register } from "./core/register";
import { Walker } from "./core/walker";
export { Jsonsep, createJsonsep, defaultParsers, defaultPlugins } from "./core/jsonsep";
export { ActionExecutor } from "./core/executor";
export { JsonsepSchema, PuppeteerOptions } from "./core/types";
export { PluginFunction, PluginReturnType } from "./plugins";
export { Parser, ParserFunction } from "./parser";

export { Register, Walker };

export enum PluginNames {
    "condition-plugin" = "condition",
    "frame-plugin" = "frame",
    "function-plugin" = "function",
    "page-plugin" = "page",
}

export enum ParserNames {
    "array-parser" = "array",
    "external-parser" = "external",
    "frame-parser" = "frame",
    "page-parser" = "page",
}
