import { Frame, Page } from "puppeteer-core";
import { PluginContext } from ".";
import { Action } from "../core/types";
declare const _default: {
    name: string;
    run({ browser, page, frame, json }: PluginContext<FramePluginJSON>): {
        browser: import("puppeteer-core").Browser;
        page: Page;
        frame: Frame;
        json: Action[];
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
