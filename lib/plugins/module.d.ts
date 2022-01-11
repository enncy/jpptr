import { ObjectAction, PluginContext } from ".";
declare const _default: {
    name: string;
    run({ browser, page, frame, action }: PluginContext<ModulePluginParam>): Promise<void | import(".").Action[] | PluginContext<import(".").Action>>;
};
/**
 * 脚本加载插件
 */
export default _default;
export interface ModulePluginParam extends ObjectAction {
    path?: string;
}
