 
import { Action, PluginNames } from "../plugins";
import { FunctionPluginParam } from "../plugins/function";

export function ArrayParser(action: Action): FunctionPluginParam | undefined {
    // 使用数组第一个值作为函数名,剩下的作为参数
    if (Array.isArray(action)) {
        let [name, ...args] = action;
        // 替换 action ，返回新的 object action
        if (name) {
            return {
                use: PluginNames["function-plugin"],
                name,
                args: args || [],
            };
        }
    }
}
