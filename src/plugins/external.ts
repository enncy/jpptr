import { Page } from "puppeteer-core";
import { Plugin } from "../core/types";
import axios from "axios";

@Plugin("external")
export class ExternalPlugin {
    async invoke(page: Page, json: any) {
        if (json.url) {
            await page.addScriptTag(json.url);
        }
        if (json.file) {
            await page.addScriptTag(json.file);
        }
    }
}

export interface ExternalPluginJSON {
    url: string;
    file: string;
}
