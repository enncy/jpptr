import { VariablesPluginParams } from "./../variables";
import { Context } from "../../core/types";

/**
 * a plugin that provides support for variable creation.
 *
 * use {@link VariablesPluginParams.set} to call this function
 */
export async function VariablesSetPlugin({
    page,
    frame,
    variables,
    action,
    var: varName,
}: Pick<Context<any>, "variables" | "page" | "frame"> & { action: SetPluginParams; var: string }) {
    variables = variables || {};

    /** 设置变量 */
    const target = action.target === "page" ? page : frame;
    if (target) {
        let vars;
        const { const: varConst, range, text, attribute, evaluate, url: urlParam, cookie: cookieName } = action;
        /** 设置一个常量 */
        if (varConst) {
            vars = varConst;
        } else if (range) {
            vars = [];
            for (let i = range[0]; i < range[1]; i++) {
                if (i % (range[2] || 1) == 0) {
                    vars.push(i);
                }
            }
        } else if (text) {
            /** 或者 元素 的 text 值 */
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
            vars = variables[varName];
        }

        variables[varName] = vars;
    }

    return { variables };
}

/** params of {@link VariablesSetPlugin} */
export type SetPluginParams = {
    /** constant value */
    const?: any;
    /**
     * range: start, end, step
     */
    range: [number, number, number];
    /** the innerText of the element selected by the element selector */
    text?: string;
    /** the attributes of the element selected by the element selector */
    attribute?: {
        /** element selector */
        selector: string;
        /** key of attributes */
        key: string;
    };
    /** name of cookie   */
    cookie?: string;
    /** name of url param  */
    url?: string;
    /** return value of evaluate function*/
    evaluate?: string;
    /** execution target */
    target?: "page" | "frame";
};
