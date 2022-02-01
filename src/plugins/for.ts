import { Action, Context, ObjectAction } from "../core/types";
import { replacePlaceholder } from "../parser/VariablesParser";
import { VariablesPluginParams, VariablesPlugin } from "./variables";

/**
 * for-plugin
 *
 * The variables set in this loop are `local variables`
 * can only be used in the template actions.
 *
 * @param options Context\<{@link ForPluginParams}\>
 * @example
 * ```json
 * {
 *      "use":"for",
 *      "var":"i",
 *      "set":{"range":[0,10]},
 *      "template":["type","#password","#{i}"]
 * }
 * ```
 *
 */
export async function ForPlugin(opts: Context<ForPluginParams>) {
    const variables = (await VariablesPlugin(opts))?.variables;

    const data = variables?.[opts.action.var];
    if (Array.isArray(data)) {
        const vars = Object.assign({}, variables);

        const actions = data.map((item) => {
            vars[opts.action.var] = item;
            /** 替换变量 */
            return replacePlaceholder(opts.action.template, vars);
        });
        return actions;
    }
}

/**
 * params of {@link ForPlugin}
 *
 * @extends VariablesPluginParams
 */
export type ForPluginParams = VariablesPluginParams & {
    /**
     * the template of actions with local variables
     */
    template: Action[] | Action;
};
