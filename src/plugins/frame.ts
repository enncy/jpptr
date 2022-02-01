import { Context, ObjectAction } from "../core/types";

/**
 *  a plugin that provides function of switch frame
 * 
 * @param options Context\<{@link FramePluginParams}\>
 */
export function FramePlugin({ page, frame, action }: Context<FramePluginParams>) {
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

/** params of {@link FramePlugin} */
export type FramePluginParams = ObjectAction & {
    /** name of frame */
    name?: string;
    /**
     * index of frame
     * @see Array.at
     */
    index?: number;
};
