import { Browser, Frame, Page } from "puppeteer-core";
import ConditionPlugin from "./condition";
import ScriptPlugin from "./script";
import FramePlugin from "./frame";
import PagePlugin from "./page";
import FunctionPlugin from "./function";
import ModulePlugin from "./module";

export interface ObjectAction {
    [x: string]: any;
    use: string;
    frame?: string;
    page?: number;
    actions?: Action[];
}

export type ArrayAction = [string, ...(string | number)[]];

export type Action = ArrayAction | ObjectAction;

export interface PluginContext<T extends Action> {
    browser: Browser;
    page: Page;
    frame: Frame;
    action: T;
}

export interface Plugin {
    name: string;
    run(ctx: PluginContext<any>): void | undefined | PluginContext<Action> | Action[] | Promise<void | undefined | PluginContext<Action> | Action[]>;
}

export async function switchPluginContext(ctx: PluginContext<any>) {
    if (Array.isArray(ctx.action)) {
        // warning...
    } else {
        if (ctx.action.page) {
            ctx = await PagePlugin.run(ctx); 
        }
        if (ctx.action.frame) {
            ctx = await FramePlugin.run(ctx);
        }
    }

    return ctx;
}

let plugin: Plugin[] = [ConditionPlugin, FunctionPlugin, ScriptPlugin, FramePlugin, PagePlugin, ModulePlugin];

export default plugin;
