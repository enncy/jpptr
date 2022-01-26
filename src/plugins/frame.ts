import { Context, ObjectAction } from "../core/types";

/**
 * frame 切换插件
 */
export function FramePlugin({ page, frame, action }: Context<FramePluginParam>) {
    const name = action?.name;
    const index = action?.index;
    if (page) {
        if (index) {
            return { frame: page.frames().at(index) };
        } else if (name) {
            let newFrame = frame;
            for (const f of page.frames()) {
                if (f.name() === name) {
                    newFrame = f;
                }
            }
            return { frame: newFrame };
        }
    }
}

export interface FramePluginParam extends ObjectAction {
    name?: string;
    index?: number;
}
