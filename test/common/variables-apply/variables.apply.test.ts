import { describe, it } from "mocha";
import { Jpptr } from "../../../src";

it("变量方法执行测试", async () => {
    await Jpptr.execute("./test.json", { cwd: __dirname });
});
