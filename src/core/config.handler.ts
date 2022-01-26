import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { ActionParser } from "../parser";

import { error } from "../logger/logger";

import { JpptrOptions, JpptrSchema, ModuleRegisterSchema, PuppeteerOptions, Variables } from "./types";
import { ModuleRegister } from "./register";

/**
 * 配置文件解析器
 */
export class JpptrConfigHandler {
    register: ModuleRegister = new ModuleRegister();
    launch: PuppeteerOptions = {};
    actions: any[] = [];
    variables: Variables = {};

    constructor(private cwd?: string) {}

    /** 从 json 文件创建 jpptr 配置 */
    resolve(json: JpptrSchema): JpptrOptions {
        /** 启动配置 */
        this.launch = Object.assign({}, json.launch, this.launch);
        /** 变量注册 */
        this.variables = Object.assign({}, json.variables, this.variables);

        /** 动作数组 */
        this.actions = (json.actions || []).concat(this.actions || []);

        if (json.register) {
            /** 加载外部模块 */
            this.loadExternalModules(json.register);
        }
        /** 处理父文件 */
        if (json.extends) {
            this.extends(json.extends);
        }

        return this;
    }

    /** 注册外部插件 */
    loadExternalModules(regSchema: ModuleRegisterSchema) {
        const reg = regSchema;
        if (reg) {
            /** 注册 parser */
            const parsers = reg.parsers?.map(
                (p) =>
                    [
                        p.name,
                        {
                            priority: p.priority,
                            parser: typeof p.parser === "string" ? resolveModule(p.parser, this.cwd) : p.parser,
                        },
                    ] as [string, ActionParser]
            );
            /** 注册 plugin */
            const plugins = reg.plugins?.map(
                (p) =>
                    [p.name, typeof p.plugin === "string" ? resolveModule(p.plugin, this.cwd) : p.plugin] as [
                        string,
                        any
                    ]
            );
            this.register.parser.useAll(parsers || []);
            this.register.plugin.useAll(plugins || []);
        }
    }

    /** 递归继承配置文件 */
    extends(path: string) {
        const configPath = resolveFilePath(path, this.cwd);
        /** 切换工作目录 */
        this.cwd = configPath;
        /** 读取配置文件 */
        let content;
        try {
            content = JSON.parse(readFileSync(configPath).toString());

            this.resolve(content);
            if (content.extends) {
                this.extends(resolve(configPath, content.extends));
            }
        } catch {
            error("module not found : ", path);
        }
    }
}

/**
 * 解析模块路径，可以传入  cwd 替换工作目录,默认 process.cwd()
 */
export function resolveFilePath(p: string, cwd: string = process.cwd()) {
    const defaultCwdPaths = [cwd, __dirname, "./"];
    const path = defaultCwdPaths.find((dp) => existsSync(resolve(dp, p)));
    return resolve(path!, p);
}

/**
 * 解析模块,可以传入 cwd 替换工作目录,默认 process.cwd()
 */
export function resolveModule(p: string, cwd: string = process.cwd()) {
    let mod;
    try {
        mod = require(resolveFilePath(p, cwd));
    } catch {
        error("module not found : ", p);
    }
    return mod?.default || mod;
}
