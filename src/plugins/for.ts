import { Action, Context, ObjectAction } from "../core/types";
import { replacePlaceholder } from "../parser/VariablesParser";
import { VariablePluginParam, VariablesPlugin } from "./variables";

/**
 * for 模板循环插件
 */
export async function ForPlugin(opts: Context<ForPluginParams>) {
    const variables = (await VariablesPlugin(opts))?.variables;

    const data = variables[opts.action.var];
    if (Array.isArray(data)) {
        const vars = Object.assign({}, variables);

        const actions = data.map((item) => {
            vars[opts.action.var] = item;
            /** 替换变量 */
            return  replacePlaceholder(opts.action.template, vars);
        });
        return actions;
    }
}

/**
 * for 循环插件参数, 继承 {@link VariablePluginParam}
 * ****
 * 在此循环设置的变量为局部变量，只能在 template 动作模板中使用
 * @example
 * ```json
 * {
 *      "use":"for",
 *      "var":"i",
 *      "set":{"range":[0,10]},
 *      "template":["type","#password","#{i}"]
 * }
 * ```
 */
export type ForPluginParams = VariablePluginParam & {
    template: Action;
};
