import { Browser, launch, Page } from "puppeteer-core";
import { Jsonsep } from "./core";
import { JsonsepSchema } from "./core/types";
import { Action, ActionContext } from "./plugins";
import { ConditionPlugin } from "./plugins/condition";
import { FramePlugin } from "./plugins/frame";
import { FunctionPlugin } from "./plugins/function";
import { ModulePlugin } from "./plugins/module";
import { PagePlugin } from "./plugins/page";

export * from "./core";
export * from "./core/types";
export * from "./plugins";

export async function start(json: JsonsepSchema) {
    const jsonsep = new Jsonsep();
    const browser = await launch(json.options);
    const [page] = await browser.pages();

    jsonsep.use("condition", ConditionPlugin).use("frame", FramePlugin).use("function", FunctionPlugin).use("module", ModulePlugin).use("page", PagePlugin);

    jsonsep.executeAll(json.actions, { browser, page, frame: page.mainFrame() });
}
