import { Browser, Frame, Page } from "puppeteer-core";
import { Action, ActionExecutor } from "../core/types";
import ConditionPlugin from "./condition";
import ScriptPlugin from "./script";
import FramePlugin from "./frame";
import FunctionPlugin from "./function";
import ModulePlugin from "./module";

export interface PluginContext<T> {
    browser:Browser
    page: Page;
    frame: Frame;
    json: T;
}

export interface JSONPlugin {
    name: string;
    run(ctx: PluginContext<any>): void | undefined | ActionExecutor | Action[] | Promise<void | undefined | ActionExecutor | Action[]>;
}

let plugin: JSONPlugin[] = [ConditionPlugin, FunctionPlugin, ScriptPlugin, FramePlugin, ModulePlugin];

export default plugin;
