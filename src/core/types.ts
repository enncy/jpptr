import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame } from "puppeteer-core";
import { Action, ObjectAction, ActionContext } from "../plugins";
import "reflect-metadata";

export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

export interface JsonsepSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
