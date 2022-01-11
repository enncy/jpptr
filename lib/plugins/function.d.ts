import { PluginContext } from ".";
declare const _default: {
    name: string;
    run({ page, frame, json }: PluginContext<FunctionPluginJSON>): Promise<void>;
};
/**
 * 函数执行插件
 */
export default _default;
export interface FunctionPluginJSON {
    name: string;
    args: (string | number)[];
}
