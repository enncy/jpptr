import { PluginParamsWithName } from "../core/schema";
import { ActionContext } from "../core/types";

/**
 *
 * 数组解析器
 */
export function ArrayParser({ action }: ActionContext<any>): PluginParamsWithName["function"] | undefined {
    // 使用数组第一个值作为函数名,剩下的作为参数
    if (Array.isArray(action)) {
        const [name, ...args] = action;
        // 替换 action ，返回新的 object action
        if (name) {
            return {
                use: "function",
                name,
                args: args || [],
            };
        }
    }
}
