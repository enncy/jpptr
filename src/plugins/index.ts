import { Browser, Frame, Page } from "puppeteer-core";
import { ConditionPlugin, ConditionPluginParam } from "./condition";
import { FramePluginParam, FramePlugin } from "./frame";
import { PagePluginParam, PagePlugin } from "./page";
import { FunctionPluginParam, FunctionPlugin } from "./function";
import { Register } from "../core/register";

export interface ObjectAction {
    use: string;
    frame?: string | number;
    page?: number;
    actions?: Action[];
}

export type ArrayAction = [string, ...(string | number | boolean)[]];

export type Action = ArrayAction | ObjectAction | ConditionPluginParam | FramePluginParam | PagePluginParam | FunctionPluginParam;

export interface ActionContext<T extends Action> {
    browser?: Browser;
    page?: Page;
    frame?: Frame;
    action: T;
}

export type PluginReturnType<T extends Action> = void | undefined | T[] | ActionContext<T>;

export type PluginFunction = (ctx: ActionContext<any>) => PluginReturnType<Action> | Promise<PluginReturnType<Action>>;

export interface JpptrPluginError extends Error {}

export { ConditionPlugin, FramePlugin, FunctionPlugin, PagePlugin };

/**
 * 默认插件注册器
 */
export function defaultPlugins() {
    return new Register<PluginFunction>()
        .use(PluginNames["condition-plugin"], ConditionPlugin)
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
    "condition-plugin" = "condition",
}
