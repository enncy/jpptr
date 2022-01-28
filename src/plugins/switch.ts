import { Frame, Page } from "puppeteer-core";
import { Action, ObjectAction, Context } from "../core/types";

/**
 * 条件判断插件
 */
export async function SwitchPlugin({ page, frame, action }: Context<SwitchPluginParam>) {
    const { actions = [] } = action;
    if (page && frame) {
        // 条件列表
        for (const item of action.case || []) {
            // 处理条件，直到某个返回一个动作列表
            const caseActions = await handleCaseParam(page, frame, item);
            if (caseActions) {
                return actions.concat(caseActions);
            }
        }
        return actions.concat(action.default || []);
    }
}

/**
 * 处理 case 语句
 * @param page 页面对象
 * @param frame frame对象
 * @param _case 处理的条件
 */
async function handleCaseParam(page: Page, frame: Frame, _case: SwitchCaseParam): Promise<Action[] | undefined> {
    const target = _case.target === "frame" ? frame : page;
    let actions;

    // 处理正则表达式判断
    const regexpHandler = new ConditionWrapperHandler(target, (cdt, str) => RegExp(cdt).test(str));

    if (_case.match) {
        actions = (await regexpHandler.resolve(_case.match)) ? _case.actions : actions;
    }

    // 处理字符串包含判断
    const textSearchHandler = new ConditionWrapperHandler(target, (cdt, str) => str.indexOf(cdt) !== -1);
    if (_case.include) {
        actions = (await textSearchHandler.resolve(_case.include)) ? _case.actions : actions;
    }
    // 调用页面函数判断
    if (_case.evaluate) {
        actions = (await target.evaluate(_case.evaluate)) ? _case.actions : actions;
    }

    return actions;
}

/** 条件和字符串比较器 */
// eslint-disable-next-line no-unused-vars
export type Comparator = (condition: string, target: string) => boolean;

/** 条件构造器的处理器 */
export class ConditionWrapperHandler {
    private target: Page | Frame;
    private comparator: Comparator;
    constructor(target: Page | Frame, comparator: Comparator) {
        this.target = target;
        this.comparator = comparator;
    }

    /** 处理条件 */
    async resolve(wrapper: ConditionWrapper) {
        // 判断页面链接
        if (wrapper.url) {
            return this.comparator(wrapper.url, this.target.url());
        }

        // 判断页面的 cookie
        if (wrapper.cookie && this.target instanceof Page) {
            const wrapperCookie = wrapper.cookie;
            const cookies = await this.target.cookies();
            return cookies
                .map((cookie) => [cookie.name, cookie.value].join("="))
                .some((cookie) => this.comparator(cookie, wrapperCookie));
        }
        // 判断页面HTML是否含有子串
        if (wrapper.html) {
            // html 内容
            return this.comparator(wrapper.html, await this.target.content());
        }
        // 纯文字内容
        if (wrapper.text) {
            return this.comparator(wrapper.text, await this.target.evaluate(() => document.body.innerText));
        }

        // 判断页面是否包含选择器
        if (wrapper.selector) {
            return !!(await this.target.evaluate((selector) => document.querySelector(selector), wrapper.selector));
        }

        return false;
    }
}
/** 条件构造器 */
interface ConditionWrapper {
    url?: string;
    cookie?: string;
    text?: string;
    html?: string;
    selector?: string;
}

/** 插件参数 */
export type SwitchPluginParam = ObjectAction & {
    case?: SwitchCaseParam[];
    default?: Action[];
};

/** 插件 case 参数的选项 */
interface SwitchCaseParam {
    /** 是否包含某个子串 */
    include?: ConditionWrapper;
    /** 是否匹配某个子串 */
    match?: ConditionWrapper;
    /** 调用页面函数判断 */
    evaluate?: string;
    /** 子操作 */
    actions?: Action[];
    /** 操作对象 */
    target: "page" | "frame";
}
