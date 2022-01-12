import { Action, ObjectAction } from "../..";
import { FramePluginParam } from "../../plugins/frame";
import { ActionParser, Parser } from "../types";

@Parser("frame")
export class FrameParser implements ActionParser {
    parse(action: ObjectAction) {
        if (action.frame) {
            let { frame, actions = [], ...newAction } = action;
            action = {
                use: "frame",
                name: action.frame,
                actions: [newAction as Action].concat(actions),
            } as FramePluginParam;
            return action;
        }
    }
}
