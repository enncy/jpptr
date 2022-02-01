import { ArrayAction } from './../core/types';
import { PluginParamsWithName } from "../core/schema";
import { ParserContext } from './types';
 
/**
 *
 * Array-like action parser
 * 
 * it will parse action which is {@link ArrayAction} to object action
 * 
 * @example
 * ```json
 * ["goto", "https://example.com"]
 * //  will be parsed to
 * {
 *     "use": "function",
 *     "name": "goto",
 *     "args": ["https://example.com"]
 * }
 * ```
 */
export function ArrayParser({ action }: ParserContext<any>): PluginParamsWithName["function"] | undefined {
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
