import { Plugin, PluginContext } from ".";

/**
 * 脚本加载插件
 */

export default {
    name: "module",
    async run({ browser, page, frame, action }: PluginContext<ModulePluginParam>) {
        if (action.path) {
            const plugin: Plugin = require(action.path);
            return await plugin.run({ browser, page, frame, action });
        }
    },
};

export interface ModulePluginParam {
    path?: string;
}
