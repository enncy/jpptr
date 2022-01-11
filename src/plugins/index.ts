import { Browser, Frame, Page } from "puppeteer-core";
import { Action } from "../core/types";
import ConditionPlugin from "./condition";
import ScriptPlugin from "./script";
import FramePlugin from "./frame";
import FunctionPlugin from "./function";
import ModulePlugin from "./module";

export interface PluginContext<T> {
    browser: Browser;
    page: Page;
    frame: Frame;
    action: T;
}

export interface Plugin {
    name: string;
    run(ctx: PluginContext<any>): void | undefined | PluginContext<any> | Action[] | Promise<void | undefined | PluginContext<any> | Action[]>;
}

let plugin: Plugin[] = [ConditionPlugin, FunctionPlugin, ScriptPlugin, FramePlugin, ModulePlugin];

export default plugin;
