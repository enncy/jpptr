import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame } from "puppeteer-core";
import { PluginContext } from "../plugins";
 
export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

export abstract class Executor {
    abstract execute<T extends Action>(ctx: PluginContext<T>): any;
}

export type ObjectAction = {
    [x: string]: any;
    use: string;
};

export type ArrayAction = [string, ...(string | number)[]];

export type Action = ArrayAction | ObjectAction;

export interface JsonsepSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
