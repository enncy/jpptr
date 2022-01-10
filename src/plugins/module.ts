 import { JSONPlugin, PluginContext } from ".";
 
/**
 * 脚本加载插件
 */

export default {
    name: "module",
    async run({ browser, page, frame, json }: PluginContext<ModulePluginJSON>) {
        if (json.path) {
            const plugin: JSONPlugin = require(json.path);
            return await plugin.run({ browser, page, frame, json });
        }
    },
};

export interface ModulePluginJSON {
    path?: string;
}
