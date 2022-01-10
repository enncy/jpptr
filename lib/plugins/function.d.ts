import { Page } from "puppeteer-core";
export declare class FunctionPlugin {
    invoke(page: Page, json: any): Promise<void>;
}
export interface FunctionPluginJSON {
    name: string;
    args: (string | number)[];
}
