import { describe, it } from "mocha";
import { expect } from "chai";
import { JpptrProgram } from "../../src/commander";
import { ExecuteProgram } from "../../src/commander/exec";
import path from "path";

describe("command run test", () => {
    it("jpptr", async () => {
        await JpptrProgram.parseAsync([path.resolve(__dirname, "./jpptr.config.json")], { from: "user" });
    });

    it("jpptr exec", async () => {
        await ExecuteProgram.parseAsync([path.resolve(__dirname, "./src/test.json")], { from: "user" });
    });
});
