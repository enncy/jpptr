import { Page } from "puppeteer-core";
import { Action } from "../core/types";
import { ConditionPlugin } from "./condition";
import { FunctionPlugin } from "./function";

export interface JSONPlugin {
    invoke(page: Page, json: any): void | undefined | Action[] | Promise<void | undefined | Action[]>;
}
export interface JSONPluginConstructor {
    new (): JSONPlugin;
}

let plugin: JSONPluginConstructor[] = [ConditionPlugin, FunctionPlugin];

export default plugin;
