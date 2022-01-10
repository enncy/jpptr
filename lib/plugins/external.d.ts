import { Page } from "puppeteer-core";
export declare class ExternalPlugin {
    invoke(page: Page, json: any): Promise<void>;
}
export interface ExternalPluginJSON {
    url: string;
    file: string;
}
