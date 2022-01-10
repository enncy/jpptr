import { FrameAddScriptTagOptions } from "puppeteer-core";
import { PluginContext } from ".";
declare const _default: {
    name: string;
    invoke({ page, frame, json }: PluginContext<ScriptPluginJSON>): Promise<void>;
};
/**
 * 脚本加载插件
 */
export default _default;
export interface ScriptPluginJSON extends FrameAddScriptTagOptions {
    frame?: string;
}
