import { Frame, Page } from "puppeteer-core";
import { PluginContext } from ".";
import { Action, Plugin } from "../core/types";

/**
 * frame 切换插件
 */
export default {
    name:'frame',
    run({ page, frame, json }: PluginContext<FramePluginJSON>) {
        for (const frame of page.frames()) {
            if (json?.name === frame.name()) {
                return {
                    actions: json.actions,
                    frame,
                };
            }
        }
    }
}

export interface FramePluginJSON {
    name?: string;
    actions: Action[];
}
