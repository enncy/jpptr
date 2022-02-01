import { Page, Frame, Browser } from "puppeteer-core";
import { Context, ObjectAction } from "../core/types";

/**
 * a plugin that provides puppeteer function execution
 * 
 * @param options Context\<{@link FunctionPluginParams}\>
 */
export async function FunctionPlugin({ browser, page, frame, action }: Context<FunctionPluginParams>) {
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

export type FunctionPluginParams = ObjectAction & {
    /** function name of `Page | Frame | Browser` */
    name: keyof Page | keyof Frame | keyof Browser;
    /** arguments of function */
    args?: any[];
    /**
     * wait for this function, whether it is asynchronous or not
     *
     * @default true
     */
    wait?: boolean;
    /**
     * execution target
     *
     * you can select target to execute puppeteer function, default browser > page > frame
     * but if frame.id is not equals to page.mainFrame().id , the frame's priority is big than page
     */
    target?: "browser" | "page" | "frame";
};
