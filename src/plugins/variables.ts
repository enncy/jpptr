import { Context, ObjectAction } from "../core/types";
import { ApplyPluginParams, VariablesApplyPlugin } from "./variables/apply";
import { SetPluginParams, VariablesSetPlugin } from "./variables/set";

/**
 * A plugin that provides support for variable operation and creation.
 *
 * @param options Context\<{@link VariablesPluginParams}\>
 *
 * @example
 * ```json
 * {
 *      "use":"variables",
 *      "var":"my-name",
 *      // variables creation, see VariablesPluginParams.set
 *      "set":{...},
 *      // variables operation, see VariablesPluginParams.apply
 *      "apply":{...}
 * }
 * ```
 *
 *
 */
export function VariablesPlugin(opts: Context<VariablesPluginParams>) {
    const varName = opts.action.var;
    if (opts.action.set) {
        const { set } = opts.action;
        return VariablesSetPlugin({ ...opts, action: set, var: varName });
    } else if (opts.action.apply) {
        const { apply } = opts.action;
        return VariablesApplyPlugin({ ...opts, action: apply, var: varName });
    }
}

/** params of  {@link VariablesPlugin}  */
export type VariablesPluginParams = ObjectAction & {
    /** name of variable */
    var: string;
    /** params of  {@link VariablesSetPlugin} */
    set?: SetPluginParams;
    /** params of  {@link VariablesApplyPlugin} */
    apply?: ApplyPluginParams;
};
