import { describe, it } from "mocha";
import { resolve } from "path";
import { Jpptr } from "../../../src";

describe("变量赋值测试", () => {
    it("运行", async () => {
        const jpptr = Jpptr.from(resolve(__dirname, "./test.json"));

        const execute = await jpptr.createExecutor();
        while (!execute.end()) {
            await execute.execute();
        }
    });
});
