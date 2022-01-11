import { Action, ObjectAction, PluginContext } from ".";

/**
 * page 切换插件
 */
export default {
    name: "page",
    async run({ browser, page, frame, action }: PluginContext<PagePluginParam>) {
        const pages = await browser.pages();
        let index = action?.index || action?.page
        if (index) {
            let newPage = pages.at(index);
            if (newPage) {
                let newFrame = newPage.mainFrame();
                // 如果新页面的 main frame 不匹配旧页面的 main frame 和当前的 frame，则使用新页面的 main frame
                if (newFrame._id !== page.mainFrame()._id && newFrame._id !== frame._id) {
                    console.log("change newFrame");
                    
                    return { browser, page: newPage, frame: newFrame, action };
                } else {
                    return { browser, page: newPage, frame, action };
                }
            }
        }
        return { browser, page, frame, action };
    },
};

export interface PagePluginParam extends ObjectAction {
    index?: number;
    page?: number;
    actions: Action[];
}
