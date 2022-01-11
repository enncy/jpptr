import { FrameAddScriptTagOptions } from "puppeteer-core";
import { ObjectAction, PluginContext } from ".";
declare const _default: {
    name: string;
    run({ frame, action }: PluginContext<ScriptPluginParam>): Promise<void>;
};
/**
 * 脚本加载插件
 */
export default _default;
export interface ScriptPluginParam extends FrameAddScriptTagOptions, ObjectAction {
}
