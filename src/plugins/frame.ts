import { Frame, Page } from "puppeteer-core";
import { PluginContext } from ".";
import { Action  } from "../core/types";

/**
 * frame 切换插件
 */
export default {
    name: "frame",
    run({ browser, page, frame, action }: PluginContext<FramePluginParam>) {
        for (const f of page.frames()) {
            if (action?.name === f.name()) {
                return { browser, page, frame: f, action: action.actions };
            }
        }
    },
};

export interface FramePluginParam {
    name?: string;
    actions: Action[];
}
