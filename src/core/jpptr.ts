import { resolve } from "path";
import { existsSync } from "fs";
import puppeteer, { Page } from "puppeteer-core";
import { ActionExecutor, defaultPwdPaths } from "./executor";
import { JpptrSchema, Register, ParserFunction, PluginFunction, ParserNames, PluginNames } from "..";
import { ArrayParser } from "../parser/ArrayParser";
import { ExternalParser } from "../parser/ExternalParser";
import { FrameParser } from "../parser/FrameParser";
import { PageParser } from "../parser/PageParser";
import { ConditionPlugin } from "../plugins/condition";
import { FramePlugin } from "../plugins/frame";
import { FunctionPlugin } from "../plugins/function";
import { PagePlugin } from "../plugins/page";


/**
 * jpptr class
 * @example
 * ```ts
 * 
 * 
 *  const browser = await puppeteer.launch(json.options);
    const [page] = await browser.pages();
    const jpptr = new Jpptr({ page, actions: json.actions });
 
    jpptr.register.parser.useAll(defaultParsers().entries());
    jpptr.register.plugin.useAll(defaultPlugins().entries());
 
    const jsonRegister = json.register;
    if (jsonRegister) {
        const parsers = jsonRegister.parsers?.map((p) => [p.name, resolveModules(p.path)] as [string, any]);
        const plugins = jsonRegister.plugins?.map((p) => [p.name, resolveModules(p.path)] as [string, any]);
        jpptr.register.parser.useAll(parsers || []);
        jpptr.register.plugin.useAll(plugins || []);
    }

    return jpptr;

 * ```
 */
export class Jpptr extends ActionExecutor<any> {
    constructor(options?: { page?: Page; actions?: any[] }) {
        super(options);
    }
}

/**
 * 解析模块
 * @param p
 */
function resolveModules(p: string) {
    let path = defaultPwdPaths.find((dp) => existsSync(resolve(dp, p)));
    let mod = require(resolve(path!, p));
    return mod.default || mod;
}

/**
 * 创建 jpptr 实例
 * @param json 配置文件
 */
export async function createJpptr(json: JpptrSchema) {
    const browser = await puppeteer.launch(json.options);
    const [page] = await browser.pages();
    const jpptr = new Jpptr({ page, actions: json.actions });

    /** 注册内部插件 */

    jpptr.register.parser.useAll(defaultParsers().entries());
    jpptr.register.plugin.useAll(defaultPlugins().entries());

    /** 注册外部插件 */
    const jsonRegister = json.register;
    if (jsonRegister) {
        const parsers = jsonRegister.parsers?.map((p) => [p.name, resolveModules(p.path)] as [string, any]);
        const plugins = jsonRegister.plugins?.map((p) => [p.name, resolveModules(p.path)] as [string, any]);
        jpptr.register.parser.useAll(parsers || []);
        jpptr.register.plugin.useAll(plugins || []);
    }

    return jpptr;
}

/**
 * 默认json解析注册器
 */
export function defaultParsers() {
    return new Register<ParserFunction>()
        .use(ParserNames["array-parser"], ArrayParser)
        .use(ParserNames["frame-parser"], FrameParser)
        .use(ParserNames["page-parser"], PageParser)
        .use(ParserNames["external-parser"], ExternalParser);
}

/**
 * 默认插件注册器
 */
export function defaultPlugins() {
    return new Register<PluginFunction>()
        .use(PluginNames["condition-plugin"], ConditionPlugin)
        .use(PluginNames["frame-plugin"], FramePlugin)
        .use(PluginNames["function-plugin"], FunctionPlugin)
        .use(PluginNames["page-plugin"], PagePlugin);
}
