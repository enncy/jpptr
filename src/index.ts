import { launch } from "puppeteer-core";
import { DefaultExecutor } from "./core";
import { JSONSchema } from "./core/types";

const test: JSONSchema = require("../test.json");

launch(test.options)
    .then(async (browser) => {
        const [page] = await browser.pages();
        const executor = new DefaultExecutor(page);
        await executor.executeAll(test.actions);
    })
    .catch((err) => {
        console.error(["error", err]);
    });
