import { Page, Frame, Browser } from "puppeteer-core";
import { Context, ObjectAction } from "../core/types";

/**
 * 函数执行插件
 */

export async function FunctionPlugin({ browser, page, frame, action }: Context<FunctionPluginParam>) {
    const { name, args, wait, target: execTarget } = action;

    /** 优先级为 browser > frame > page */
    if (browser) {
        let func;
        let target;

        const browserFunc = Reflect.get(browser, name);
        if (browserFunc || execTarget === "browser") {
            func = browserFunc;
            target = browser;
        } else if (page && frame) {
            if (frame._id !== page.mainFrame()._id) {
                const frameFunc = Reflect.get(frame, name);
                if (frameFunc || execTarget === "frame") {
                    func = frameFunc;
                    target = frame;
                }
            } else {
                const pageFunc = Reflect.get(page, name);
                if (pageFunc || execTarget === "page") {
                    func = pageFunc;
                    target = page;
                }
            }
        }

        if (func && target) {
            await applyFunction({
                func: func,
                target: target,
                args,
                wait,
            });
        }
    }
}
async function applyFunction({
    func,
    target,
    args = [],
    wait = true,
}: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    func: Function;
    target: Browser | Page | Frame;
    args?: ArrayLike<any>;
    wait?: boolean;
}) {
    if (typeof func === "function") {
        const apply = Reflect.apply(func, target, args);
        wait && (await apply);
    }
}

export interface FunctionPluginParam extends ObjectAction {
    // 函数名
    name: string;
    // 函数的参数
    args?: (string | number | boolean)[];
    // 是否等待函数执行，默认 true
    wait?: boolean;
    /**
     * 执行对象
     *
     * 你可以选择目标来执行puppeteer函数，默认浏览器 >页面 >框架，
     * 但是如果 `框架frame` 被切换过 (frame.id不等于page.mainFrame().id) ，则框架的优先级大于页面
     * ****
     * you can select target to execute puppeteer function, default browser > page > frame
     * but if frame.id is not equals to page.mainFrame().id , the frame's priority is big than page
     */
    target?: "browser" | "page" | "frame";
}
