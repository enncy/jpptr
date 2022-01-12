import { ActionContext, ObjectAction } from ".";
declare const _default: {
    name: string;
    run({ browser, page, frame, action }: ActionContext<FramePluginParam>): {
        browser: import("puppeteer-core").Browser;
        page: import("puppeteer-core").Page;
        frame: import("puppeteer-core").Frame;
        action: FramePluginParam;
    };
};
/**
 * frame 切换插件
 */
export default _default;
export interface FramePluginParam extends ObjectAction {
    use: "frame";
    name?: string;
}
