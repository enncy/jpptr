import { describe, it } from "mocha";

import { jpptrProgramAction } from "../../src/commander";
import { executeProgramAction } from "../../src/commander/exec";

describe("command run test", () => {
    it("jpptr", async () => {
        await jpptrProgramAction("./jpptr.config.json", { cwd: __dirname });
    });

    it("jpptr exec", async () => {
        await executeProgramAction("./src/test.json", { cwd: __dirname });
    });
});
