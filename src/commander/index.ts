#!/usr/bin/env node

import { Command } from "commander";
import { ExecuteProgram } from "./exec";
import { resolve } from "path";
import glob from "glob";
import { Jpptr } from "..";
 
export interface ExecuteConfig {
    name: string;
    version: string;
    include: string[];
    exclude: string[];
}

export const JpptrProgram = new Command();

JpptrProgram.name("jpptr").version("1.0.0");

JpptrProgram.argument("[file]", "the jpptr config file", "jpptr.config.json")

    .description("Execute the jpptr config file")
    .action(async (file, options) => {
        const config: ExecuteConfig = require(resolve(file));

        /** 查找配置文件 */
        const paths = config.include
            .map((path) =>
                glob.sync(path, {
                    ignore: config.exclude,
                })
            )
            .flat()
            .map((p) => resolve(p));

        /** 根据每个配置文件实例化 */
        const jpptrs = await Promise.all(paths.map((path) => Jpptr.from(path)));

        /** 创建执行器 */
        const executors = await Promise.all(jpptrs.map((j) => j.createExecutor()));

        /** 全部执行 */
        await Promise.all(executors.map((e) => e.executeAll()));
    })
    .addHelpText(
        "after",
        `
Examples:
jpptr
jpptr ./test/jpptr.config.json
`
    );

JpptrProgram.addCommand(ExecuteProgram);

JpptrProgram.parse(process.argv);
