import { Page } from "puppeteer-core";
import { Action } from "../core/types";
export interface JSONPlugin {
    invoke(page: Page, json: any): void | undefined | Action[] | Promise<void | undefined | Action[]>;
}
export interface JSONPluginConstructor {
    new (): JSONPlugin;
}
declare let plugin: JSONPluginConstructor[];
export default plugin;
