import { ObjectAction, Context } from "../core/types";

/**
 * page 切换插件
 */
export async function PagePlugin({ browser, page, frame, action }: Context<PagePluginParam>) {
    if (browser && page && frame) {
        const pages = await browser.pages();
        // 指定的页面索引
        const index = action?.index;
        if (index) {
            const newPage = pages.at(index);
            // 切换页面以及frame
            if (newPage) {
                const newFrame = newPage.mainFrame();
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
}

export interface PagePluginParam extends ObjectAction {
    index?: number;
}
