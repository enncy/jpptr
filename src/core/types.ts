import {
    LaunchOptions,
    BrowserLaunchArgumentOptions,
    BrowserConnectOptions,
    Product,
    Page,
    Frame,
    Browser,
} from "puppeteer-core";
  
import "reflect-metadata";
import { ModuleRegister } from "./register";
import { ParserFunction } from "../parser";
import { PluginFunction } from "../plugins";
import { PluginParams } from "./schema";
import { DebugOptions } from "./debugger";

/** puppeteer 启动参数 */
export type PuppeteerOptions = LaunchOptions &
    BrowserLaunchArgumentOptions &
    BrowserConnectOptions & {
        product?: Product;
        extraPrefsFirefox?: Record<string, unknown>;
    };

/** jpptr 实例化参数 */
export interface JpptrOptions {
    /** 是否开启调试模式 */
    debug?: boolean | DebugOptions
    /** 变量池 */
    variables?: Variables;
    /** 模块注册器 */
    register?: ModuleRegister;
    /** puppeteer 启动参数 */
    launch?: PuppeteerOptions;
    /** 动作列表 */
    actions?: Action[];
}

/**
 * 模块注册器
 */
export interface ModuleRegisterSchema {
    /** 插件注册器 */
    plugins?: {
        /** 插件名 */
        name: string;
        /** 插件模块路径 */
        plugin: string | PluginFunction;
    }[];
    /** 解析器注册器 */
    parsers?: {
        /** 解析器名字 */
        name: string;
        /** 解析器模块路径 */
        parser: string | ParserFunction;
        /** 解析器优先级, 默认 10 */
        priority: number;
    }[];
}

/** 数组类型的动作 */
export type ArrayAction = [keyof Page | keyof Frame | keyof Browser, ...any[]];

/**
 * 基础动作对象
 */
export type ObjectAction = {
    /** 指定切换的 frame 名字或者索引 */
    frame?: string | number;
    /** 指定切换的标签页的索引 */
    page?: number;
    /** 子动作列表 */
    actions?: Action[];
    /** 动作描述 */
    description?: string;
} & (
    | {
          /** 使用插件 */
          use: keyof PluginParams;
      }
    | {
          /** 使用插件 */
          use: string;
      }
);

/**
 * 动作类型
 */
export type Action = ArrayAction | PluginParams[keyof PluginParams] | ObjectAction

export interface PuppeteerContext {
    browser?: Browser;
    page?: Page;
    frame?: Frame;
}

/** 动作上下文 */
export interface ActionContext<T extends Action> {
    variables?: any;
    action: T;
}

/** 上下文  */
export type Context<T extends Action> = PuppeteerContext & ActionContext<T>;

/** 变量池类型 */
export type Variables = Record<string, any>;
