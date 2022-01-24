import { describe, it } from "mocha";
import { expect } from "chai";
import { JpptrProgramAction } from "../../src/commander";
import { ExecuteProgramAction } from "../../src/commander/exec";
import path from "path";

describe("command run test", () => {
    it("jpptr", async () => {
        await JpptrProgramAction("./jpptr.config.json", { cwd: __dirname });
    });

    it("jpptr exec", async () => {
        await ExecuteProgramAction("./src/test.json", { cwd: __dirname });
    });
});
