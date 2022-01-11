import { ObjectAction, PluginContext } from ".";
declare const _default: {
    name: string;
    run({ page, frame, action }: PluginContext<FunctionPluginParam>): Promise<void>;
};
/**
 * 函数执行插件
 */
export default _default;
export interface FunctionPluginParam extends ObjectAction {
    name: string;
    args: (string | number)[];
}
