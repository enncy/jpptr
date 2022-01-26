import { Action, ActionContext } from "../core/types";
import { PluginNames } from "../plugins";
import { FramePluginParam } from "../plugins/frame";

/**
 * frame框架切换解析器
 */
export function FrameParser({ action  }: ActionContext<any>) {
    if (!Array.isArray(action) && action.frame) {
        let { frame, actions = [], ...newAction } = action;
        if (typeof action.frame === "string") {
            action = {
                use: PluginNames["frame-plugin"],
                name: action.frame,
                actions: [newAction as Action].concat(actions),
            } as FramePluginParam;
        } else if (typeof action.frame === "number") {
            action = {
                use: PluginNames["frame-plugin"],
                index: action.frame,
                actions: [newAction as Action].concat(actions),
            } as FramePluginParam;
        }
        return action;
    }
}
