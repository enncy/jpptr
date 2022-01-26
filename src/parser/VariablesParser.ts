import { ActionContext } from "../core/types";

/**
 * 变量解析器
 *  
 */
export function VariablesParser({ variables, action }: ActionContext<any>) {
    if (!Array.isArray(action)) {
        let vars: any = variables || {};
        replacePlaceholder(action, vars);
        return action;
    }
}

function replacePlaceholder(action: any, vars: any) {
    for (const key in action) {
        let value = Reflect.get(action, key);

        if (typeof value === "string") {
            if (/#\{(.*?)\}/.test(value)) {
                const placeholders = value.match(RegExp(`#\\{(.*?)\\}`, "g")) || [];

                for (const placeholder of placeholders) {
                    let varName = placeholder.replace(/#\{(.*)\}/, "$1");
                    value = value.replace(placeholder, vars[varName]);
                }

                Reflect.set(action, key, value);
            }
        }

        if (typeof value === "object") {
            /** 如果是数组，或者对象，则递归处理 */
            replacePlaceholder(value, vars);
        }
    }
}
