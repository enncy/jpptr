import { Frame, Page } from "puppeteer-core";
import { Action, ObjectAction, ActionContext } from ".";
 
/**
 * 条件判断插件
 */

export async function ConditionPlugin({ page, frame, action }: ActionContext<ConditionPluginParam>) {
    let { actions = [] } = action;
    if (page && frame) {
        // 条件列表
        let ifs = [action.if].concat(action.elif);

        for (const _if of ifs) {
            // 处理条件，直到某个返回一个操作列表
            let ifActions = await handleIf(page, frame, action.if);
            if (ifActions) {
                return actions.concat(ifActions);
            }
        }
        return actions.concat(action.else);
    }
}

/**
 * 处理 if 语句
 */
async function handleIf(page: Page, frame: Frame, param: ConditionParam): Promise<Action[] | undefined> {
    // 处理正则表达式判断
    if (param.match && (await handleCondition({ page, frame, conditions: param.match, handler: (cdt, str) => RegExp(cdt).test(str) }))) {
        return param?.actions || [];
    }
    // 处理字符串包含判断
    else if (param.include && handleCondition({ page, frame, conditions: param.include, handler: (cdt, str) => str.indexOf(cdt) !== -1 })) {
        return param?.actions || [];
    }
    // 调用页面函数判断
    else if (param.evaluate) {
        if ((await frame.evaluate(param.evaluate)) || (await page.evaluate(param.evaluate))) {
            return param?.actions || [];
        }
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
        // html 内容
        if (handler(cdt.text, await frame.content()) || handler(cdt.text, await page.content())) {
            return true;
        }
        // 纯文字内容
        if (handler(cdt.text, await frame.evaluate(() => document.body.innerText)) || handler(cdt.text, await page.evaluate(() => document.body.innerText))) {
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

interface ConditionWrapper {
    url?: string;
    cookie?: string;
    text?: string;
    selector?: string;
}

export interface ConditionPluginParam extends ObjectAction {
    if: ConditionParam;
    elif: ConditionParam[];
    else: Action[];
}
interface ConditionParam {
    // 是否包含某个子串
    include?: ConditionWrapper;
    // 是否匹配某个子串
    match?: ConditionWrapper;
    // 调用页面函数判断
    evaluate?: string;
    // 子操作
    actions?: Action[];
}
