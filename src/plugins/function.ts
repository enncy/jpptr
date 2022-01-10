import { Page } from "puppeteer-core";
import { PluginContext } from ".";
import { Plugin } from "../core/types";

/**
 * 函数执行插件
 */

export default {
    name: "function",
    async run({ page, frame, json }: PluginContext<FunctionPluginJSON>) {
        const fun = Reflect.get(frame, json.name);
        if (typeof fun === "function") {
            await Reflect.apply(fun, frame, json.args);
        } else {
            // warning...
        }
    },
};

export interface FunctionPluginJSON {
    name: string;
    args: (string | number)[];
}
