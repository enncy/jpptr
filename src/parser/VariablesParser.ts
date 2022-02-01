import { Action, ObjectAction, Variables } from "./../core/types";
import { ParserContext } from "./types";

/**
 * variable placeholder
 * @default "#\\{(.*?)\\}"
 * @param flags regexp flags
 * @returns regexp
 */
export const defaultPlaceholder = (flags?: string) => RegExp("#\\{(.*?)\\}", flags);

/**
 * parser of variable placeholder
 * @param options {@link ObjectAction}
 *
 * @example
 *
 *
 * ```json
 * // 1. set variables in actions file
 * {
 *      "variables":{
 *          "func":"goto",
 *          "domain":"example.com"
 *      }
 * }
 * // or use variables plugin
 * {
 *      "use":"variables",
 *      "var":"domain",
 *      "set":{
 *          "const":"example.com"
 *      }
 * }
 * // 2. and then use in any plugin at any arguments
 * {
 *      "use":"function",
 *      "name":"#{func}",
 *      "args":["https://#{domain}"]
 * },
 * ```
 */
export function VariablesParser({ variables, action }: ParserContext<any>) {
    if (Reflect.ownKeys(variables || {}).length) {
        return replacePlaceholder(action, variables);
    }
}

/**
 * replace variable placeholder
 * @param action {@link Action}
 * @param vars {@link Variables}
 */
export function replacePlaceholder(action: any, vars: any) {
    action = JSON.parse(JSON.stringify(action));
    for (const key in action) {
        if (Object.prototype.hasOwnProperty.call(action, key)) {
            let value = action[key];

            if (typeof value === "string") {
                if (defaultPlaceholder().test(value)) {
                    const placeholders = value.match(defaultPlaceholder("g")) || [];

                    for (const placeholder of placeholders) {
                        const varName = placeholder.replace(defaultPlaceholder(), "$1");
                        if (vars[varName] !== undefined) {
                            value = value.replace(placeholder, vars[varName]);
                        }
                    }

                    action[key] = value;
                }
            }

            if (typeof value === "object") {
                /** 如果是数组，或者对象，则递归处理 */
                action[key] = replacePlaceholder(value, vars);
            }
        }
    }

    return action;
}
