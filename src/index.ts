import { launch } from "puppeteer-core";
import { DefaultExecutor } from "./core";
import { JsonsepSchema } from "./core/types";

export * from "./core";
export * from "./core/types";
export * from "./plugins";

export async function start(json: JsonsepSchema) {
    const browser = await launch(json.options);
    const [page] = await browser.pages();
    const executor = new DefaultExecutor();
    await executor.executeAll(json.actions, {
        frame: page.mainFrame(),
        page,
        browser,
    });
}
