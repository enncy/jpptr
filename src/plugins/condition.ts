import { Frame, Page } from "puppeteer-core";
import { Action, ObjectAction, PluginContext } from ".";

/**
 * 条件判断插件
 */

export default {
    name: "condition",
    async run({ page, frame, action }: PluginContext<ConditionPluginParam>): Promise<Action[] | undefined> {
        if (action.if) {
            let actions = await handleIf(page, frame, action.if);
            if (actions) {
                return actions;
            }
        } else if (action["else if"]) {
            for (const elseif of action["else if"]) {
                let action = await handleIf(page, frame, elseif);
                if (action) {
                    return action;
                }
            }
        } else {
            return action.else;
        }
    },
};

/**
 * 处理 if 语句
 */
async function handleIf(page: Page, frame: Frame, param: ConditionParam): Promise<Action[] | undefined> {
    // 处理正则表达式判断
    if (param.match && (await handleCondition({ page, frame, conditions: param.match, handler: (cdt, str) => RegExp(cdt).test(str) }))) {
        return param.actions;
    }
    // 处理字符串包含判断
    else if (param.include && handleCondition({ page, frame, conditions: param.include, handler: (cdt, str) => str.indexOf(cdt) !== -1 })) {
        return param.actions;
    }
}

/**
 * 处理条件
 */
async function handleCondition({ page, frame, conditions, handler }: { page: Page; frame: Frame; conditions: ConditionWrapper; handler: (condition: string, str: string) => boolean | Promise<boolean> }): Promise<boolean> {
    let cdt = conditions;
    // 判断页面链接
    if (cdt.url) {
        if (handler(cdt.url, frame.url()) || handler(cdt.url, page.url())) {
            return true;
        }
    }
    // 判断页面的 cookie
    if (cdt.cookie) {
        let cdtCookie = cdt.cookie;
        let cookies = await page.cookies();
        let tested = cookies.map((cookie) => cookie.name + "=" + cookie.value).some((cookie) => handler(cdtCookie, cookie));
        if (tested) {
            return true;
        }
    }
    // 判断页面是否含有子串
    if (cdt.text) {
        if (handler(cdt.text, await frame.content()) || handler(cdt.text, await page.content())) {
            return true;
        }
    }
    // 判断页面是否包含选择器
    if (cdt.selector) {
        if ((await frame.evaluate((selector) => document.querySelector(selector), cdt.selector)) || (await page.evaluate((selector) => document.querySelector(selector), cdt.selector))) {
            return true;
        }
    }
    return false;
}

export interface ConditionWrapper {
    url?: string;
    cookie?: string;
    text?: string;
    selector?: string;
}

export interface ConditionPluginParam extends ObjectAction {
    if: ConditionParam;
    "else if": ConditionParam[];
    else: Action[];
}

export interface ConditionParam {
    include?: ConditionWrapper;
    match?: ConditionWrapper;
    actions: Action[];
}
