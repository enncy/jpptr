import { FrameAddScriptTagOptions } from "puppeteer-core";
import { ObjectAction, PluginContext } from ".";

/**
 * 脚本加载插件
 */
export default {
    name: "script",
    async run({ frame, action }: PluginContext<ScriptPluginParam>) {
        await frame.addScriptTag(action);
    },
};

export interface ScriptPluginParam extends FrameAddScriptTagOptions, ObjectAction {}
