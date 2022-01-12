import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product } from "puppeteer-core";
import { Action, ObjectAction, ActionContext } from "../plugins";
import "reflect-metadata";
export declare type PuppeteerOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
};
export interface Executor {
    execute(ctx: ActionContext<ObjectAction>): Promise<ActionContext<ObjectAction> | undefined>;
}
export interface ActionParser {
    parse(action: Action): ObjectAction | undefined;
}
export declare function Parser(name: string): ClassDecorator;
export interface JsonsepSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
