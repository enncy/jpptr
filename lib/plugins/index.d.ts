import { Browser, Frame, Page } from "puppeteer-core";
export interface ObjectAction {
    [x: string]: any;
    use: string;
    frame?: string;
    page?: number;
    actions?: Action[];
}
export declare type ArrayAction = [string, ...(string | number)[]];
export declare type Action = ArrayAction | ObjectAction;
export interface PluginContext<T extends Action> {
    browser: Browser;
    page: Page;
    frame: Frame;
    action: T;
}
export interface Plugin {
    name: string;
    run(ctx: PluginContext<any>): void | undefined | PluginContext<Action> | Action[] | Promise<void | undefined | PluginContext<Action> | Action[]>;
}
export declare function switchPluginContext(ctx: PluginContext<any>): Promise<PluginContext<any>>;
declare let plugin: Plugin[];
export default plugin;
