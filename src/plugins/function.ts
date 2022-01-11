 
import { PluginContext } from ".";
 

/**
 * 函数执行插件
 */

export default {
    name: "function",
    async run({ page, frame, action }: PluginContext<FunctionPluginParam>) {
        const fun = Reflect.get(frame, action.name);
        if (typeof fun === "function") {
            await Reflect.apply(fun, frame, action.args);
        } else {
            // warning...
        }
    },
};

export interface FunctionPluginParam {
    name: string;
    args: (string | number)[];
}
