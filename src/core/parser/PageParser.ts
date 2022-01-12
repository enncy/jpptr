import { ObjectAction } from "../..";
import { Action } from "../../plugins";
import { PagePluginParam } from "../../plugins/page";
import { ActionParser, Parser } from "../types";

@Parser("page")
export class PageParser implements ActionParser {
    parse(action: ObjectAction) {
        if (action.page) {
            let { page, actions = [], ...newAction } = action;
            action = {
                use: "page",
                index: action.page,
                actions: [newAction as Action].concat(actions),
            } as PagePluginParam;
        }
        return action;
    }
}
