import { PluginNames } from "..";
import { Action } from "../plugins";
import { PagePluginParam } from "../plugins/page";

export function PageParser(action: Action) {
    if (!Array.isArray(action) && action.page) {
        let { page, actions = [], ...newAction } = action;
        action = {
            use: PluginNames["page-plugin"],
            index: action.page,
            actions: [newAction as Action].concat(actions),
        } as PagePluginParam;

        return action;
    }
}
