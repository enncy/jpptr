import { Action, ObjectAction, ActionContext } from ".";
declare const _default: {
    name: string;
    run({ browser, page, frame, action }: ActionContext<ModulePluginParam>): Promise<import(".").PluginReturnType<Action>>;
};
/**
 * 脚本加载插件
 */
export default _default;
export interface ModulePluginParam extends ObjectAction {
    use: "module";
    path?: string;
}
