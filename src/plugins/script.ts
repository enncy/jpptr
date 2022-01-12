import { FrameAddScriptTagOptions } from "puppeteer-core";
import { Action, ObjectAction, Plugin, ActionContext } from ".";

/**
 * 脚本加载插件
 */
export default {
    name: "script",
    async run({ frame, action }: ActionContext<ScriptPluginParam>) {
        await frame.addScriptTag(action);
    },
}  

export interface ScriptPluginParam extends FrameAddScriptTagOptions, ObjectAction  {
    use: "script";
}
