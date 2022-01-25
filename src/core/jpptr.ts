import { existsSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer-core";
import { JpptrProgramAction } from "../commander";
import { JpptrConfigHandler } from "./config.handler";
import { ActionExecutor } from "./executor";

import { JpptrOptions, JpptrSchema } from "./types";

/**
 * jpptr class
 */
export class Jpptr {
    options: JpptrOptions;

    constructor(options: JpptrOptions) {
        this.options = options;
    }

    /**
     * 实例化 jpptr
     * ****
     * 如果你的json动作文件不是在根目录，请添加 __dirname 去定位文件的路径
     * 或者使用 cwd 选项
     * ```js
     * const jpptr = Jpptr.from("./test.json",{cwd:__dirname});
     * ```
     */
    public static from(path: string, options?: { cwd: string }) {
        const cwd = options?.cwd || resolve(path, "../");
        const resolvedOptions = new JpptrConfigHandler(cwd).resolve(require(path));
        return new Jpptr(resolvedOptions);
    }

    /**
     * 启动配置文件
     * 如果你的配置文件不是在根目录，请添加 __dirname 去定位文件的路径
     * 或者使用 cwd 选项
     * ```js
     * await Jpptr.launch("./jpptr.config.json",{cwd:__dirname});
     * ```
     */
    public static async launch(path: string, options?: { cwd?: string }) {
        await JpptrProgramAction(path, options);
    }

    /**
     * 创建 executor 实例
     * 传入选项的参数，可覆盖 jpptr 的初始化参数
     * @param options jpptr实例化参数
     */
    public async createExecutor(options?: JpptrOptions): Promise<ActionExecutor<any>> {
        const { launch: launchOptions, register, actions } = options || this.options;
        /** 启动浏览器 */
        const browser = await puppeteer.launch(launchOptions);
        const [page] = await browser.pages();
        /** 实例化 */
        return new ActionExecutor({ register, actions, page });
    }
}
