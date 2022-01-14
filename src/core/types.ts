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
    register?: ModuleRegister;
    options?: PuppeteerOptions;
    actions: Action[];
}

export interface ModuleRegister {
    plugins?: {
        name: string;
        path: string;
    }[];
    parsers?: {
        name: string;
        path: string;
    }[];
}
