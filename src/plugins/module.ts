import { Action, ObjectAction, Plugin, ActionContext } from ".";
import fs from "fs";
import path from "path";

/**
 * 脚本加载插件
 */

export default {
    name: "module",
    async run({ browser, page, frame, action }: ActionContext<ModulePluginParam>) {
        if (action.path) {
            let modulePath = fs.existsSync(action.path) ? path.resolve(action.path) : path.resolve(__dirname, action.path);
            const plugin: Plugin<Action> = require(modulePath);
            return await plugin.run({ browser, page, frame, action });
        }
    },
};

export interface ModulePluginParam extends ObjectAction {
    use: "module";
    path?: string;
}
