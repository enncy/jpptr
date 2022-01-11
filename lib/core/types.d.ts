import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product } from "puppeteer-core";
import { Action, PluginContext } from "../plugins";
export declare type PuppeteerOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
};
export declare abstract class Executor {
    abstract execute(ctx: PluginContext<any>): any;
}
export interface JsonsepSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
