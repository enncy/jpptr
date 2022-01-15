import { Page, Frame, Browser } from "puppeteer-core";
import { ObjectAction, ActionContext } from ".";

/**
 * 函数执行插件
 */

export async function FunctionPlugin({ browser, page, frame, action }: ActionContext<FunctionPluginParam>) {
    let { name, args, wait } = action;
    /** 优先级为 browser > page > frame */

    if (browser && page) {
        const func = Reflect.get(browser, name);
        if (func) {
            await applyFunction({
                func,
                target: browser,
                args,
                wait,
            });
        } else {
            /** 如果 frame 已经被切换，则优先级为 frame > page */
            if (page && frame) {
                if (frame._id !== page.mainFrame()._id) {
                    const frameFunc = Reflect.get(frame, name);
                    if (frameFunc) {
                        await applyFunction({
                            func: frameFunc,
                            target: frame,
                            args,
                            wait,
                        });
                    }
                } else {
                    const pageFunc = Reflect.get(page, name);
                    if (pageFunc) {
                        await applyFunction({
                            func: pageFunc,
                            target: page,
                            args,
                            wait,
                        });
                    }
                }
            }
        }
    }
}
async function applyFunction({ func, target, args = [], wait = true }: { func: Function; target: Browser | Page | Frame; args?: any[]; wait?: boolean }) {
    if (typeof func === "function") {
        let apply = Reflect.apply(func, target, args);
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
}
