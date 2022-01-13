 
import { ObjectAction, Action } from "..";
import { FramePluginParam, FRAME_PLUGIN_NAME } from "../plugins/frame";

 
export function FrameParser(action: Action) {
    if (!Array.isArray(action) && action.frame) {
        let { frame, actions = [], ...newAction } = action;
        action = {
            use: FRAME_PLUGIN_NAME,
            name: action.frame,
            actions: [newAction as Action].concat(actions),
        } as FramePluginParam;
        return action;
    }
}
