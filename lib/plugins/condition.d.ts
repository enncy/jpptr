import { Action, ObjectAction, PluginContext } from ".";
declare const _default: {
    name: string;
    run({ page, frame, action }: PluginContext<ConditionPluginParam>): Promise<Action[] | undefined>;
};
/**
 * 条件判断插件
 */
export default _default;
export interface ConditionWrapper {
    url?: string;
    cookie?: string;
    text?: string;
    selector?: string;
}
export interface ConditionPluginParam extends ObjectAction {
    if: ConditionParam;
    "else if": ConditionParam[];
    else: Action[];
}
export interface ConditionParam {
    include?: ConditionWrapper;
    match?: ConditionWrapper;
    actions: Action[];
}
