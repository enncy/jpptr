import { Browser, Frame, Page } from "puppeteer-core";
import ConditionPlugin, { ConditionPluginParam } from "./condition";
import ScriptPlugin, { ScriptPluginParam } from "./script";
import FramePlugin, { FramePluginParam } from "./frame";
import PagePlugin, { PagePluginParam } from "./page";
import FunctionPlugin, { FunctionPluginParam } from "./function";
import ModulePlugin, { ModulePluginParam } from "./module";
export interface ObjectAction {
    use: keyof ObjectActionParams;
    frame?: string;
    page?: number;
    actions?: Action[];
}
export interface ObjectActionParams {
    condition: ConditionPluginParam;
    script: ScriptPluginParam;
    frame: FramePluginParam;
    page: PagePluginParam;
    function: FunctionPluginParam;
    module: ModulePluginParam;
}
export declare type ArrayAction = [string, ...(string | number | boolean)[]];
export declare type Action = ArrayAction | ObjectAction | ConditionPluginParam | ScriptPluginParam | FramePluginParam | PagePluginParam | FunctionPluginParam | ModulePluginParam;
export interface ActionContext<T extends Action> {
    browser: Browser;
    page: Page;
    frame: Frame;
    action: T;
}
export declare type PluginReturnType<T extends Action> = undefined | T[] | ActionContext<T>;
export interface Plugin<T extends Action> {
    name: keyof ObjectActionParams;
    run(ctx: ActionContext<any>): PluginReturnType<T> | Promise<PluginReturnType<T>>;
}
/**
 * 转换插件上下文
 * 用于切换每个 action 中所指定的 page 或者 frame 选项
 * @param ctx
 * @returns
 */
export declare function switchActionContext(ctx: ActionContext<any>): Promise<ActionContext<any>>;
declare let plugin: Plugin<Action>[];
export default plugin;
export { ConditionPlugin, FunctionPlugin, ScriptPlugin, FramePlugin, PagePlugin, ModulePlugin };
