import { Frame, FrameAddScriptTagOptions, Page } from "puppeteer-core";
import { PluginContext } from ".";
import { Plugin } from "../core/types";

/**
 * 脚本加载插件
 */
export default {
    name: "script",
    async run({ page, frame, json }: PluginContext<ScriptPluginJSON>) {
        await frame.addScriptTag(json);
    },
};

export interface ScriptPluginJSON extends FrameAddScriptTagOptions {
    frame?: string;
}
