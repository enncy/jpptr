import { Context, ObjectAction } from "../core/types";

/**
 * frame 切换插件
 */
export function FramePlugin({ browser, page, frame, action }: Context<FramePluginParam>) {
    const name = action?.name;
    const index = action?.index;
    if (page) {
        if (index) {
            return { browser, page, frame: page.frames().at(index), action };
        } else if (name) {
            let newFrame = frame;
            for (const f of page.frames()) {
                if (f.name() === name) {
                    newFrame = f;
                }
            }
            return { browser, page, frame: newFrame, action };
        }
    }
    return { browser, page, frame, action };
}

export interface FramePluginParam extends ObjectAction {
    name?: string;
    index?: number;
}
