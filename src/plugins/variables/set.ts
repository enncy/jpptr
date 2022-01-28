import { Context } from "../../core/types";

/**
 * 设置指定变量的值
 */
export async function VariablesSetPlugin({
    page,
    frame,
    variables,
    action,
    var: varName,
}: Pick<Context<any>, "variables" | "page" | "frame"> & { action: SetPluginParam; var: string }) {
    /** 设置变量 */
    const target = action.target === "page" ? page : frame;
    if (target) {
        let vars;
        const { const: varConst, text, attribute, evaluate, url: urlParam, cookie: cookieName } = action;
        /** 设置一个常量 */
        if (varConst) {
            vars = varConst;
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

/** 设置变量插件 */
export type SetPluginParam = {
    /** 常量 */
    const?: any;
    /** 对元素取 innerText 的值 */
    text?: string;
    /** 获取元素属性值 */
    attribute?: {
        /** 元素选择器 */
        selector: string;
        /** 元素属性 */
        key: string;
    };
    /** 获取指定的名字的cookie值  */
    cookie?: string;
    /** 获取指定的 url 参数的值 */
    url?: string;
    /** 或者页面方法返回值 */
    evaluate?: string;
    /** 操作对象 */
    target?: "page" | "frame";
};
