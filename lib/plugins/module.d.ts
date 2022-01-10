import { PluginContext } from ".";
declare const _default: {
    name: string;
    invoke({ page, frame, json }: PluginContext<ModulePluginJSON>): Promise<void | import("../core/types").ActionExecutor | import("../core/types").Action[]>;
};
/**
 * 脚本加载插件
 */
export default _default;
export interface ModulePluginJSON {
    path?: string;
}
