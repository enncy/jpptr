import { Action, ObjectAction, ActionContext } from ".";

export const PAGE_PLUGIN_NAME = "page";

/**
 * page 切换插件
 */
export async function PagePlugin({ browser, page, frame, action }: ActionContext<PagePluginParam>) {
    const pages = await browser.pages();
    // 指定的页面索引
    let index = action?.index || action?.page;
    if (index) {
        let newPage = pages.at(index);
        // 切换页面以及frame
        if (newPage) {
            let newFrame = newPage.mainFrame();
            // 如果新页面的 main frame 不匹配旧页面的 main frame 和当前的 frame，则使用新页面的 main frame
            if (newFrame._id !== page.mainFrame()._id && newFrame._id !== frame._id) {
                return { browser, page: newPage, frame: newFrame, action };
            } else {
                return { browser, page: newPage, frame, action };
            }
        }
    }
    return { browser, page, frame, action };
}

export interface PagePluginParam extends ObjectAction {
    index?: number;
}
