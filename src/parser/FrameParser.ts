import { PluginParamsWithName } from "../core/schema";
import { Action, ActionContext } from "../core/types";

import { FramePluginParam } from "../plugins/frame";

/**
 * frame框架切换解析器
 */
export function FrameParser({ action }: ActionContext<any>) {
    if (!Array.isArray(action) && action.frame) {
        const { actions = [], frame, ...newAction } = action;
        if (typeof action.frame === "string") {
            action = {
                use: "frame",
                name: action.frame,
                actions: [newAction as Action].concat(actions),
            } as PluginParamsWithName["frame"];
        } else if (typeof action.frame === "number") {
            action = {
                use: "frame",
                index: action.frame,
                actions: [newAction as Action].concat(actions),
            } as PluginParamsWithName["frame"];
        }
        return action;
    }
}
