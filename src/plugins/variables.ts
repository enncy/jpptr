import { Context, ObjectAction } from "../core/types";
import { ApplyPluginParam, VariablesApplyPlugin } from "./variables/apply";
import { SetPluginParam, VariablesSetPlugin } from "./variables/set";

/**
 * 变量操作插件
 */
export function VariablesPlugin(opts: Context<VariablePluginParam>) {
    const varName = opts.action.var;
    if (opts.action.set) {
        const { set } = opts.action;
        return VariablesSetPlugin({ ...opts, action: set, var: varName });
    } else if (opts.action.apply) {
        const { apply } = opts.action;
        return VariablesApplyPlugin({ ...opts, action: apply, var: varName });
    }
}

export type VariablePluginParam = ObjectAction & {
    var: string;
    set?: SetPluginParam;
    apply?: ApplyPluginParam;
};
