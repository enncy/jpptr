import { Action } from "..";
import { PagePluginParam, PAGE_PLUGIN_NAME } from "../plugins/page";

export function PageParser(action: Action) {
    if (!Array.isArray(action) && action.page) {
        let { page, actions = [], ...newAction } = action;
        action = {
            use: PAGE_PLUGIN_NAME,
            index: action.page,
            actions: [newAction as Action].concat(actions),
        } as PagePluginParam;

        return action;
    }
}
