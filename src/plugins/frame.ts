import { Action, ActionContext, ObjectAction, Plugin  } from ".";

/**
 * frame 切换插件
 */
export default {
    name: "frame",
    run({ browser, page, frame, action }: ActionContext<FramePluginParam>) {
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
    },
};

export interface FramePluginParam extends ObjectAction  {
    use: "frame";
    name?: string;
}
