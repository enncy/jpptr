import { ForPluginParams } from "../plugins/for";
import { FramePluginParam } from "../plugins/frame";
import { FunctionPluginParam } from "../plugins/function";
import { PagePluginParam } from "../plugins/page";
import { SwitchPluginParam } from "../plugins/switch";
import { VariablePluginParam } from "../plugins/variables";
import { ArrayAction, ModuleRegisterSchema, PuppeteerOptions, Variables } from "./types";

/**
 * jpptr 动作文件类型
 */
export interface JpptrSchema {
    /** 变量 */
    variables?: Variables;
    /** 文件继承 */
    extends?: string;
    /** 模块注册器 */
    register?: ModuleRegisterSchema;
    /** puppeteer 启动参数 */
    launch?: PuppeteerOptions;
    /** 动作列表 */
    actions?: ActionSchema[];
}

export interface PluginParams {
    page: PagePluginParam;
    frame: FramePluginParam;
    switch: SwitchPluginParam;
    function: FunctionPluginParam;
    variables: VariablePluginParam;
    for: ForPluginParams;
}

export interface PluginParamsWithName {
    page: PagePluginParam & { use: "page" };
    frame: FramePluginParam & { use: "frame" };
    switch: SwitchPluginParam & { use: "switch" };
    function: FunctionPluginParam & { use: "function" };
    variables: VariablePluginParam & { use: "variables" };
    for: ForPluginParams & { use: "for" };
}

export type ActionSchema =
    | ArrayAction
    | PluginParamsWithName[keyof PluginParamsWithName]
    | { use: string }
    | { use: keyof PluginParams };
