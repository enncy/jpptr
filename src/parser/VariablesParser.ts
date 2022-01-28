import { ActionContext } from "../core/types";

/**
 * 变量解析器
 *
 */
export function VariablesParser({ variables, action }: ActionContext<any>) {
    if (Reflect.ownKeys(variables || {}).length) {
        return replacePlaceholder(action, variables);
    }
}

/** 替换占位符 */
export function replacePlaceholder(action: any, vars: any) {
    action = JSON.parse(JSON.stringify(action));
    for (const key in action) {
        if (Object.prototype.hasOwnProperty.call(action, key)) {
            let value = action[key];

            if (typeof value === "string") {
                if (/#\{(.*?)\}/.test(value)) {
                    const placeholders = value.match(RegExp(`#\\{(.*?)\\}`, "g")) || [];

                    for (const placeholder of placeholders) {
                        const varName = placeholder.replace(/#\{(.*)\}/, "$1");
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
