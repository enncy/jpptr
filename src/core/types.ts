import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame } from "puppeteer-core";
import { Action, PluginContext } from "../plugins";

export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

export abstract class Executor {
    abstract execute(ctx: PluginContext<any>): any;
}


export interface JsonsepSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
