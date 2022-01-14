import { Action, ActionContext, ObjectAction } from ".";
 
/**
 * frame 切换插件
 */
export function FramePlugin({ browser, page, frame, action }: ActionContext<FramePluginParam>) {
    let name = action?.name;
    let index = action?.index;
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
