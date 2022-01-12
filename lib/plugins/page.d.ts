import { ObjectAction, ActionContext } from ".";
declare const _default: {
    name: string;
    run({ browser, page, frame, action }: ActionContext<PagePluginParam>): Promise<{
        browser: import("puppeteer-core").Browser;
        page: import("puppeteer-core").Page;
        frame: import("puppeteer-core").Frame;
        action: PagePluginParam;
    }>;
};
/**
 * page 切换插件
 */
export default _default;
export interface PagePluginParam extends ObjectAction {
    use: "page";
    index?: number;
}
