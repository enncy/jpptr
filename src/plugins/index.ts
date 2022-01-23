import { Browser, Frame, Page } from "puppeteer-core";
import { ConditionPlugin, ConditionPluginParam } from "./condition";
import { FramePluginParam, FramePlugin } from "./frame";
import { PagePluginParam, PagePlugin } from "./page";
import { FunctionPluginParam, FunctionPlugin } from "./function";
import { PluginNames } from "..";
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
