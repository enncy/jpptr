import { Browser, Frame, Page } from "puppeteer-core";
import { SwitchPlugin, SwitchPluginParam } from "./switch";
import { FramePluginParam, FramePlugin } from "./frame";
import { PagePluginParam, PagePlugin } from "./page";
import { FunctionPluginParam, FunctionPlugin } from "./function";
import { Register } from "../core/register";

import { Action, Context } from "../core/types";

export type PluginReturnType<T extends Action> = void | undefined | T[] | Context<T>;

export type PluginFunction = (ctx: Context<any>) => PluginReturnType<Action> | Promise<PluginReturnType<Action>>;

export interface JpptrPluginError extends Error {}

export { SwitchPlugin, FramePlugin, FunctionPlugin, PagePlugin };

/**
 * 默认插件注册器
 */
export function defaultPlugins() {
    return new Register<PluginFunction>()
        .use(PluginNames["switch-plugin"], SwitchPlugin)
        .use(PluginNames["frame-plugin"], FramePlugin)
        .use(PluginNames["function-plugin"], FunctionPlugin)
        .use(PluginNames["page-plugin"], PagePlugin);
}

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
    "switch-plugin" = "switch",
}
