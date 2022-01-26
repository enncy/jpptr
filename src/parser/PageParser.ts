import { ActionContext, Action } from "../core/types";
import { PluginNames } from "../plugins";
import { PagePluginParam } from "../plugins/page";

/**
 * 页面切换解析器
 *
 */
export function PageParser({ action }: ActionContext<any>) {
    if (!Array.isArray(action) && action.page) {
        const { actions = [], ...newAction } = action;
        action = {
            use: PluginNames["page-plugin"],
            index: action.page,
            actions: [newAction as Action].concat(actions),
        } as PagePluginParam;

        return action;
    }
}
