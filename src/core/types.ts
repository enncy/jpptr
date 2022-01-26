import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame, Browser } from "puppeteer-core";

import "reflect-metadata";
import { ModuleRegister } from "./register";
import { ParserFunction } from "../parser";
import { PluginFunction } from "../plugins";
import { FramePluginParam } from "../plugins/frame";
import { FunctionPluginParam } from "../plugins/function";
import { PagePluginParam } from "../plugins/page";
import { SwitchPluginParam } from "../plugins/switch";

export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

export interface JpptrOptions {
    variables?: Variables;
    register?: ModuleRegister;
    launch?: PuppeteerOptions;
    actions?: Action[];
}

export interface JpptrSchema {
    variables: Variables;
    extends?: string;
    register?: ModuleRegisterSchema;
    launch?: PuppeteerOptions;
    actions?: Action[];
}

export interface ModuleRegisterSchema {
    plugins?: {
        name: string;
        plugin: string | PluginFunction;
    }[];
    parsers?: {
        name: string;
        parser: string | ParserFunction;
        priority: number;
    }[];
}

export interface ObjectAction {
    use: string;
    frame?: string | number;
    page?: number;
    actions?: Action[];
}

export type ArrayAction = [string, ...(string | number | boolean)[]];

export type Action = ArrayAction | ObjectAction | SwitchPluginParam | FramePluginParam | PagePluginParam | FunctionPluginParam;

export interface PuppeteerContext {
    browser?: Browser;
    page?: Page;
    frame?: Frame;
}

export interface ActionContext<T extends Action> {
    variables?: any;
    action: T;
}

export type Context<T extends Action> = PuppeteerContext & ActionContext<T>;

export type Variables = Record<string, any>;
