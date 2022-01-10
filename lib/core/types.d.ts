import { LaunchOptions, BrowserLaunchArgumentOptions, BrowserConnectOptions, Product, Page, Frame } from "puppeteer-core";
export declare function Plugin(name: string): ClassDecorator;
export declare type PuppeteerOptions = LaunchOptions & BrowserLaunchArgumentOptions & BrowserConnectOptions & {
    product?: Product;
    extraPrefsFirefox?: Record<string, unknown>;
};
export declare abstract class JSONExecutor {
    page: Page;
    mainFrame: Frame;
    constructor(page: Page, mainFrame: Frame);
    abstract execute(...args: any[]): any;
}
export declare type ObjectAction = {
    [x: string]: any;
    use: string;
};
export declare type ArrayAction = [string, ...(string | number)[]];
export declare type Action = ArrayAction | ObjectAction;
export interface ActionExecutor {
    frame: Frame;
    actions: Action[];
}
export interface JSONSchema {
    options?: PuppeteerOptions;
    actions: Action[];
}
