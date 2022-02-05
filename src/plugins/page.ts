import { ObjectAction, Context } from "../core/types";

/**
 * a plugin that provides function of switch page
 * @category Plugin
 * @param options Context\<{@link PagePluginParams}\>
 */
export async function PagePlugin({ browser, page, frame, action }: Context<PagePluginParams>) {
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
                    return { page: newPage, frame: newFrame };
                } else {
                    return { page: newPage };
                }
            }
        }
    }
}

/** 
 * params of {@link PagePlugin}
 * @category Plugin Params
 */
export type PagePluginParams = ObjectAction & {
    /**
     * index of page
     *
     * @see Array.at
     */
    index?: number;
};
