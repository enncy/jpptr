import { Frame } from "puppeteer-core";
import { PluginContext } from ".";
import { Action } from "../core/types";
declare const _default: {
    name: string;
    invoke({ page, frame, json }: PluginContext<FramePluginJSON>): {
        actions: Action[];
        frame: Frame;
    } | undefined;
};
/**
 * frame 切换插件
 */
export default _default;
export interface FramePluginJSON {
    name?: string;
    actions: Action[];
}
