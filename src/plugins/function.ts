import { Page, Frame } from "puppeteer-core";
import { Action, ObjectAction, Plugin, ActionContext } from ".";
import frame from "./frame";

/**
 * 函数执行插件
 */

export default {
    name: "function",
    async run({ page, frame, action }: ActionContext<FunctionPluginParam>) {
        let { name, args, wait } = action;
        // 执行函数，如果 frame 无此函数，则上升到 page
        const fun = Reflect.get(frame, name);
        if (fun) {
            await applyFunction({
                fun,
                target: frame,
                args,
                wait,
            });
        } else {
            await applyFunction({
                fun: Reflect.get(page, name),
                target: page,
                args,
                wait,
            });
        }
    },
};

async function applyFunction({ fun, target, args = [], wait = true }: { fun: Function; target: Page | Frame; args?: any[]; wait?: boolean }) {
    if (typeof fun === "function") {
        let apply = Reflect.apply(fun, target, args);
        wait && (await apply);
    }
}

export interface FunctionPluginParam extends ObjectAction {
    use: "function";
    // 函数名
    name: string;
    // 函数的参数
    args?: (string | number | boolean)[];
    // 是否等待函数执行，默认 true
    wait?: boolean;
}
