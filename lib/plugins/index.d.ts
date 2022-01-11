import { Browser, Frame, Page } from "puppeteer-core";
import { Action } from "../core/types";
export interface PluginContext<T> {
    browser: Browser;
    page: Page;
    frame: Frame;
    json: T;
}
export interface JSONPlugin {
    name: string;
    run(ctx: PluginContext<any>): void | undefined | PluginContext<any> | Action[] | Promise<void | undefined | PluginContext<any> | Action[]>;
}
declare let plugin: JSONPlugin[];
export default plugin;
