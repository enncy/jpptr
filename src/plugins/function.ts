import { Page } from "puppeteer-core";
import { Plugin } from "../core/types";

@Plugin("function")
export class FunctionPlugin {
    async invoke(page: Page, json: any) {
        console.log(json);
        const fun = Reflect.get(page, json.name);
        if (typeof fun === "function") {
            await Reflect.apply(fun, page, json.args);
        } else {
            // warning...
        }
    }
}

export interface FunctionPluginJSON {
    name: string;
    args: (string | number)[];
}
