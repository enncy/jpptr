 
import { PluginContext } from ".";
import { Action  } from "../core/types";

/**
 * 条件判断插件
 */

export default {
    name: "condition",
    async run({ browser, page, frame, action }: PluginContext<ConditionPluginParam>): Promise<Action[] | undefined> {
        if (action.if) {
            let actions = await handleIf({ page, frame, action: action.if });
            if (actions) {
                return actions;
            }
        } else if (action["else if"]) {
            for (const elseif of action["else if"]) {
                let action = await handleIf({ page, frame, action: elseif });
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
async function handleIf({ page, frame, action }: Omit<PluginContext<ConditionParam>, "browser">): Promise<Action[] | undefined> {
    let _if = action;
    // 处理正则表达式判断
    if (_if.match && (await handleCondition({ page, frame, action }, _if.match, (cdt, str) => RegExp(cdt).test(str)))) {
        return _if.actions;
    }
    // 处理字符串包含判断
    else if (_if.include && handleCondition({ page, frame, action }, _if.include, (cdt, str) => str.indexOf(cdt) !== -1)) {
        return _if.actions;
    }
}

/**
 * 处理条件
 */
async function handleCondition({ page, frame }: Omit<PluginContext<ConditionParam>, "browser">, conditions: ConditionWrapper, handler: (condition: string, str: string) => boolean | Promise<boolean>): Promise<boolean> {
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

export interface ConditionPluginParam {
    if: ConditionParam;
    "else if": ConditionParam[];
    else: Action[];
}

export interface ConditionParam {
    include?: ConditionWrapper;
    match?: ConditionWrapper;
    actions: Action[];
}
