import { Browser, Frame, Page } from "puppeteer-core";
import { ConditionPluginParam } from "./condition";
import { FramePlugin, FramePluginParam } from "./frame";
import { PagePlugin, PagePluginParam } from "./page";
import { FunctionPluginParam } from "./function";
import { ModulePluginParam } from "./module";

export interface ObjectAction {
    use: string;
    frame?: string;
    page?: number;
    actions?: Action[];
}

export type ArrayAction = [string, ...(string | number | boolean)[]];

export type Action = ArrayAction | ObjectAction | ConditionPluginParam | FramePluginParam | PagePluginParam | FunctionPluginParam | ModulePluginParam;

export interface ActionContext<T extends Action> {
    browser: Browser;
    page: Page;
    frame: Frame;
    action: T;
}

export type PluginReturnType<T extends Action> = void | undefined | T[] | ActionContext<T>;

export type PluginFunction  = (ctx: ActionContext<any>) => PluginReturnType<Action> | Promise<PluginReturnType<Action>>;

/**
 * 转换插件上下文
 * 用于切换每个 action 中所指定的 page 或者 frame 选项
 * @param ctx
 * @returns
 */
export async function switchActionContext(ctx: ActionContext<any>) {
    if (Array.isArray(ctx.action)) {
        // warning...
    } else {
        if (ctx.action.page) {
            ctx = await PagePlugin(ctx);
        }
        if (ctx.action.frame) {
            ctx = await FramePlugin(ctx);
        }
    }

    return ctx;
}
