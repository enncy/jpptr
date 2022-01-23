import { describe, it } from "mocha";
import path, { resolve } from "path";
import { Jpptr } from "../../src";
import { JpptrConfigHandler } from "../../src/core/config.handler";

describe("03 jpptr 浏览器运行测试", () => {
    it("运行", async () => {
        const jpptr = Jpptr.from(resolve("./test/common/test.json"));
        const execute = await jpptr.createExecutor();
        while (!execute.end()) {
            await execute.execute();
        }
    });
});
