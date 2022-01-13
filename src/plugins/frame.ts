import { Action, ActionContext, ObjectAction } from ".";

export const FRAME_PLUGIN_NAME = "frame";

/**
 * frame 切换插件
 */
export function FramePlugin({ browser, page, frame, action }: ActionContext<FramePluginParam>) {
    let name = action?.name || action?.frame;
    if (name) {
        let newFrame = frame;
        for (const f of page.frames()) {
            if (name === f.name()) {
                newFrame = f;
            }
        }
        return { browser, page, frame: newFrame, action };
    }
    return { browser, page, frame, action };
}

export interface FramePluginParam extends ObjectAction {
    name?: string;
}
