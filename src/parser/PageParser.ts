import { PluginParamsWithName } from "../core/schema";
import { ActionContext, Action } from "../core/types";

/**
 * 页面切换解析器
 *
 */
export function PageParser({ action }: ActionContext<any>) {
    if (!Array.isArray(action) && action.page) {
        const { actions = [], page, ...newAction } = action;
        action = {
            use: "page",
            index: action.page,
            actions: [newAction as Action].concat(actions),
        } as PluginParamsWithName["page"];

        return action;
    }
}
