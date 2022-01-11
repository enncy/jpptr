import { PluginContext } from ".";
declare const _default: {
    name: string;
    run({ browser, page, frame, json }: PluginContext<ModulePluginJSON>): Promise<void | import("../core/types").Action[] | PluginContext<any>>;
};
/**
 * 脚本加载插件
 */
export default _default;
export interface ModulePluginJSON {
    path?: string;
}
