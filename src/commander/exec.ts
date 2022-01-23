import { Command } from "commander";
import glob from "glob";
import path, { resolve } from "path";
import { JpptrConfigHandler } from "../core/config.handler";
import { Jpptr } from "../core/jpptr";
import { JpptrSchema } from "../core/types";

/**
 * 执行 json 文件的命令
 */
export const ExecuteProgram = new Command();

ExecuteProgram.name("run")
    .description("run a single file with actions")
    .alias("exec")
    .argument("<file>", "json file with actions")
    .action(async (file, options) => {
        const jpptr = Jpptr.from(file);
        const execute = await jpptr.createExecutor();
        await execute.executeAll();
    })
    .addHelpText(
        "after",
        `
Examples:
jpptr run ./test.json
jpptr exec ./test.json
`
    );
