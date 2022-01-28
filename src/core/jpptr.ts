import { resolve } from "path";
import puppeteer from "puppeteer-core";
import { jpptrProgramAction } from "../commander";
import { JpptrConfigHandler } from "./config.handler";
import { ActionExecutor } from "./executor";
import { readFileSync } from "fs";
import { JpptrOptions } from "./types";
import stripJsonComments from "strip-json-comments";
import { startDebug } from "./debugger";

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
        const content = this.readJsonFile(path);
        const resolvedOptions = new JpptrConfigHandler(cwd).resolve(content);
        return new Jpptr(resolvedOptions);
    }

    /** 解析可带注释的 json 文件 */
    public static readJsonFile(path: string): any {
        return JSON.parse(stripJsonComments(readFileSync(path).toString()));
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
        await jpptrProgramAction(path, options);
    }

    /**
     * 创建 executor 实例
     * 传入选项的参数，可覆盖 jpptr 的初始化参数
     * @param options jpptr实例化参数
     */
    public async createExecutor(options?: JpptrOptions): Promise<ActionExecutor<any>> {
        const opts = Object.assign({}, this.options, options);
        const { launch: launchOptions, register, actions, variables } = opts;
        /** 启动浏览器 */
        const browser = await puppeteer.launch(launchOptions);
        const [page] = await browser.pages();
        /** 实例化 */
        const executor = new ActionExecutor({ register, actions, page, variables });
        if (options?.debug) {
            startDebug(opts, executor as any);
        }
        return executor;
    }
}
