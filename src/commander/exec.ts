#!/usr/bin/env node

import { Command } from "commander";
import path from "path";
import { Jpptr } from "../core/jpptr";

/**
 * 执行 json 文件的命令
 */
export const ExecuteProgram = new Command();

ExecuteProgram.name("run")
    .description("run a single file with actions")
    .alias("exec")
    .argument("<file>", "json file with actions")
    .option("-c, --cwd", "command working directory, default : process.cwd()")
    .action(executeProgramAction)
    .addHelpText(
        "after",
        `
Examples:
jpptr run ./test.json
jpptr exec ./test.json
`
    );

export async function executeProgramAction(file: string, options?: { cwd?: string }) {
    const jpptr = Jpptr.from(path.resolve(options?.cwd || process.cwd(), file));
    const execute = await jpptr.createExecutor();
    await execute.executeAll();
}
