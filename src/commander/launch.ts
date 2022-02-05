#! /usr/bin/env node

import { Command } from "commander";
import { executeCommand } from "./exec";
import { dirname, resolve } from "path";
import glob from "glob";
import { Jpptr } from "..";

export interface ExecuteConfig {
    name: string;
    version: string;
    include: string[];
    exclude: string[];
}

export const launchCommand = new Command();

launchCommand.name("jpptr").version("1.0.0");

launchCommand
    .argument("[file]", "the jpptr config file", "jpptr.config.json")
    .option("-c, --cwd", "command working directory, default : process.cwd()")
    .description("Execute the jpptr config file")
    .action(launchCommandAction)
    .addHelpText(
        "after",
        `
Examples:
jpptr
jpptr ./test/jpptr.config.json 
`
    );

launchCommand.addCommand(executeCommand);

export async function launchCommandAction(file: string, options?: { cwd?: string }) {
    const cwd = options?.cwd || process.cwd();
    const config: ExecuteConfig = Jpptr.readJsonFile(resolve(cwd, file));

    /** 查找配置文件 */
    const paths = config.include
        .map((path) =>
            glob.sync(path, {
                cwd,
                ignore: config.exclude,
                absolute: true,
            })
        )
        .flat();

    /** 根据每个配置文件实例化 */
    const jpptrs = await Promise.all(paths.map((path) => Jpptr.from(path, { cwd: dirname(path) })));

    /** 创建执行器 */
    const executors = await Promise.all(jpptrs.map((j) => j.createExecutor()));

    /** 全部执行 */
    await Promise.all(executors.map((e) => e.executeAll()));
}
