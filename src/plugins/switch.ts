import { Frame, Page } from "puppeteer-core";
import { Action, ObjectAction, Context } from "../core/types";

/**
 * plugin of actions switch
 *
 * Iterate over each {@link SwitchCase}, until a case is return an actions list
 *
 * @example
 * ```json
 * {
 *      "use":"switch",
 *      "case":[
 *          {
 *              //...condition1
 *              "actions":[...]
 *          },
 *          {
 *              //...condition2
 *              "actions":[...]
 *          },
 *          {
 *              //...condition3
 *              "actions":[...]
 *          },
 *      ],
 *      "default":[...]
 * }
 * ```
 *
 * @param options Context\<{@link SwitchPluginParams}\>
 */
export async function SwitchPlugin({ page, frame, action }: Context<SwitchPluginParams>) {
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
async function handleCaseParam(page: Page, frame: Frame, _case: SwitchCase): Promise<Action[] | undefined> {
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

    // 判断页面是否包含选择器
    if (_case.selector) {
        actions = await target.evaluate((selector) => document.querySelector(selector), _case.selector)
            ? _case.actions
            : actions;
    }

    return actions;
}

/** 条件和字符串比较器 */
// eslint-disable-next-line no-unused-vars
type Comparator = (condition: string, target: string) => boolean;

/** 条件构造器的处理器 */
class ConditionWrapperHandler {
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

        return false;
    }
}
/**
 * condition wrapper
 */
export interface ConditionWrapper {
    /**
     * url sub string of page or frame
     *
     * @example
     * ```js
     * // https://example.com/?username=Jimmy
     * {
     *      "use":"switch",
     *      "case":[
     *          {
     *              include:{
     *                   url:"username=Jimmy"
     *              },
     *              // or
     *              match:{
     *                  url:"username=.*"
     *              },
     *              actions:[...]
     *          }
     *      ]
     *
     * }
     * ```
     */
    url?: string;
    /**
     * cookie string of page or frame
     *
     * @example
     * ```js
     * // cookie: JESSIONID=ad3f0f0263535855962c79320f4c0523
     * {
     *      "use":"switch",
     *      "case":[
     *          {
     *              include:{
     *                   cookie:"JESSIONID=ad3f0f0263535855962c79320f4c0523"
     *              },
     *              // or
     *              match:{
     *                  cookie:"JESSIONID=.*"
     *              },
     *              actions:[...]
     *          }
     *      ]
     *
     * }
     * ```
     */
    cookie?: string;
    /**
     * innerText of document body
     *
     * @example
     * ```js
     * // <body><h1>hello<h1><h2>world<h2><body>
     * {
     *      "use":"switch",
     *      "case":[
     *          {
     *              include:{
     *                   text:"hello\nworld"
     *              },
     *              // or
     *              match:{
     *                  text:"hello(\\s)world"
     *              },
     *              actions:[...]
     *          }
     *      ]
     *
     * }
     * ```
     */
    text?: string;
    /**
     * content of page or frame
     *
     * @example
     * ```js
     * // <body><h1>hello<h1><h2>world<h2><body>
     * {
     *      "use":"switch",
     *      "case":[
     *          {
     *              include:{
     *                   html:"<h1>hello<h1><h2>world<h2>"
     *              },
     *              // or
     *              match:{
     *                  html:"hello(.*)world"
     *              },
     *              actions:[...]
     *          }
     *      ]
     *
     * }
     * ```
     */
    html?: string;
}

/**
 * params of {@link SwitchPlugin}
 *
 * Iterate over each case-list, until a case is return an actions list
 *
 */
export type SwitchPluginParams = ObjectAction & {
    case?: SwitchCase[];
    default?: Action[] | Action;
};

/**
 * params of {@link SwitchPluginParams.case}
 *
 * if any params return true ,then this plugin will execute this actions
 *
 */
export interface SwitchCase {
    /** include value in page or frame */
    include?: ConditionWrapper;
    /** match value in page or frame */
    match?: ConditionWrapper;
    /**
     * call the function of {@link Page.evaluate} or {@link Frame.evaluate}.
     *
     * if return true, then execute the child actions {@link SwitchCase.actions}
     *
     * @example
     * ```js
     * // <body><h1 class="title">hello<h1><h2>world<h2><body>
     * {
     *      "use":"switch",
     *      "case":[
     *          {
     *              evaluate:"document.querySelector('.title')?.innerText==='hello'",
     *              actions:[...]
     *          }
     *      ]
     *
     * }
     * ```
     *
     */
    evaluate?: string;
    /**
     * is element of selector exist
     *
     * @example
     * ```js
     * // <body><h1 class="title">hello<h1><h2>world<h2><body>
     * {
     *      "use":"switch",
     *      "case":[
     *          {
     *              selector:".title",
     *              actions:[...]
     *          }
     *      ]
     *
     * }
     * ```
     */
    selector?: string;
    /** target of operate */
    target: "page" | "frame";

    actions?: Action[];
}
