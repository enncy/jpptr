import { describe, it } from "mocha";
import path from "path";
import { createJpptr } from "../src";

describe("03 jpptr 浏览器运行测试", () => {
    it("运行", async () => {
        const json = require(path.resolve(__dirname, "./test.json"));
        const jpptr = await createJpptr(json);
        while (!jpptr.end()) {
            await jpptr.execute();
        }
    });
});
