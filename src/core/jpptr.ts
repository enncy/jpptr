import { existsSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer-core";
import { JpptrConfigHandler } from "./config.handler";
import { ActionExecutor } from "./executor";

import { JpptrOptions, JpptrSchema } from "./types";

/**
 * jpptr class
 * ### install
 * ```shell
 * npm i jpptr
 * ```
 * ### Use command
 * ```shell
 * jpptr config.json
 * ```
 * ### Use programing
 * ```ts
 * // use json file
 * Jpptr.create("./test.json")
 * // or js
 * Jpptr.create({
 *      extends:'...',
 *      options:{...}
 *      register:{...}
 *      actions:[...]
 * })
 * ```
 */
export class Jpptr {
    options: JpptrOptions;

    constructor(options: JpptrOptions) {
        this.options = options;
    }

    /**  实例化 jpptr */
    public static create(options: JpptrOptions) {
        return new Jpptr(options);
    }

    /** 从文件路径实例化 jpptr */
    public static from(path: string) {
        const cwd = resolve(path, "../");
        const options = new JpptrConfigHandler(cwd).resolve(require(path));
        return new Jpptr(options);
    }

    /**
     * 创建 executor 实例
     * @param config 配置文件
     */
    public async createExecutor(): Promise<ActionExecutor<any>> {
        const { launch: launchOptions, register, actions } = this.options;
        /** 启动浏览器 */
        const browser = await puppeteer.launch(launchOptions);
        const [page] = await browser.pages();
        /** 实例化 */
        return new ActionExecutor({ register, actions, page });
    }
}
