import { SwitchPlugin } from "./switch";
import { FramePlugin } from "./frame";
import { PagePlugin } from "./page";
import { FunctionPlugin } from "./function";
import { Register } from "../core/register";

import { Action, Context } from "../core/types";

import { VariablesPlugin } from "./variables";
import { ForPlugin } from "./for";
import { PluginParams } from "../core/schema";

export type PluginReturnType<T extends Action> = void | undefined | T[] | Partial<Context<T>>;

export type PluginFunction = (ctx: Context<any>) => PluginReturnType<Action> | Promise<PluginReturnType<Action>>;

export interface JpptrPluginError extends Error {}

export { SwitchPlugin, FramePlugin, FunctionPlugin, PagePlugin, VariablesPlugin };

/**
 * default plugins
 */
export function defaultPlugins() {
    return new Register<keyof PluginParams, PluginFunction>()
        .use("switch", SwitchPlugin)
        .use("frame", FramePlugin)
        .use("function", FunctionPlugin)
        .use("page", PagePlugin)
        .use("variables", VariablesPlugin)
        .use("for", ForPlugin);
}
