import { Browser, launch, Page } from "puppeteer-core";
import { Jsonsep } from "./core";
import { JsonsepSchema } from "./core/types";
import { Action, ActionContext } from "./plugins";

export * from "./core";
export * from "./core/types";
export * from "./plugins";
 
export async function start(json: JsonsepSchema) {
    const jsonsep = new Jsonsep();
    const browser = await launch(json.options);
    const [page] = await browser.pages();
    jsonsep.executeAll(json.actions, { browser, page, frame: page.mainFrame() });
}
