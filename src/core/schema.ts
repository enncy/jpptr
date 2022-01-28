import { FramePluginParam } from "../plugins/frame";
import { FunctionPluginParam } from "../plugins/function";
import { PagePluginParam } from "../plugins/page";
import { SwitchPluginParam } from "../plugins/switch";
import { VariablePluginParam } from "../plugins/variables";
import { ArrayAction, ModuleRegisterSchema,  PuppeteerOptions, Variables } from "./types";

export interface PluginParams {
    page: PagePluginParam;
    frame: FramePluginParam;
    switch: SwitchPluginParam;
    function: FunctionPluginParam;
    variables: VariablePluginParam;
}

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

export type ActionSchema =
    | ArrayAction
    | (PagePluginParam & { use: "page" })
    | (FramePluginParam & { use: "frame" })
    | (SwitchPluginParam & { use: "switch" })
    | (FunctionPluginParam & { use: "function" })
    | (VariablePluginParam & { use: "variables" })
    | { use: string }
    | { use: keyof PluginParams };
