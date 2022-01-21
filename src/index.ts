import { Register } from "./core/register";
import { Walker } from "./core/walker";

export { Action, ObjectAction, ArrayAction, ActionContext } from "./plugins/index";
export { Jpptr, createJpptr, defaultParsers, defaultPlugins } from "./core/jpptr";
export { ActionExecutor } from "./core/executor";
export { JpptrSchema, PuppeteerOptions } from "./core/types";
export { PluginFunction, PluginReturnType } from "./plugins";
export { Parser, ParserFunction } from "./parser";

export { Register, Walker };

/**
 * 默认插件名
 */
export enum PluginNames {
    /** 方法调用插件 */
    "function-plugin" = "function",
    /** 框架切换插件，配合框架解析器使用 */
    "frame-plugin" = "frame",
    /** 页面切换插件，配合页面解析器使用 */
    "page-plugin" = "page",
    /** 条件插件 */
    "condition-plugin" = "condition",
}

/**
 * 默认解析器名
 *
 * @category Parser
 */
export enum ParserNames {
    /** 数组解析器 */
    "array-parser" = "array",
    /** 外部模块解析器 */
    "external-parser" = "external",
    /** 页面框架切换解析器 */
    "frame-parser" = "frame",
    /** 页面切换解析器 */
    "page-parser" = "page",
}
