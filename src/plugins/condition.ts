import { Frame, Page } from "puppeteer-core";
import { PluginContext } from ".";
import { Action, ActionExecutor, Plugin } from "../core/types";

/**
 * 条件判断插件
 */

export default {
    name: "condition",
    async run({ browser, page, frame, json }: PluginContext<ConditionPluginJSON>): Promise<Action[] | undefined> {
        if (json.if) {
            let actions = await handleIf({ page, frame, json: json.if });
            if (actions) {
                return actions;
            }
        } else if (json["else if"]) {
            for (const elseif of json["else if"]) {
                let action = await handleIf({ page, frame, json: elseif });
                if (action) {
                    return action;
                }
            }
        } else {
            return json.else;
        }
    },
};

/**
 * 处理 if 语句
 * @param page 页面
 * @param ifJSON 语句体
 */
async function handleIf({ page, frame, json }: Omit<PluginContext<ConditionJSON>, "browser">): Promise<Action[] | undefined> {
    let _if = json;
    // 处理正则表达式判断
    if (_if.match && (await handleCondition({ page, frame, json }, _if.match, (cdt, str) => RegExp(cdt).test(str)))) {
        return _if.actions;
    }
    // 处理字符串包含判断
    else if (_if.include && handleCondition({ page, frame, json }, _if.include, (cdt, str) => str.indexOf(cdt) !== -1)) {
        return _if.actions;
    }
}

/**
 * 处理条件
 * @param page page 页面
 * @param conditions 条件构造体
 * @param handler 处理器
 * @returns
 */
async function handleCondition({ page, frame }: Omit<PluginContext<ConditionJSON>, "browser">, conditions: ConditionWrapper, handler: (condition: string, str: string) => boolean | Promise<boolean>): Promise<boolean> {
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

export interface ConditionPluginJSON {
    if: ConditionJSON;
    "else if": ConditionJSON[];
    else: Action[];
}

export interface ConditionJSON {
    include?: ConditionWrapper;
    match?: ConditionWrapper;
    actions: Action[];
}
