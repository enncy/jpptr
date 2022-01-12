import { ArrayAction } from "../..";
import { FunctionPluginParam } from "../../plugins/function";
import { ActionParser, Parser } from "../types";

/**
 * 数组解析器
 */
@Parser("array")
export class ArrayParser implements ActionParser {
    parse(action: ArrayAction): FunctionPluginParam | undefined {
        // 使用数组第一个值作为函数名,剩下的作为参数
        if (Array.isArray(action)) {
            let [name, ...args] = action;
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
}
