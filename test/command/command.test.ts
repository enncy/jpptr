import { launchCommandAction } from "./../../src/commander/launch";
import { executeCommandAction } from "./../../src/commander/exec";
import { describe, it } from "mocha";

describe("command run test", () => {
    it("jpptr", async () => {
        await launchCommandAction("./jpptr.config.json", { cwd: __dirname });
    });

    it("jpptr exec", async () => {
        await executeCommandAction("./src/test.json", { cwd: __dirname });
    });
});
