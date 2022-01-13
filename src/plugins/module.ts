import { Action, ObjectAction, ActionContext, PluginFunction } from ".";
import fs from "fs";
import path from "path";

export const MODULE_PLUGIN_NAME = "module";

/**
 * 脚本加载插件
 */

export async function ModulePlugin({ browser, page, frame, action }: ActionContext<ModulePluginParam>) {
    if (action.path) {
        let modulePath = fs.existsSync(path.resolve(action.path)) ? path.resolve(action.path) : path.resolve(__dirname, action.path);

        const plugin: PluginFunction = require(modulePath);
        if (typeof plugin !== "function") {
            throw new Error(`plugin module execute error : module  ${modulePath}  is not a function , make sure export default a function`)
        } else {
            return await plugin({ browser, page, frame, action });
        }
    }
}
export interface ModulePluginParam extends ObjectAction {
    path?: string;
}
