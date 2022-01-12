import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame } from "puppeteer-core";
import { Action, ObjectAction, ActionContext } from "../plugins";
import "reflect-metadata";

export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

export interface Executor {
    execute(ctx: ActionContext<ObjectAction>): Promise<ActionContext<ObjectAction> | undefined>;
}

export interface ActionParser {
    parse(action: Action): ObjectAction | undefined;
}

export function Parser(name: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata("parser:name", name, target);
    };
}

export interface JsonsepSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
