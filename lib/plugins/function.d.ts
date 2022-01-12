import { ObjectAction, ActionContext } from ".";
declare const _default: {
    name: string;
    run({ page, frame, action }: ActionContext<FunctionPluginParam>): Promise<void>;
};
/**
 * 函数执行插件
 */
export default _default;
export interface FunctionPluginParam extends ObjectAction {
    use: "function";
    name: string;
    args?: (string | number | boolean)[];
    wait?: boolean;
}
