import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame } from "puppeteer-core";
import { Action, ObjectAction, ActionContext, PluginFunction } from "../plugins";
import "reflect-metadata";
import { GlobalRegister } from "./executor";
import { ParserFunction } from "../parser";

export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

export interface JpptrOptions {
    register?: GlobalRegister;
    launch?: PuppeteerOptions;
    actions?: Action[];
}

export interface JpptrSchema {
    extends?: string;
    register?: ModuleRegister;
    launch?: PuppeteerOptions;
    actions?: Action[];
}

export interface ModuleRegister {
    plugins?: {
        name: string;
        plugin: string | PluginFunction;
    }[];
    parsers?: {
        name: string;
        parser: string | ParserFunction;
    }[];
}
