import { launch } from "puppeteer-core";
import { DefaultExecutor } from "./core";
import { JSONSchema } from "./core/types";

const test: JSONSchema = require("../cx.json");
  
launch(test.options)
    .then(async (browser) => {
        const [page] = await browser.pages();
        const executor = new DefaultExecutor(page, page.mainFrame());
        await executor.executeAll({
            actions: test.actions,
            frame: page.mainFrame(),
        });
    })
    .catch((err) => {
        console.error(["error", err]);
    });
