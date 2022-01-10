import { PluginContext } from ".";
import { Action } from "../core/types";
declare const _default: {
    name: string;
    invoke({ page, frame, json }: PluginContext<ConditionPluginJSON>): Promise<Action[] | undefined>;
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
export interface ConditionPluginJSON {
    if: ConditionJSON;
    "else if": ConditionJSON[];
    else: Action[];
}
export interface ConditionJSON {
    include?: ConditionWrapper;
    match?: ConditionWrapper;
    actions: Action[];
}
