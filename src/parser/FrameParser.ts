 
import { Action, PluginNames } from "../plugins";
import { FramePluginParam } from "../plugins/frame";

export function FrameParser(action: Action) {
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
