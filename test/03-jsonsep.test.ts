import { describe, it } from "mocha";
import path from "path";
import { createJsonsep } from "../src";

describe("03 jsonsep 浏览器运行测试", () => {
    it("运行", async () => {
        const json = require(path.resolve(__dirname, "./test.json"));
        const jsonsep = await createJsonsep(json);
        while (!jsonsep.end()) {
            await jsonsep.execute();
        }
    });
});
