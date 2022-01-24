import { existsSync } from "fs";
import { resolve } from "path";
import { defaultParsers } from "../parser";
import { defaultPlugins } from "../plugins";

import { GlobalRegister } from "./executor";
import { error, log } from "../logger/logger";

import { JpptrOptions, JpptrSchema, ModuleRegister, PuppeteerOptions } from "./types";

/**
 * 配置文件解析器
 */
export class JpptrConfigHandler {
    register: GlobalRegister = new GlobalRegister();
    launch: PuppeteerOptions = {};
    actions: any[] = [];

    constructor(private cwd?: string) {}

    /** 从 json 文件创建 jpptr 配置 */
    resolve(json: JpptrSchema): JpptrOptions {
        /** 启动配置 */
        this.launch = Object.assign({}, json.launch, this.launch);
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
    loadExternalModules(jsonRegister: ModuleRegister) {
        let reg = jsonRegister;
        if (reg) {
            const parsers = reg.parsers?.map((p) => [p.name, typeof p.parser === "string" ? resolveConfig(p.parser, this.cwd) : p.parser] as [string, any]);
            const plugins = reg.plugins?.map((p) => [p.name, typeof p.plugin === "string" ? resolveConfig(p.plugin, this.cwd) : p.plugin] as [string, any]);
            this.register.parser.useAll(parsers || []);
            this.register.plugin.useAll(plugins || []);
        }
    }

    /** 递归继承配置文件 */
    extends(path: string) {
        let configPath = resolveConfigPath(path, this.cwd);
        /** 切换工作目录 */
        this.cwd = configPath;
        /** 读取配置文件 */
        let mod;
        try {
            mod = require(configPath);

            const json: JpptrSchema = mod.default || mod;
            this.resolve(json);
            if (json.extends) {
                this.extends(resolve(configPath, json.extends));
            }
        } catch {
            error("module not found : ", path);
        }
    }
}

/**
 * 解析模块路径，可以传入  cwd 替换工作目录,默认 process.cwd()
 */
export function resolveConfigPath(p: string, cwd: string = process.cwd()) {
    let defaultCwdPaths = [cwd, __dirname, "./"];
    let path = defaultCwdPaths.find((dp) => existsSync(resolve(dp, p)));
    return resolve(path!, p);
}

/**
 * 解析模块,可以传入 cwd 替换工作目录,默认 process.cwd()
 */
export function resolveConfig(p: string, cwd: string = process.cwd()) {
    let mod;
    try {
        mod = require(resolveConfigPath(p, cwd));
    } catch {
        error("module not found : ", p);
    }
    return mod?.default || mod;
}
