import { Target } from "puppeteer-core";
import { ObjectAction, PluginContext } from ".";
import { executePageFunction } from "../core/utils";

/**
 * 函数执行插件
 */

export default {
    name: "function",
    async run({ page, frame, action }: PluginContext<FunctionPluginParam>) {
        executePageFunction(page, frame, action.name, action.args);
    },
};

export interface FunctionPluginParam extends ObjectAction {
    name: string;
    args: (string | number)[];
}
