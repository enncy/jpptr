import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame } from "puppeteer-core";

export function Plugin(name: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata("plugin:name", name, target);
    };
}

export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

export abstract class JSONExecutor {
    constructor(public page: Page,public mainFrame:Frame) {}
    abstract execute(...args: any[]): any;
}

export type ObjectAction = {
    [x: string]: any;
    use: string;
};

export type ArrayAction = [string, ...(string | number)[]];

export type Action = ArrayAction | ObjectAction;

export interface ActionExecutor {
    frame: Frame;
    actions: Action[];
}

export interface JSONSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
