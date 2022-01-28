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

/** frame 切换插件参数 */
export type FramePluginParam = ObjectAction & {
 
    /** frame 名字 */
    name?: string;
    /** frame 索引 */
    index?: number;
};
