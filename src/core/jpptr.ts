import { dirname, resolve } from "path";
import puppeteer from "puppeteer-core";
import { launchCommandAction } from "../commander/launch";
import { JpptrConfigHandler } from "./config.handler";
import { ActionExecutor } from "./executor";
import { existsSync, readFileSync } from "fs";
import { JpptrOptions } from "./types";
import stripJsonComments from "strip-json-comments";
import { startDebug } from "./debugger";
import { executeCommandAction } from "../commander/exec";
import { JpptrSchema, PluginParams } from "./schema";
import { Register } from "./register";
import { ArrayParser, VariablesParser, FrameParser, PageParser } from "../parser";
import {
    PluginFunction,
    SwitchPlugin,
    FramePlugin,
    FunctionPlugin,
    PagePlugin,
    VariablesPlugin,
    ForPlugin,
} from "../plugins";
import { ActionParser } from "../parser/Parser";

/**
 * jpptr class
 *
 * help create jpptr and create actions executor
 *
 * @example
 * ```ts
 *
 * ;(async ()=>{
 *
 * const jpptr = Jpptr.from("./test.json")
 *
 * const executor = await jpptr.createExecutor()
 *
 * await executor.executeAll()
 *
 * })()
 *
 *
 *
 * ```
 */
export class Jpptr {
    options: JpptrOptions;

    debug: JpptrOptions["debug"];
    variables: JpptrOptions["variables"];
    register: JpptrOptions["register"];
    launch: JpptrOptions["launch"];
    actions: JpptrOptions["actions"];

    constructor(options: JpptrOptions) {
        this.options = options;
        this.debug = options.debug;
        this.variables = options.variables;
        this.register = options.register;
        this.launch = options.launch;
        this.actions = options.actions;
    }

    /**
     * create jpptr with JpptrSchema object
     * @param schema {@link JpptrSchema}
     * @param options \{cwd: string}
     * @returns <{@link Jpptr}>
     */
    public static create(schema: JpptrSchema, options?: { cwd: string }) {
        const cwd = options?.cwd || process.cwd();
        const resolvedOptions = new JpptrConfigHandler(cwd).resolve(schema);
        return new Jpptr(resolvedOptions);
    }

    /**
     * create jpptr with json file with actions
     * ****
     * If your json file is not in the root directory, add `__dirname` to locate the path to the file.
     *
     * Or use the `options.cwd` to specify
     * ```js
     *
     * const jpptr = Jpptr.from(path.resolve(__dirname,"./test.json"));
     * // or
     * const jpptr = Jpptr.from("./test.json",{cwd:__dirname});
     *
     * ```
     *
     * @returns <{@link Jpptr}>
     */
    public static from(path: string, options?: { cwd: string }) {
        if (!existsSync(path)) {
            path = resolve(options?.cwd || process.cwd(), path);
            options = { cwd: dirname(path) };
        } else {
            if (options === undefined) {
                options = { cwd: dirname(path) };
            }
        }

        const content = this.readJsonFile(path);
        return this.create(content, options);
    }

    /**
     * read jsonc `(json with comments)` file
     */
    public static readJsonFile(path: string): any {
        return JSON.parse(stripJsonComments(readFileSync(path).toString()));
    }

    /**
     * execute the file with jpptr configs
     *
     * same as
     * ```shell
     * $ jpptr ./jpptr.config.json
     * ```
     *
     * @see launchCommandAction
     * @returns Promise<void>
     */
    public static async launch(path: string, options?: { cwd?: string }) {
        await launchCommandAction(path, options);
    }

    /**
     * execute the json file with actions
     *
     * same as
     * ```shell
     * $ jpptr exec ./test.json
     * ```
     *
     * @see executeCommandAction
     * @returns Promise<void>
     */
    public static async execute(path: string, options?: { cwd?: string }) {
        await executeCommandAction(path, options);
    }

    /**
     * create {@link ActionExecutor} with jpptr options
     *
     * the parameters passed in can override the initialization parameters of jpptr.
     *
     *
     * @param options {@link JpptrOptions}
     * @returns Promise<{@link ActionExecutor}<any>>
     * @example
     * ```ts
     *
     * ;(async ()=>{
     *
     * const jpptr = Jpptr.from("./test.json")
     *
     * const executor = await jpptr.createExecutor()
     *
     * await executor.executeAll()
     *
     * })()
     *
     *
     *
     * ```
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

    /**
     * default plugins
     */
    public static defaultPlugins() {
        return new Register<keyof PluginParams, PluginFunction>()
            .use("switch", SwitchPlugin)
            .use("frame", FramePlugin)
            .use("function", FunctionPlugin)
            .use("page", PagePlugin)
            .use("variables", VariablesPlugin)
            .use("for", ForPlugin);
    }

    /**
     * default parsers
     *
     * ArrayParser priority is 100, the rest is the default 10
     */
    public static defaultParsers() {
        return new Register<keyof typeof DefaultParsers, ActionParser>()
            .use("array", { priority: 100, parser: ArrayParser })
            .use("variables", { parser: VariablesParser })
            .use("frame", { parser: FrameParser })
            .use("page", { parser: PageParser });
    }
}
const DefaultParsers = {
    array: ArrayParser,
    variables: VariablesParser,
    frame: FrameParser,
    page: PageParser,
};
