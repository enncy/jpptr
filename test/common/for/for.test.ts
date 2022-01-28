import { describe, it } from "mocha";
import { Jpptr } from "../../../src";

it("for模板循环测试", async () => {
    await Jpptr.execute("./test.json", { cwd: __dirname });
});
