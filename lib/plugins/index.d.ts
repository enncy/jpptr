import { Frame, Page } from "puppeteer-core";
import { Action, ActionExecutor } from "../core/types";
export interface PluginContext<T> {
    page: Page;
    frame: Frame;
    json: T;
}
export interface JSONPlugin {
    name: string;
    invoke(ctx: PluginContext<any>): void | undefined | ActionExecutor | Action[] | Promise<void | undefined | ActionExecutor | Action[]>;
}
declare let plugin: JSONPlugin[];
export default plugin;
