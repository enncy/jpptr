import { Context, ObjectAction } from "../core/types";

/**
 * 设置指定变量的值
 */
export async function SetPlugin({ page, frame, variables, action }: Context<SetPluginParam>) {
    const target = action.target === "page" ? page : frame;

    if (typeof action.value === "string") {
        variables[action.name] === action.value;
    } else {
        if (target) {
            let vars;
            const { text, attribute, evaluate, url: urlParam, cookie: cookieName } = action.value;
            /** 或者 元素 的 text 值 */
            if (text) {
                vars = await target.evaluate(`document.querySelector("${text}").innerText`);
            } else if (attribute) {
                const { selector, key } = attribute;

                /** 从元素属性获取 */
                vars = await target.evaluate(`document.querySelector("${selector}")?.["${key}"]`);
            } else if (evaluate) {
                // 从 js 代码获取返回值
                vars = await target.evaluate(evaluate);
            } else if (urlParam) {
                /** 从 url 参数中获取 */
                const sp = new URL(target.url()).searchParams;
                const obj: any = {};
                sp.forEach((value, key) => (obj[key] = Array.isArray(obj[key]) ? obj[key].concat(value) : value));
                vars = obj[urlParam];
            } else if (cookieName && page) {
                /** 从 cookie 中获取 */
                const cookies = await page.cookies();
                vars = cookies.find((cookie) => cookie.name === cookieName)?.name;
            } else {
                vars = variables[action.name];
            }

            variables[action.name] = vars;
        }
    }

    return { variables };
}

export interface SetPluginParam extends ObjectAction {
    name: string;
    value: string | ValueWrapper;
    target: "page" | "frame";
}

export interface ValueWrapper {
    text?: string;
    attribute?: {
        selector: string;
        key: string;
    };
    cookie?: string;
    url?: string;
    evaluate?: string;
}
